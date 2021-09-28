import { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { selectPokemonsData, getPokemonsAsync } from '../../../../store/pokemons';
import { selectPokemon, selectPokemonsSelected } from '../../../../store/game';

import PokemonCard from '../../../../components/PokemonCard';

import style from './style.module.css';

const StartGame = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const pokemonsRedux = useSelector(selectPokemonsData);
    const selectedPokemons = useSelector(selectPokemonsSelected);
    const [pokemons, setPokemons] = useState({});
    
    const handleChangeSelected = (key) => {
        const pokemon = pokemons[key];

        dispatch(selectPokemon({key, pokemon}));
        setPokemons(prevState => ({
            ...prevState,
            [key]: {
                ...prevState[key],
                selected: !prevState[key].selected,
            }
        }));
    };

    const handleStartGame = () => history.push('/game/board')
    
    useEffect(() => {
        dispatch(getPokemonsAsync());
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        setPokemons(pokemonsRedux);
    }, [pokemonsRedux]);

    return (
        <>
            <div className={style.buttonWrap}>
                <button
                    onClick={handleStartGame}
                    disabled={Object.keys(selectedPokemons).length !== 5}
                >
                    Start game
                </button>
            </div>
            <div className={style.flex}>
            {
                Object.entries(pokemons).map(([key, {id, name, type, values, img, selected}]) => (<PokemonCard
                    key={key}
                    id={id}
                    className={style.card}
                    name={name}
                    type={type}
                    values={values}
                    img={img}
                    isActive={true}
                    isSelected={selected}
                    minimize={false}
                    handleChangeSelected={() => {
                        if (Object.keys(selectedPokemons).length < 5 || selected) {
                            handleChangeSelected(key)
                        }
                    }}
                />))
            } 
            </div>
        </>
    );
};

export default StartGame;