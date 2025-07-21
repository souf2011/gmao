import React, { useState, useRef, useEffect } from "react";
import { FaBell } from "react-icons/fa";


function Notifications() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="Notifications">
      <div
        className="icon"
        onClick={toggleDropdown}
      >
        <span className="bell">
          <FaBell />
        </span>
        <span className="numbers">
          3
        </span>
      </div>

      {isOpen && (
        <div ref={dropdownRef} className="notification-dropdown">
          <h3 className="dropdown-title">Notifications</h3>
          <ul className="notification-list">
            <li className="notification-item">
              <span className="notification-message">Nouvelle adhésion reçue</span>
              <span className="notification-time">10 min</span>
            </li>
            <li className="notification-item">
              <span className="notification-message">Membre expiré</span>
              <span className="notification-time">1 h</span>
            </li>
            <li className="notification-item">
              <span className="notification-message">Rapport généré</span>
              <span className="notification-time">Yesterday</span>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default Notifications;
