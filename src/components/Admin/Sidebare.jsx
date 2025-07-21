import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import '../../styles/sidebare.css';
// ----------------import Icons From Icons React------------------>
import { RxDashboard } from "react-icons/rx";
import { RiUserSettingsLine } from "react-icons/ri";
import { FaChevronDown, FaTools, FaTags ,FaToolbox } from "react-icons/fa";
import { FiLayers, FiMapPin, FiSettings, FiLogOut } from "react-icons/fi";
import { TfiBarChart } from "react-icons/tfi";
import { FaChevronLeft } from "react-icons/fa";
import InterventionIcon from '../../assets/Icons/Intervention.svg';
import InterventionActiveIcon from '../../assets/Icons/InterventionActive.svg';
import { TbReportMoney } from "react-icons/tb";
import { TbReport } from "react-icons/tb";
import { MdFormatListBulletedAdd } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";


function Sidebare() {
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenMenu, setIsOpenMenu] = useState(false);
    const location = useLocation();


    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };
    const toggleMenu = () => {
        setIsOpenMenu(!isOpenMenu);
    };
    const isSubmenuActive =
        location.pathname.startsWith('/admin/PlusOptions/catégorie/') ||
        location.pathname.startsWith('/admin/PlusOptions/Gammes');

    return (
        <>
            {isOpen && <div className="overlay" onClick={toggleSidebar}></div>}

            <div className={`sidebare ${isOpen ? 'open' : ''}`}>
                <div className="sidebare_header">
                    <img src={logo} alt="LOGO" />
                    <div className="sidebare_toggle" onClick={toggleSidebar}>
                        <FaChevronLeft />
                    </div>
                </div>
                <div className="sidebare_content">
                    <ul className="sidebare_content_top">
                        <li>
                            <NavLink to="/admin/" end className={({ isActive }) => isActive ? 'active' : ''} onClick={() => setIsOpen(false)}>
                                <span><RxDashboard /></span>
                                <span className="link-text">Dashboard</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/admin/equipements" className={({ isActive }) => isActive ? 'active' : ''} onClick={() => setIsOpen(false)}>
                                <span><FaTools /></span>
                                <span className="link-text">Equipements</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/admin/interventions" className={({ isActive }) => isActive ? 'active' : ''} onClick={() => setIsOpen(false)}>
                                {({ isActive }) => (
                                    <>
                                        <span>
                                            <img
                                                src={isActive ? InterventionActiveIcon : InterventionIcon}
                                                alt="Intervention"
                                                className="icon"
                                            />
                                        </span>
                                        <span className="link-text">Interventions</span>
                                    </>
                                )}
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/admin/intervenants" className={({ isActive }) => isActive ? 'active' : ''} onClick={() => setIsOpen(false)}>
                                <span><RiUserSettingsLine /></span>
                                <span className="link-text">Intervenants</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/admin/stocks" className={({ isActive }) => isActive ? 'active' : ''} onClick={() => setIsOpen(false)}>
                                <span><FiLayers /></span>
                                <span className="link-text">Stocks</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/admin/achats" className={({ isActive }) => isActive ? 'active' : ''} onClick={() => setIsOpen(false)}>
                                <span><TfiBarChart /></span>
                                <span className="link-text">Achats</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/admin/Budgets" className={({ isActive }) => isActive ? 'active' : ''} onClick={() => setIsOpen(false)}>
                                <span><TbReportMoney /></span>
                                <span className="link-text">Budgets</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/admin/Rapports" className={({ isActive }) => isActive ? 'active' : ''} onClick={() => setIsOpen(false)}>
                                <span><TbReport /></span>
                                <span className="link-text">Rapports</span>
                            </NavLink>
                        </li>
                        <li>
                            <div
                                onClick={() => {
                                    // setIsOpen(false);
                                    toggleMenu();
                                }}
                            >
                                <span><MdFormatListBulletedAdd /></span>
                                <span className="link-text">Plus d'options</span>
                                <span className={`menu-arrow ${isOpenMenu ? 'open' : ''}`}>
                                    <FaChevronDown size={12} />
                                </span>
                            </div>

                            {isOpenMenu && (
                                <ul className="submenu">
                                      <li>
                                        <NavLink
                                            to="/admin/PlusOptions/emplacements/"
                                            className={({ isActive }) => isActive ? 'active' : ''}
                                            end
                                            onClick={() => setIsOpen(false)}
                                        >
                                            <span><FaLocationDot /></span>
                                            <span className="link-text">Emplacements</span>
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink
                                            to="/admin/PlusOptions/catégorie/"
                                            className={({ isActive }) => isActive ? 'active' : ''}
                                            end
                                            onClick={() => setIsOpen(false)}
                                        >
                                            <span><FaTags /></span>
                                            <span className="link-text">Catégories</span>
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink
                                            to="/admin/PlusOptions/Gammes"
                                            className={({ isActive }) => isActive ? 'active' : ''}
                                            end
                                            onClick={() => setIsOpen(false)}
                                        >
                                            <span><FaToolbox /></span>
                                            <span className="link-text"> Gammes maintenance</span>
                                        </NavLink>
                                    </li>
                                </ul>
                            )}
                        </li>
                        <li>
                            <NavLink to="/admin/settings" className={({ isActive }) => isActive ? 'active' : ''} onClick={() => setIsOpen(false)}>
                                <span><FiSettings /></span>
                                <span className="link-text">Menu settings</span>
                            </NavLink>
                        </li>
                    </ul>
                    <ul className="sidebare_content_bottom">
                        <li>
                            <NavLink to="/deconnexion" className={({ isActive }) => isActive ? 'active' : ''} onClick={() => setIsOpen(false)}>
                                <span><FiLogOut /></span>
                                <span className="link-text">Déconnexion</span>
                            </NavLink>
                        </li>
                    </ul>
                </div>

            </div>
        </>
    );
}

export default Sidebare;
