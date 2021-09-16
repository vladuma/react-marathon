import { useState } from 'react';

import Menu from '../Menu';
import NavBar from '../NavBar';

const MenuHeader = ({ onPageChange }) => {
    const [isActive, setActive] = useState(null);
    const toggleNav = () => setActive(!isActive);

    return (
        <>
            <NavBar
                isActive={isActive}
                handleNav={toggleNav}
                />
            <Menu
                isActive={isActive}
                onPageChange={onPageChange}
            />
        </>
    );
};

export default MenuHeader;