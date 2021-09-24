import { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import PokemonCard from '../../../../components/PokemonCard';

import { FirebaseContext } from '../../../../context/firebaseContext';
import { PokemonContext } from '../../../../context/pokemonContext';

import style from './style.module.css';

const StartGame = () => {
    const history = useHistory();
    const firebase = useContext(FirebaseContext)
    const pokemonContext = useContext(PokemonContext);
    const [pokemons, setPokemons] = useState({});
    
    const handleChangeSelected = (key) => {
        const pokemon = pokemons[key];

        pokemonContext.onSelectedPokemons(key, pokemon);
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
        firebase.getPokemonsSoket((pokemons) => {
            setPokemons(pokemons); 
        });
        // eslint-disable-next-line 
        return () => firebase.offPokemonsSoket();
    }, []);
    
    return (
        <>
            <div className={style.buttonWrap}>
                <button
                    onClick={handleStartGame}
                    disabled={Object.keys(pokemonContext.pokemons).length < 5}
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
                        if (Object.keys(pokemonContext.pokemons).length < 5 || selected) {
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