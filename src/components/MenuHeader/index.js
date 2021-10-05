import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { NotificationManager } from 'react-notifications';
import { useDispatch } from 'react-redux';
import { getUserUpdateAsync, logoutUserAsync } from '../../store/user';

import Menu from '../Menu';
import NavBar from '../NavBar';
import Modal from '../Modal';
import LoginForm from '../LoginForm';

const MenuHeader = ({ bgActive }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [isNavOpen, setNavOpen] = useState(null);
    const [isModalOpen, setModalOpen] = useState(false);
    const handleNavClick = () => setNavOpen(prevState => !prevState);
    const handleLoginClick = () => setModalOpen(prevState => !prevState);
    const handleLogoutClick = () => {
        dispatch(logoutUserAsync());
        history.push('/');
    };
    const handleFormSubmit = async ({ email, password, isLogin }) => {
        const options = {
            method: 'POST',
            body: JSON.stringify({
                email,
                password,
                returnSecureToken: true,
            }),
        };
        const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:${isLogin ? 'signInWithPassword' : 'signUp'}?key=${process.env.REACT_APP_FIREBASE_KEY}`, options).then(res => res.json());

        if (response.hasOwnProperty('error')) {
            NotificationManager.error(response.error.message, 'Error!');
        } else {
            if (!isLogin) {
                const startupPokemons = await fetch('https://reactmarathon-api.herokuapp.com/api/pokemons/starter').then(res => res.json());

                for(const item of startupPokemons.data) {
                    fetch(`https://pokemon-game-7d203-default-rtdb.europe-west1.firebasedatabase.app/${response.localId}/pokemons.json?auth=${response.idToken}`, {
                        method: 'POST',
                        body: JSON.stringify(item),
                    });
                }
            }
            localStorage.setItem('idToken', response.idToken);
            NotificationManager.success('Success!');
            dispatch(getUserUpdateAsync);
            handleLoginClick();
        }
    };

    history.listen(() => {
        setNavOpen(null); // close nav on path change
    });

    return (
        <>
            <NavBar
                isActive={isNavOpen}
                handleNav={handleNavClick}
                bgActive={bgActive}
                onClickLogin={handleLoginClick}
                onClickLogout={handleLogoutClick}
            />
            {
                isNavOpen !== null 
                ? <Menu isActive={isNavOpen} />
                : null
            }
            {
                isModalOpen && (
                    <Modal
                        isOpen={isModalOpen}
                        title="Login"
                        onModalClose={handleLoginClick}
                    >
                        <LoginForm
                            onSubmit={handleFormSubmit}
                        />
                    </Modal>
                )
            }
            
        </>
    );
};

export default MenuHeader;