import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectPokemonsSelected, setOpponentPokemons, setGameResult } from '../../../../store/game';
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
    const [serverBoard, setServerBoard] = useState([0,0,0,0,0,0,0,0,0]);

    const handleBoardClick = async (position) => {
        if (choosenCard && typeof choosenCard === 'object') {
            const params = {
                currentPlayer: 'p1',
                hands: {
                    p1: player1,
                    p2: player2,
                },
                move: {
                    poke: {
                        ...choosenCard,
                    },
                    position,
                },
                board: serverBoard,
            };

            if (choosenCard.player === 1) {
                setPlayer1((prevState) => prevState.filter((item) => item.id !== choosenCard.id));
            }
            
            if (choosenCard.player === 2) {
                setPlayer2((prevState) => prevState.filter((item) => item.id !== choosenCard.id));
            }

            setBoard(prevState => prevState.map((item) => {
                if (item.position === position) {
                    return {
                       ...item,
                       card: choosenCard, 
                    };
                }

                return item;
            }));
            
            const game = await fetch('https://reactmarathon-api.herokuapp.com/api/pokemons/game', {
                method: 'POST',
                body: JSON.stringify(params),
            }).then(res => res.json());

            setChoosenCard(null);

            setBoard(converBoard(game.oldBoard))

            setSide((prevState) => changeSide(prevState));

            setSteps((steps) => steps + 1);

            if (game.move !== null) {

                setTimeout(() => {
                    const idAi = game.move.poke.id;
                    
                    setPlayer2(prevState => prevState.map((item) => {
                        if ( item.id === idAi ) {
                            return {
                                ...item,
                                active: true,
                            };
                        }
                        
                        return item;
                    }));
                }, 1000);

                setTimeout(() => {
                    setServerBoard(game.board);
                    setPlayer2(() => game.hands.p2.pokes.map((item) => item.poke));
                    setBoard(converBoard(game.board));
                    setSide((prevState) => changeSide(prevState));
                    setSteps((steps) => steps + 1);
                }, 1500);
            }

        }
    };

    const converBoard = (serverBoard) => {
        return serverBoard.map((item, index) => {
            let card = null;
            if (typeof item === 'object') {
                card = {
                    ...item.poke,
                    posession: item.holder === 'p1' ? 'blue' : 'red',
                };
            }

            return {
                position: index + 1,
                card,
            };
        })
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
            const { data } = await fetch('https://reactmarathon-api.herokuapp.com/api/pokemons/board').then(res => res.json());
            setBoard(data);
            return data;
        }
        async function getPlayer2() {
            const options = {
                method: 'POST',
                body: JSON.stringify({
                    pokemons: Object.values(pokemons),
                }),
            };
            const { data } = await fetch('https://reactmarathon-api.herokuapp.com/api/pokemons/game/start', options).then(res => res.json());
            dispatch(setOpponentPokemons(data));
            setPlayer2(setItemsPossession(data, 'red'));
            return data;
        }

        Promise.allSettled([getBoard(), getPlayer2()]).then((res) => {
            const [, p2] = res;
            setTimeout(async () => {
                const randomSide = getRandomSide();
                setSide(randomSide);
                if (randomSide === 2) {
                    const params = {
                        currentPlayer: 'p2',
                        hands: {
                            p1: player1,
                            p2: setItemsPossession(p2.value, 'red'),
                        },
                        move: null,
                        board: serverBoard,
                    };

                    const game = await fetch('https://reactmarathon-api.herokuapp.com/api/pokemons/game', {
                        method: 'POST',
                        body: JSON.stringify(params),
                    }).then(res => res.json());
                    console.log(game);
                    if (game.move && game.move !== null) {
                        setSide(changeSide(side));
        
                        setTimeout(() => {
                            const idAi = game.move.poke.id;
                            
                            setPlayer2(prevState => prevState.map((item) => {
                                if ( item.id === idAi ) {
                                    return {
                                        ...item,
                                        active: true,
                                    };
                                }
                                
                                return item;
                            }));
                        }, 1000);
        
                        setTimeout(() => {
                            setServerBoard(game.board);
                            setPlayer2(() => game.hands.p2.pokes.map((item) => item.poke));
                            setBoard(converBoard(game.board));
                            setSide(changeSide(side));
                            setSteps((steps) => steps + 1);
                        }, 1500);
                    }
                }
            }, 1000);
        });
        // eslint-disable-next-line 
    }, []);

    useEffect(() => {
        if ( steps === 9) {
            const [player1Count, player2Count] = winCounter(board, player1, player2);
            const types = {
                [player1Count > player2Count]: 'win',
                [player1Count === player2Count]: 'draw',
                [player1Count < player2Count]: 'lose',
            };

            const type = types[true];

            setResult(<Result type={type} />);
            
            dispatch(setGameResult(type));
            setTimeout(() => history.push('/game/finish'), 2500);
        } // eslint-disable-next-line 
    }, [steps, board, player1, player2]); 

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