import React, { useContext, useEffect, useState } from 'react';
import { Brain, ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { DContext } from './Provider';
import Login from './Login';

export default function HomePage() {
    const navigate = useNavigate()
    const apiurl = process.env.REACT_APP_URL
    const { Auth } = useContext(DContext)

    // Project Display
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        fetch(`${apiurl}/project`, { method: "GET", credentials: 'include' })
            .then(res => res.json())
            .then(data => {
                if (data.success === true) {
                    setProject(data.project);
                } else {
                    alert(data.message);
                }
            })
            .catch(err => console.log("Fetch error:", err))
            .finally(() => setLoading(false));
    }, []);

    const [isAuth, setAuth] = useState(false)
    const handleClick = () => {
        if (!Auth) {
            setAuth(true)
        }
    };


    return (
        <div className="bg-blue-50 text-gray-800">

            {/* Hero Section */}
            <section className="min-h-screen bg-gradient-to-r from-blue-300 to-blue-400 text-white px-6 py-16 flex flex-col justify-center items-center text-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                    Centralized Dashboard
                </h1>
                <p className="text-lg md:text-xl mb-6 max-w-3xl">
                    Real-Time Monitoring and Governance in District Administration
                </p>
                <div className="flex gap-4">
                    <button className="bg-white text-blue-700 px-6 py-2 rounded font-medium hover:bg-gray-100 transition" >
                        <Brain size={18} className="inline mr-1" /> Get Started
                    </button>
                    <button className="bg-white text-blue-700 px-6 py-2 rounded font-medium hover:bg-gray-100 transition">
                        <ShoppingCart size={18} className="inline mr-1" /> View Cart
                    </button>
                </div>
            </section>

            {/* About Section */}


            {/* Services Section */}
            <section className="py-16 px-6 bg-blue-100">
                <section className="py-16 px-6 ">
                    <div className="max-w-5xl mx-auto text-center">
                        <h2 className="text-3xl font-bold text-blue-900 mb-4">About the Project</h2>
                        <p className="text-lg text-gray-700">
                            This platform is built to monitor district administration performance in real-time.
                            It centralizes data collection, visualizes trends, and enables quick decisions for better governance.
                            Designed for district officers and administrators, this tool increases efficiency, transparency, and responsiveness.
                        </p>
                    </div>
                </section>

                <div className="max-w-6xl mx-auto text-center">
                    <h2 className="text-3xl font-bold text-blue-900 mb-10">Our Projects</h2>
                    <div className="grid md:grid-cols-3 gap-8 text-left">
                        {loading ? (
                            <p>Loading...</p>
                        ) : (
                            Array.isArray(project) && project.map(item => (
                                <div
                                    key={item._id}
                                    onClick={handleClick}
                                    className="bg-white shadow-md p-4 rounded-lg cursor-pointer hover:shadow-lg transition duration-300 w-full max-w-md mx-auto mb-4"
                                >
                                    <h2 className="text-xl font-bold text-gray-800 mb-1">{item.name}</h2>
                                    <p className="text-sm text-gray-500 mb-3">{item.departmentID.deptname}</p>

                                    {/* Progress Bar */}
                                    <div className="w-full bg-gray-200 rounded-full h-4">
                                        <div
                                            className="bg-blue-500 h-4 rounded-full"
                                            style={{ width: `${item.progress}%` }}
                                        ></div>
                                    </div>

                                    <p className="text-sm text-right text-gray-600 mt-1">{item.progress}%</p>
                                </div>

                            ))
                        )}

                    </div>
                </div>
            </section>



            {/* Footer / Contact Section */}
            <footer className="bg-blue-900 text-white py-8">
                <div className="max-w-6xl mx-auto px-4 text-center">
                    <p className="mb-2">© 2025  Governance Dashboard</p>
                    <p>Designed for District Monitoring & Real-Time Governance</p>
                </div>
            </footer>
        </div>
    );
}
