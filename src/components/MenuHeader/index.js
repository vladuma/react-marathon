import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { NotificationManager } from 'react-notifications';
import Menu from '../Menu';
import NavBar from '../NavBar';
import Modal from '../Modal';
import LoginForm from '../LoginForm';

const MenuHeader = ({ bgActive }) => {
    const history = useHistory();
    const [isNavOpen, setNavOpen] = useState(null);
    const [isModalOpen, setModalOpen] = useState(true);
    const handleNavClick = () => setNavOpen(prevState => !prevState);
    const handleLoginClick = () => setModalOpen(prevState => !prevState);
    const handleFormSubmit = async ({ email, password}) => {
        const options = {
            method: 'POST',
            body: JSON.stringify({
                email,
                password,
                returnSecureToken: true,
            }),
        };
        const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDulN3LR-G9esYIsIYyLmCRqL5OlbK6tQU', options).then(res => res.json());

        if (response.hasOwnProperty('error')) {
            NotificationManager.error(response.error.message, 'Error!');
        } else {
            NotificationManager.auccess('Success!');
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