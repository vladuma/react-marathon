import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Menu from '../Menu';
import NavBar from '../NavBar';

const MenuHeader = ({ bgActive }) => {
    const history = useHistory();
    const [isNavOpen, setNavOpen] = useState(null);
    const [isModalOpen, setModalOpen] = useState(null);
    const handleNavClick = () => setNavOpen(prevState => !prevState);
    const handleClickLogin = () => setModalOpen(prevState => !prevState);

    history.listen(() => {
        setNavOpen(null); // close nav on path change
    });

    return (
        <>
            <NavBar
                isActive={isNavOpen}
                handleNav={handleNavClick}
                bgActive={bgActive}
                onClickLogin={handleClickLogin}
            />
            {
                isNavOpen !== null 
                ? <Menu isActive={isNavOpen} />
                : null
            }
            
        </>
    );
};

export default MenuHeader;