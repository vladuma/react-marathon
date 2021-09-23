import { useContext } from 'react';
import { PokemonContext } from '../../../../context/pokemonContext';
import PokemonCard from '../../../../components/PokemonCard';
import style from './style.module.css';

const BoardPage = () => {
    const { pokemons } = useContext(PokemonContext);
     
    return (
        <div className={style.root}>
            <div className={style.playerOne}>
                {
                    Object.values(pokemons).map(({ id, name, type, img, values}) => (<PokemonCard
                        key={id}
                        id={id}
                        className={style.card}
                        name={name}
                        type={type}
                        values={values}
                        img={img}
                        isActive={true}
                        minimize={true}
                        handleChangeSelected={() => {}}
                    />))
                }
            </div>
            <div className={style.board}>
                <div className={style.boardPlate}>1</div>
                <div className={style.boardPlate}>2</div>
                <div className={style.boardPlate}>3</div>
                <div className={style.boardPlate}>4</div>
                <div className={style.boardPlate}>5</div>
                <div className={style.boardPlate}>6</div>
                <div className={style.boardPlate}>7</div>
                <div className={style.boardPlate}>8</div>
                <div className={style.boardPlate}>9</div>
            </div>
        </div>
    );
};

export default BoardPage;