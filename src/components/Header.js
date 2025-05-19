import React, { useState } from 'react';
import { Menu, X } from 'lucide-react'; // Optional: Lucide icons for hamburger
import { useNavigate } from 'react-router-dom';

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);

    const handleToggle = () => {
        setMenuOpen(!menuOpen);


    };

    const navigate = useNavigate()
    const url = process.env.REACT_APP_URL
    const Logout = () => {
        fetch(`${url}/logout`, {
            method: "DELETE",
            credentials: "include"
        })
            .then(res => res.json())
            .then(data => {
                window.location.href = '/login'
                console.log(data)
            })
            .catch(err => {
                console.log("Error :", err)
                alert("Trouble in connecting to Server")
            })
    }

    return (
        <header className="bg-blue-900 text-white shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
                {/* Title */}
                <div className="text-xl md:text-2xl font-semibold">
                    <span className="block">Centralized Dashboard</span>
                </div>

                {/* Desktop Buttons */}
                <div className="hidden md:flex items-center gap-4">
                    <button className="bg-white text-blue-900 px-4 py-2 rounded hover:bg-blue-200 transition" onClick={() => navigate('/login')}>Login</button>
                    <button className="bg-red-500 px-4 py-2 rounded hover:bg-red-600 transition" onClick={Logout}>Logout</button>
                </div>

                {/* Mobile Hamburger */}
                <button className="md:hidden" onClick={handleToggle}>
                    {menuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {menuOpen && (
                <div className="md:hidden px-4 pb-4 flex flex-col gap-2 bg-blue-800">
                    <button className="bg-white text-blue-900 px-4 py-2 rounded hover:bg-blue-200 transition" onClick={() => navigate('/login')}>Login</button>
                    <button className="bg-red-500 px-4 py-2 rounded hover:bg-red-600 transition" onClick={Logout}>Logout</button>
                </div>
            )}
        </header>
    );
}


