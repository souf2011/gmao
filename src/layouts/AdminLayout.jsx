import React from 'react'
import AdminSidebare from '../components/Admin/Sidebare';
import { Outlet, NavLink, Navigate } from 'react-router-dom';
import '../styles/admin.css';
import { useStateContext } from '../context/AppContext';



function AdminLayout() {
    
const User =JSON.parse(localStorage.getItem("User")); ;
    if (!User || Object.keys(User).length === 0) {
        return <Navigate to="/login" replace />;
    }
    return (
        <div className="Layout">
            <AdminSidebare />
            <main className="main_content">
                <Outlet />
            </main>

        </div>
    )
}

export default AdminLayout
