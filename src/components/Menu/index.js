import constants from '../../constants';
import style from './style.module.css';
import cn from 'classnames';

const Menu = ({ isActive, onPageChange }) => {
    const navState = {
        [style.active]: isActive === true,
        [style.deactive]: isActive === false,
    }
    return (
        <div
            className={cn(style.menuContainer, { ...navState })}
        >
            <div className={style.overlay} />
            <div className={style.menuItems}>
                <ul>
                    <li>
                        <a onClick={() => onPageChange(constants.HOME_PAGE_SLUG)}>
                        HOME
                        </a>
                    </li>
                    <li>
                        <a onClick={() => onPageChange(constants.GAME_PAGE_SLUG)}>
                        GAME
                        </a>
                    </li>
                    <li>
                        <a onClick={() => onPageChange(constants.DEFAULT_PAGE_SLUG)}>
                        ABOUT
                        </a>
                    </li>
                    <li>
                        <a onClick={() => onPageChange(constants.DEFAULT_PAGE_SLUG)}>
                        CONTACT
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Menu;