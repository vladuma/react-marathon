import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { NotificationManager } from 'react-notifications';
import Menu from '../Menu';
import NavBar from '../NavBar';
import Modal from '../Modal';
import LoginForm from '../LoginForm';
const API_KEY = 'AIzaSyDulN3LR-G9esYIsIYyLmCRqL5OlbK6tQU';

const MenuHeader = ({ bgActive }) => {
    const history = useHistory();
    const [isNavOpen, setNavOpen] = useState(null);
    const [isModalOpen, setModalOpen] = useState(false);
    const handleNavClick = () => setNavOpen(prevState => !prevState);
    const handleLoginClick = () => setModalOpen(prevState => !prevState);
    const handleFormSubmit = async ({ email, password, isLogin }) => {
        const options = {
            method: 'POST',
            body: JSON.stringify({
                email,
                password,
                returnSecureToken: true,
            }),
        };
        const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:${isLogin ? 'signInWithPassword' : 'signUp'}?key=${API_KEY}`, options).then(res => res.json());

        if (response.hasOwnProperty('error')) {
            NotificationManager.error(response.error.message, 'Error!');
        } else {
            if (!isLogin) {
                const startupPokemons = await fetch('https://reactmarathon-api.herokuapp.com/api/pokemons/starter').then(res => res.json());
                console.log(startupPokemons);
                for(const item of startupPokemons.data) {
                    fetch(`https://pokemon-game-7d203-default-rtdb.europe-west1.firebasedatabase.app/${response.localId}/pokemons.json?auth=${response.idToken}`, {
                        method: 'POST',
                        body: JSON.stringify(item),
                    });
                }
            }
            localStorage.setItem('idToken', response.idToken);
            NotificationManager.success('Success!');
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