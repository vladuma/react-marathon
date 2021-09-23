import { useState } from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import StartGame from './routes/Start';
import FinishGame from './routes/Finish';
import Board from './routes/Board';

import { PokemonContext } from '../../context/pokemonContext';

const GamePage = () => {
    const [selectedPokemons, setSelectedPokemons] = useState({});
    const match = useRouteMatch();
    const handleSelectedPokemon = (key, pokemon) => {
        setSelectedPokemons(prevState => {
            if (prevState[key]) {
                const copyState = {...prevState};

                delete copyState[key];
                return copyState;
            }
            return {
                ...prevState,
                [key]: pokemon,
            }
        })
    }

    return (
        <PokemonContext.Provider value={{
            pokemons: selectedPokemons,
            onSelectedPokemons: handleSelectedPokemon,
        }}>
            <Switch>
                <Route path={`${match.path}/`} exact component={StartGame} />
                <Route path={`${match.path}/board`} component={Board} />
                <Route path={`${match.path}/finish`} component={FinishGame} />
            </Switch>
        </PokemonContext.Provider>
    );
};

export default GamePage;