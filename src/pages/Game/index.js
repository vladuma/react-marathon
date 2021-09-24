import { useState } from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import StartGame from './routes/Start';
import FinishGame from './routes/Finish';
import Board from './routes/Board';

import { PokemonContext } from '../../context/pokemonContext';

const GamePage = () => {
    const match = useRouteMatch();
    const [selectedPokemons, setSelectedPokemons] = useState({});
    const [opponentPokemons, setOpponentPokemons] = useState([]);
    const [wonGame, setWonGame] = useState(false);
    const [selectedOpponentPokemon, setSelectedOpponentPokemons] = useState(null);
    // add method to clear context
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
    };
    const handleSetOpponentPokemons = (pokemons) => {
        setOpponentPokemons(() => ([...pokemons]));
    };
    const handleOpponentSelectedPokemon = (pokemonId) => {
        if (wonGame) {
            setSelectedOpponentPokemons(() => (opponentPokemons.find((item) => item.id === pokemonId)));
        }
    };
    const handleGameWin = () => setWonGame(true);

    return (
        <PokemonContext.Provider value={{
            pokemons: selectedPokemons,
            onSelectedPokemons: handleSelectedPokemon,
            opponentPokemons,
            setOpponentPokemons: handleSetOpponentPokemons,
            selectedOpponentPokemon,
            onSelectedOpponentPokemon: handleOpponentSelectedPokemon,
            handleGameWin,
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