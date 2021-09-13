import { useState } from 'react';

import Menu from '../Menu';
import NavBar from '../NavBar';

const MenuHeader = () => {
    const [isActive, setActive] = useState(false);
    const toggleNav = () => setActive(!isActive);

    return (
        <>
            <NavBar
                isActive={isActive}
                handleNav={toggleNav}
                />
            <Menu
                isActive={isActive}
            />
        </>
    );
};

export default MenuHeader;