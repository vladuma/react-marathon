import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Menu from '../Menu';
import NavBar from '../NavBar';

const MenuHeader = ({ bgActive }) => {
    const history = useHistory();
    const [isActive, setActive] = useState(null);
    const toggleNav = () => setActive(!isActive);

    history.listen(() => {
        setActive(null); // close nav on path change
    });

    return (
        <>
            <NavBar
                isActive={isActive}
                handleNav={toggleNav}
                bgActive={bgActive}
            />
            {
                isActive !== null 
                ? <Menu isActive={isActive} />
                : null
            }
            
        </>
    );
};

export default MenuHeader;