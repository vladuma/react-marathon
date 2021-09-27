import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { PokemonContext } from '../../../../context/pokemonContext';
import PokemonCard from '../../../../components/PokemonCard';
import Layout from '../../../../components/Layout';
import { FirebaseContext } from '../../../../context/firebaseContext';
import cn from 'classnames';
import style from './style.module.css';

const FinishPage = () => {
    const history = useHistory();
    const firebase = useContext(FirebaseContext);
    const { pokemons, opponentPokemons, selectedOpponentPokemon, onSelectedOpponentPokemon } = useContext(PokemonContext);
    const handleEndGame = async () => {
        if (selectedOpponentPokemon) {
            firebase.addPokemon(selectedOpponentPokemon, (() => history.push('/game')));
        }
    };
    if (Object.keys(pokemons).length === 0 || opponentPokemons.length === 0) {
        history.replace('/game');
    }

    return (
        <Layout>
            <div className={cn(style.row, style.top)}>
                { 
                    Object.values(pokemons).map((item) => (
                        <PokemonCard
                            key={item.id}
                            id={item.id}
                            name={item.name}
                            type={item.type}
                            values={item.values}
                            img={item.img}
                            isActive
                            handleChangeSelected={() => {}}
                        />
                    ))
                }
            </div>
            <div className={cn(style.row, style.button)}>
                <button onClick={handleEndGame}>End game</button>
            </div>
            <div className={cn(style.row, style.bottom)}>
                { 
                    opponentPokemons.map((item) => (
                        <PokemonCard
                            key={item.id}
                            id={item.id}
                            name={item.name}
                            type={item.type}
                            values={item.values}
                            img={item.img}
                            isActive
                            className={selectedOpponentPokemon && item.id === selectedOpponentPokemon.id ? style.selected : ''}
                            handleChangeSelected={() => onSelectedOpponentPokemon(item.id)}
                        />
                    ))
                }
            </div>
        </Layout>
    );
};

export default FinishPage;