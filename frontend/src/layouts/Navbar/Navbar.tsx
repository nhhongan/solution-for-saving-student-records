import React from 'react';
import './Navbar.css'
import image from '../../assets/images/Menu.svg';
import User from '../../models/User';

interface NavbarProps {
    user?: User;
    openSidebar?: () => void;
    currentPage?: string;
}

const Title = ({ currentPage }: { currentPage?: string }) => {
    return (
        <>  
            {
            (currentPage && currentPage !=='Home Page') ? <h5>{currentPage}</h5>
            : <h5>Welcome to IU <span style={{color: 'red'}}>&hearts;</span></h5> }
        </>
    );
}

const Navbar: React.FC<NavbarProps> = ({ user, openSidebar, currentPage }) => {
    return (
        <nav>
            <button className='navbar-toggle' onClick={openSidebar}><img src={image} alt="Menu Icon" /></button>
            {user ? <Title currentPage={currentPage}/> : <h5>Please log in</h5>}
        </nav>
    );
};

export default Navbar;
