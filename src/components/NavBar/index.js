import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectUserLoading, selectUserLocalId } from '../../store/user';
import { ReactComponent as LoginSVG } from '../../assets/login.svg';
import { ReactComponent as UserSVG } from '../../assets/user.svg';
import style from './style.module.css';
import cn from 'classnames';

const NavBar = ({ isActive, handleNav, bgActive, onClickLogin, onClickLogout }) => {
    const isUserLoading = useSelector(selectUserLoading);
    const localId = useSelector(selectUserLocalId);

    return (
        <nav className={cn(style.root, bgActive ? style.bgActive : null)}>
            <div className={style.navWrapper}>
                <div className={style.brand}>
                    LOGO
                </div>
                <div className={style.loginAndMenu}>
                    {(!isUserLoading && !!localId) && (<>
                            <Link
                                className={style.loginWrap}
                                to="/user"
                            >
                                <UserSVG />
                            </Link>
                            <div
                                className={style.loginWrap}
                                onClick={onClickLogout}
                            >
                                <LoginSVG />
                            </div>
                        </>)
                    }
                    {(!isUserLoading && !localId) && (<div
                            className={style.loginWrap}
                            onClick={onClickLogin}
                        >
                            <LoginSVG />
                        </div>)
                    }
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