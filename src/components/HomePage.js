import React from 'react';
import { Brain, ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function HomePage() {
    const navigate = useNavigate()
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
                    <button className="bg-white text-blue-700 px-6 py-2 rounded font-medium hover:bg-gray-100 transition" onClick={() => navigate('/login')}>
                        <Brain size={18} className="inline mr-1" /> Get Started
                    </button>
                    <button className="bg-white text-blue-700 px-6 py-2 rounded font-medium hover:bg-gray-100 transition">
                        <ShoppingCart size={18} className="inline mr-1" /> View Cart
                    </button>
                </div>
            </section>

            {/* About Section */}
            <section className="py-16 px-6 bg-white">
                <div className="max-w-5xl mx-auto text-center">
                    <h2 className="text-3xl font-bold text-blue-900 mb-4">About the Project</h2>
                    <p className="text-lg text-gray-700">
                        This platform is built to monitor district administration performance in real-time.
                        It centralizes data collection, visualizes trends, and enables quick decisions for better governance.
                        Designed for district officers and administrators, this tool increases efficiency, transparency, and responsiveness.
                    </p>
                </div>
            </section>

            {/* Services Section */}
            <section className="py-16 px-6 bg-blue-100">
                <div className="max-w-6xl mx-auto text-center">
                    <h2 className="text-3xl font-bold text-blue-900 mb-10">Our Core Services</h2>
                    <div className="grid md:grid-cols-3 gap-8 text-left">
                        {[
                            { title: 'Real-Time Monitoring', desc: 'Track district performance, data and metrics instantly.' },
                            { title: 'Smart AI Alerts', desc: 'Automatic alerts for delays, issues or irregularities using ML.' },
                            { title: 'Citizen Service Stats', desc: 'Live stats of grievance redressal, welfare distribution, etc.' },
                            { title: 'Interactive Dashboards', desc: 'Beautiful dashboards for taluk, panchayat, or district level.' },
                            { title: 'Centralized Reports', desc: 'Generate automatic reports for monthly review meetings.' },
                            { title: 'Custom Access Control', desc: 'Different roles (Admin, Collector, Officers) with proper rights.' },
                        ].map((item, index) => (
                            <div key={index} className="bg-white p-6 rounded shadow-md hover:shadow-lg transition">
                                <h3 className="text-xl font-semibold text-blue-800 mb-2">{item.title}</h3>
                                <p className="text-gray-600">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why AI Section */}
            <section className="py-16 px-6 bg-white">
                <div className="max-w-5xl mx-auto text-center">
                    <h2 className="text-3xl font-bold text-blue-900 mb-4">Why Use AI in District Governance?</h2>
                    <p className="text-lg text-gray-700">
                        AI brings smart automation, predictive analytics, and data-driven decision making to government operations.
                        It reduces manual errors, improves response times, and ensures policy implementation is tracked continuously.
                    </p>
                </div>
            </section>

            {/* Cart Placeholder Section */}
            <section className="py-16 px-6 bg-blue-100">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl font-bold text-blue-900 mb-4">Your Cart</h2>
                    <p className="text-gray-600">Cart functionality will be integrated soon. Check back later!</p>
                </div>
            </section>

            {/* Footer / Contact Section */}
            <footer className="bg-blue-900 text-white py-8">
                <div className="max-w-6xl mx-auto px-4 text-center">
                    <p className="mb-2">© 2025 AI Governance Dashboard</p>
                    <p>Designed for District Monitoring & Real-Time Governance</p>
                </div>
            </footer>
        </div>
    );
}
