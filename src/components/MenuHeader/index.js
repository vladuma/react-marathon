import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Menu from '../Menu';
import NavBar from '../NavBar';
import Modal from '../Modal';

const MenuHeader = ({ bgActive }) => {
    const history = useHistory();
    const [isNavOpen, setNavOpen] = useState(null);
    const [isModalOpen, setModalOpen] = useState(false);
    const handleNavClick = () => setNavOpen(prevState => !prevState);
    const handleLoginClick = () => setModalOpen(prevState => !prevState);

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
                        Some text...
                    </Modal>
                )
            }
            
        </>
    );
};

export default MenuHeader;