import React from 'react'
import { Outlet, NavLink } from 'react-router-dom';


function Layout() {
    return (
        <div className="flex min-h-screen">
            <aside className="w-64 bg-gray-800 text-white p-4 space-y-4">
                <h1 className="text-xl font-bold">GMAO Admin</h1>
                <nav className="flex flex-col gap-2">
                    <NavLink to="/" className={({ isActive }) => isActive ? 'font-bold' : ''}>Dashboard</NavLink>
                    <NavLink to="/equipements" className={({ isActive }) => isActive ? 'font-bold' : ''}>Équipements</NavLink>
                    <NavLink to="/interventions" className={({ isActive }) => isActive ? 'font-bold' : ''}>Interventions</NavLink>
                    <NavLink to="/intervenants" className={({ isActive }) => isActive ? 'font-bold' : ''}>Intervenants</NavLink>
                </nav>
            </aside>
            <main className="flex-1 p-6">
                <Outlet />
            </main>
        </div>
    )
}

export default Layout
