import { useState } from 'react';
import Layout from '../../components/Layout';

import POKEMONS from '../../assets/pokemon.json';
import PokemonCard from '../../components/PokemonCard';

const GamePage = () => {
    const [pokemons, setPokemons] = useState(POKEMONS);
    const selectCardHandler = (id) => {
        setPokemons(prevState => prevState.map(pokemon => pokemon.id === id ? { ...pokemon, isActive: !(!!pokemon.isActive) } : pokemon));
    };

    return (
        <>
            <Layout
                title="Cards"
                colorBg="#e2e2e2"
            >
                <div className="flex">
                {
                    pokemons.map((pokemon) => (<PokemonCard
                        key={pokemon.id}
                        id={pokemon.id}
                        name={pokemon.name}
                        type={pokemon.type}
                        values={pokemon.values}
                        img={pokemon.img}
                        isActive={pokemon.isActive}
                        selectCardHandler={selectCardHandler}
                    />))
                } 
                </div>
            </Layout>
        </>
    );
};

export default GamePage;