import { Link } from 'react-router-dom';
import constants from '../../constants';
import style from './style.module.css';
import cn from 'classnames';

const MENU = [
    {
        name: 'Home',
        to: constants.HOME_PAGE_SLUG,
    },
    {
        name: 'Game',
        to: constants.GAME_PAGE_SLUG,
    },
    {
        name: 'About',
        to: constants.ABOUT_PAGE_SLUG,
    },
    {
        name: 'Contact',
        to: constants.CONTACT_PAGE_SLUG,
    },
];

const Menu = ({ isActive }) => {
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
                    { MENU.map((item) => (<li key={item.to}><Link to={item.to}>{item.name}</Link></li>))}
                </ul>
            </div>
        </div>
    );
};

export default Menu;