import { useState } from 'react';
import PokemonCard from '../../../../../../components/PokemonCard';
import style from './style.module.css';
import cn from 'classnames';

const PlayerBoard = ({ player, cards, onCardClick, side }) => {
    const [isSelected, setSelected] = useState(null);
    return (
        <>
            {
                cards.map((item) => (
                    <div
                        key={item.id}
                        className={cn(style.cardBoard, {
                            [style.selected]: isSelected === item.id || item.active,
                        })}
                        onClick={() => {
                            if (player === side) {
                                setSelected(item.id);
                                onCardClick && onCardClick({
                                    player,
                                    ...item,
                                });
                            }
                        }}
                    >
                        <PokemonCard
                            id={item.id}
                            name={item.name}
                            type={item.type}
                            values={item.values}
                            img={item.img}
                            isActive
                            minimize
                            handleChangeSelected={() => {}}
                        />
                    </div>
                ))
            }
        </>
    );
};

export default PlayerBoard;