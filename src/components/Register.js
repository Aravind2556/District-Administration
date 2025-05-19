import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Register() {
    const [formData, setFormData] = useState({
        fullname: '',
        email: '',
        contact: '',
        password: ''
    });

    const navigate = useNavigate();
    const apiurl = process.env.REACT_APP_URL; // or your deployed backend URL

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            ...formData,
        }

        try {
            const res = await fetch(`${apiurl}/register`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            const data = await res.json();

            if (res.ok) {
                alert('Admin registered successfully!');
                navigate('/login');
            } else {
                alert(data.message || 'Registration failed');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Something went wrong!');
        }
    };

    return (
        <div className="min-h-screen bg-blue-50 flex flex-col justify-center items-center px-4">
            <h1 className="text-2xl md:text-3xl font-bold text-blue-900 mb-6 text-center">
                Driven Centralized Dashboard for Real-Time Monitoring and Governance in District Administration
            </h1>

            <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                <h2 className="text-xl font-semibold text-blue-800 mb-4">Admin Register</h2>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Full Name</label>
                        <input
                            type="text"
                            name="fullname"
                            value={formData.fullname}
                            onChange={handleChange}
                            required
                            className="w-full mt-1 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full mt-1 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Contact</label>
                        <input
                            type="text"
                            name="contact"
                            value={formData.contact}
                            onChange={handleChange}
                            required
                            className="w-full mt-1 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="w-full mt-1 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Role</label>
                        <div className="mb-4 ">

                            <select name='role' className='w-full border border-gray-300 rounded px-3 py-2 font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500' aria-label="select status" value={formData.role}
                            >
                                <option value=""> Select Roles</option>
                                <option value="admin">Super Admin</option>
                                <option value="citizen">Citizen</option>

                            </select>
                        </div>

                    </div>
                    <button type="submit" className="w-full bg-blue-700 text-white py-2 rounded hover:bg-blue-800 transition">
                        Register
                    </button>
                </form>
                <p className="mt-4 text-sm text-center text-gray-600">
                    Already have an account? <Link to="/login" className="text-blue-600 hover:underline">Login</Link>
                </p>
            </div>
        </div>
    );
}
