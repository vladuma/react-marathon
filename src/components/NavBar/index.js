import { ReactComponent as LoginSVG } from '../../assets/login.svg';
import style from './style.module.css';
import cn from 'classnames';

const NavBar = ({ isActive, handleNav, bgActive, onClickLogin }) => {
    return (
        <nav className={cn(style.root, bgActive ? style.bgActive : null)}>
            <div className={style.navWrapper}>
                <div className={style.brand}>
                    LOGO
                </div>
                <div className={style.loginAndMenu}>
                    <div
                        className={style.loginWrap}
                        onClick={onClickLogin}
                    >
                        <LoginSVG />
                    </div>
                    <div
                        className={cn(style.menuButton, { [style.active]: isActive })}
                        onClick={handleNav}
                    >
                        <span />
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;