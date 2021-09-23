import { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { PokemonContext } from '../../../../context/pokemonContext';
import PokemonCard from '../../../../components/PokemonCard';
import PlayerBoard from './components/PlayerBoard';
import style from './style.module.css';

const setItemsPossession = (items, possession) => {
    return items.map(item => ({
        ...item,
        possession,
    }));
};

const BoardPage = () => {
    const history = useHistory();
    const { pokemons } = useContext(PokemonContext);
    const [steps, setSteps] = useState(0);
    const [board, setBoard] = useState([]);
    const [player1, setPlayer1] = useState(setItemsPossession(Object.values(pokemons), 'blue'));
    const [player2, setPlayer2] = useState([]);
    const [choosenCard, setChoosenCard] = useState(null);
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
        }
    };
    const winCounter = (board, player1, player2) => {
        let player1Counter = player1.length;
        let player2Counter = player2.length;

        board.forEach((item) => {
            const { possession } = item.card;
            const rules = {
                'blue': () => (player1Counter + 1),
                'red': () => (player2Counter + 1),
            }
            rules[possession] && rules[possession]();
        });
        return [player1Counter, player2Counter];
    }

    useEffect(() => {
        async function getBoard() {
            const { data } = await fetch('https://reactmarathon-api.netlify.app/api/board').then(res => res.json());
            setBoard(data);
        }
        async function getPlayer2() {
            const { data } = await fetch('https://reactmarathon-api.netlify.app/api/create-player').then(res => res.json());
            setPlayer2(setItemsPossession(data), 'red');
        }
        getBoard();
        getPlayer2();
    }, []);

    useEffect(() => {
        if ( steps === 9) {
            const [player1Count, player2Count] = winCounter(board, player1, player2);

            if (player1Count > player2Count) {
                alert('WIN!');
            } else if (player1Count === player2Count) {
                alert('Draw');
            } else {
                alert('Lose :(');
            }
        }
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
                    onCardClick={(card) => setChoosenCard(card)}
                />
            </div>
            <div className={style.playerTwo}>
                <PlayerBoard
                    player={2}
                    cards={player2}
                    onCardClick={(card) => setChoosenCard(card)}
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
        </div>
    );
};

export default BoardPage;