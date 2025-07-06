import React from 'react';
import './footer.css';
import { FaHome, FaBars, FaWhatsapp, FaSearch } from 'react-icons/fa';

function Footer() {
    const MenuIcon = FaBars;
    const HomeIcon = FaHome;
    const WhatsappIcon = FaWhatsapp;
    const Search = FaSearch;
    return (

        <div className="footer">
            <nav className='icons'>
                <span><i className="icon"><MenuIcon /></i></span>
                <span><i className="icon"><HomeIcon /></i></span>
                <span><i className="icon"><Search /></i></span>
                <span><i className="icon"><WhatsappIcon /></i></span>


            </nav>

        </div>
    );
}


export default Footer;