import React, { useState, useEffect } from 'react';
import axiosClent from '../Api/AxiosClent.js';
import { GoChevronDown } from "react-icons/go";
import defaultUserImage from '../assets/images/avatar.png';
function ProfileUser() {
    const [isOpen, setIsOpen] = useState(false);
    const [user, setUser] = useState({});

    useEffect(() => {
        // ✅ Fetch user info from API
        axiosClent.get('http://localhost:8000/api/user') // adjust URL to your backend
            .then(response => {
                setUser(response.data);
            })
            .catch(error => {
                console.error('Failed to load user:', error);
            });

        const handleClickOutside = (e) => {
            const target = e.target.closest('.user-dropdown');
            if (!target) {
                setIsOpen(false);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    return (
        <div className="user-dropdown">
            <div className="user-toggle" onClick={() => setIsOpen(!isOpen)}>
                <img
                    src={defaultUserImage}
                    alt="user profile"
                    className="user-avatar"
                />
                <div className="user-info">
                    <div className="user-details">
                        <span className="username">{user.name}</span>
                        <span className="userrole">{user.email}</span>
                    </div>
                    <span className={`chevron ${isOpen ? 'rotate-180' : ''}`}>
                        <GoChevronDown />
                    </span>
                </div>
            </div>

            {isOpen && (
                <div className="dropdown-menu">
                    <ul>
                        <li className="dropdown-item">Mon Profile</li>
                        <li className="dropdown-item">Paramètres</li>
                        <li className="dropdown-item">Déconnexion</li>
                    </ul>
                </div>
            )}
        </div>
    );
}

export default ProfileUser;
