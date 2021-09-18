import { useState, useEffect } from 'react';
import Layout from '../../components/Layout';

import database from '../../services/firebase';
import PokemonCard from '../../components/PokemonCard';

const GamePage = () => {
    const [pokemons, setPokemons] = useState({});
    const selectCardHandler = (id) => {
        setPokemons(prevState => {
            return Object.entries(prevState).reduce((acc, item) => {
                const[key, value] = item;
                const pokemon = {...value};
                if (pokemon.id === id) {
                    pokemon.active = true;
                };
        
                acc[key] = pokemon;
        
                return acc;
            }, {});
        });
    };

    useEffect(() => {
        database.ref('pokemons').once('value', (snapshot) => setPokemons(snapshot.val()));
    }, []);

    return (
        <>
            <Layout
                title="Cards"
                colorBg="#e2e2e2"
            >
                <div className="flex">
                {
                    Object.entries(pokemons).map(([key, {id, name, type, values, img, active}]) => (<PokemonCard
                        key={key}
                        id={id}
                        name={name}
                        type={type}
                        values={values}
                        img={img}
                        isActive={active}
                        selectCardHandler={selectCardHandler}
                    />))
                } 
                </div>
            </Layout>
        </>
    );
};

export default GamePage;