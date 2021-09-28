import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectPokemonsSelected, setOpponentPokemons, setWonGame } from '../../../../store/game';
import PokemonCard from '../../../../components/PokemonCard';
import Result from '../../../../components/Result';
import ArrowChoice from '../../../../components/ArrowChoice';
import PlayerBoard from './components/PlayerBoard';
import style from './style.module.css';

const setItemsPossession = (items, possession) => {
    return items.map(item => ({
        ...item,
        possession,
    }));
};

const getRandomSide = () => {
    const random = Math.round(Math.random() *  10);
    return random > 5 ? 2 : 1; 
};

const changeSide = (side) => (side === 1 ? 2 : 1);

const BoardPage = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const pokemons = useSelector(selectPokemonsSelected);
    const [steps, setSteps] = useState(0);
    const [board, setBoard] = useState([]);
    const [player1, setPlayer1] = useState(setItemsPossession(Object.values(pokemons), 'blue'));
    const [player2, setPlayer2] = useState([]);
    const [choosenCard, setChoosenCard] = useState(null);
    const [result, setResult] = useState(null);
    const [side, setSide] = useState(0);

    const handleBoardClick = async (position) => {
        if (choosenCard) {
            const params = {
                position,
                card: choosenCard,
                board,
            };
            const { data: newBoard } = await fetch('https://reactmarathon-api.netlify.app/api/players-turn', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(params),
            }).then(res => res.json());

            setBoard(newBoard);
            setSteps((steps) => steps + 1);

            if (choosenCard.player === 1) {
                setPlayer1((prevState) => prevState.filter((item) => item.id !== choosenCard.id));
            }
            
            if (choosenCard.player === 2) {
                setPlayer2((prevState) => prevState.filter((item) => item.id !== choosenCard.id));
            }

            setSide(changeSide(side));
            setChoosenCard(null);
        }
    };

    const handleChoosenCard = (card) => {
        setChoosenCard(card);
    };

    const winCounter = (board, player1, player2) => {
        let player1Counter = player1.length;
        let player2Counter = player2.length;

        board.forEach((item) => {
            const { possession } = item.card;
            const rules = {
                'blue': () => { player1Counter += 1 },
                'red': () => { player2Counter += 1 },
            }
            rules[possession] && rules[possession]();
        });
        return [player1Counter, player2Counter];
    };

    useEffect(() => {
        async function getBoard() {
            const { data } = await fetch('https://reactmarathon-api.netlify.app/api/board').then(res => res.json());
            setBoard(data);
            return data;
        }
        async function getPlayer2() {
            const { data } = await fetch('https://reactmarathon-api.netlify.app/api/create-player').then(res => res.json());
            dispatch(setOpponentPokemons(data));
            setPlayer2(setItemsPossession(data, 'red'));
            return data;
        }

        Promise.allSettled([getBoard(), getPlayer2()]).then(() => {
            setTimeout((() => setSide(getRandomSide())), 1000);
        });
        // eslint-disable-next-line 
    }, []);

    useEffect(() => {
        if ( steps === 9) {
            const [player1Count, player2Count] = winCounter(board, player1, player2);
            console.log(player1Count, player2Count);
            const types = {
                [player1Count > player2Count]: 'win',
                [player1Count === player2Count]: 'draw',
                [player1Count < player2Count]: 'lose',
            };
            console.log(types);
            console.log(types[true]);
            const type = types[true];

            setResult(<Result type={type} />);
            
            // if (type === 'win') {
                dispatch(setWonGame());
                setTimeout(() => history.push('/game/finish'), 2500);
            // }
        } // eslint-disable-next-line 
    }, [steps]); 

    if (Object.keys(pokemons).length === 0) {
        history.replace('/game');
    }
     
    return (
        <div className={style.root}>
            <div className={style.playerOne}>
                <PlayerBoard
                    player={1}
                    cards={player1}
                    side={side}
                    onCardClick={handleChoosenCard}
                />
            </div>
            <div className={style.playerTwo}>
                <PlayerBoard
                    player={2}
                    cards={player2}
                    side={side}
                    onCardClick={handleChoosenCard}
                />
            </div>
            <div className={style.board}>
                {
                    board.map((item) => (
                        <div
                            key={item.position}
                            className={style.boardPlate}
                            onClick={() => !item.card && handleBoardClick(item.position)}
                        >
                            {
                                item.card && <PokemonCard {...item.card} isActive minimize />
                            }
                        </div>
                    ))
                }
            </div>
            <ArrowChoice stop={!!side} side={side} />
            { result }
        </div>
    );
};

export default BoardPage;