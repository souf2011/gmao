import React, { useState, useEffect } from 'react';
import TimeAndDate from './TimeAndDate';
import Notifications from './Notifications';
import ProfileUser from './ProfileUser';
import '../styles/header.css';

function Header() {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className={`main_header ${isScrolled ? "scrolled" : ""}`}>
            {/* --------component date and day------------ */}
            <div className="TimeAndDate">
                <TimeAndDate />
            </div>
            {/* ------------component Notifications---------- */}
            <div className="header_right ">
                <Notifications />
                {/* ------------user profile---------- */}
                <ProfileUser />
            </div>
        </div>
    );
}

export default Header;
