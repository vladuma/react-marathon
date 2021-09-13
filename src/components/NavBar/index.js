
import style from './style.module.css';
import cn from 'classnames';

const NavBar = ({ isActive, handleNav }) => {
    return (
        <nav className={style.root}>
            <div className={style.navWrapper}>
                <p className={style.brand}>
                    LOGO
                </p>
                <a
                    className={cn(style.menuButton, { [style.active]: isActive })}
                    onClick={handleNav}
                >
                    <span />
                </a>
            </div>
        </nav>
    );
};

export default NavBar;