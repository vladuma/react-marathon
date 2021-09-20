
import style from './style.module.css';
import cn from 'classnames';

const NavBar = ({ isActive, handleNav, bgActive }) => {
    return (
        <nav className={cn(style.root, bgActive ? style.bgActive : null)}>
            <div className={style.navWrapper}>
                <p className={style.brand}>
                    LOGO
                </p>
                <div
                    className={cn(style.menuButton, { [style.active]: isActive })}
                    onClick={handleNav}
                >
                    <span />
                </div>
            </div>
        </nav>
    );
};

export default NavBar;