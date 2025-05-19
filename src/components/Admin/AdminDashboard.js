import React, { useEffect, useState } from 'react'


import { useNavigate } from 'react-router'
import notify from '../../assets/notification-bell.png'
import alertImage from '../../assets/text.png'
import project from '../../assets/project.png'
import dpet from '../../assets/deptartment.png'
import LoadingPage from '../../components/Loading'

export default function AdminDashboard() {
    const [see, setSee] = useState(false)
    const url = process.env.REACT_APP_URL

    // Notification send
    const [viewNotify, setViewNotify] = useState(null)

    const getNotify = `${url}/notification`
    console.log(getNotify)

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const response = await fetch(getNotify)
                const data = await response.json()

                console.log("Fetched notification data:", data)

                if (data.success && Array.isArray(data.notification)) {
                    setViewNotify(data.notification)
                } else {
                    console.warn("Unexpected response structure:", data)
                    setViewNotify([]) // set empty to avoid null errors
                }
            } catch (error) {
                console.error("Error fetching notifications:", error)
            }
        }

        fetchNotifications()
    }, [getNotify])

    const navigate = useNavigate()

    // Edit  notification
    const [statusMap, setStatusMap] = useState({});

    const View = (id) => {
        const notifyStatus = statusMap[id]; // Get status of the specific notification

        if (!notifyStatus) {
            alert("Please select a status before updating.");
            return;
        }

        fetch(`${url}/upadte-notification/${id}`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            credentials: 'include',
            body: JSON.stringify({ status: notifyStatus })
        })
            .then(res => res.json())
            .then(data => {
                if (data.success === true) {
                    alert(data.message);
                } else {
                    alert(data.message);
                }
            })
            .catch(err => {
                console.log("Error:", err);
                alert("Trouble in connecting to the Server!");
            });
    };

    console.log("Views", viewNotify)

    // Create citizen
    const [create, setCreate] = useState(false)

    const [formData, setFormData] = useState({
        fullname: '',
        email: '',
        contact: '',
        password: ''
    });
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            ...formData,
            role: 'supervisior'
        }

        try {
            const res = await fetch(`${url}/register`, {
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


    if (viewNotify === null) {
        return <LoadingPage />
    }

    return (
        <div>
            <section className="bg-gradient-to-br from-blue-200 via-blue-50 to-blue-100  w-full min-h-screen overflow-hidden py-10 px-4">

                <div className="w-full mt-auto pb-3 px-4 sm:px-6 md:px-8">
                    <div className="relative flex justify-start px-4 sm:px-6 md:px-8">
                        {/* Notification Icon */}
                        <div className="flex-shrink-0">
                            <img
                                src={notify}
                                alt="Notification"
                                className="w-10 h-10 sm:w-12 sm:h-12 md:w-[50px] md:h-[50px] transition-transform duration-300 ease-in-out cursor-pointer"
                                onClick={() => setSee(!see)}
                            />
                        </div>

                        {/* Notification Dropdown */}
                        {see && (
                            <div className="absolute top-full left-0 mt-2 w-full sm:w-80 max-w-md px-2 sm:px-0 z-50">
                                {viewNotify && viewNotify.length > 0 ? (
                                    viewNotify.map((notifi, index) => (
                                        <div
                                            key={notifi.notify_id}
                                            className="bg-white border border-gray-200 rounded-lg shadow mb-3 w-full"
                                            role="alert"
                                        >
                                            <div className="flex items-center justify-between px-4 py-2 border-b">
                                                <div className="flex items-center space-x-2">
                                                    <img src={alertImage} alt="alert icon" className="w-5 h-5 rounded" />
                                                    <strong className="text-sm">{notifi.title}</strong>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <small className="text-xs text-gray-500">{new Date(notifi.createdAt).toLocaleString()}</small>
                                                    <button
                                                        type="button"
                                                        className="text-gray-500 hover:text-red-500 text-sm"
                                                        onClick={() => setSee(false)}
                                                    >
                                                        ✕
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="px-4 py-3 text-sm text-gray-700">
                                                <strong>{notifi.citizen.fullname || "Unknown User"}</strong> — {notifi.message}
                                            </div>
                                            <div className="flex gap-4 px-4 pb-2">
                                                <label>
                                                    <input
                                                        type="radio"
                                                        name={`status-${notifi.notify_id}`}
                                                        value="ongoing"
                                                        checked={statusMap[notifi.notify_id] === 'ongoing'}
                                                        onChange={(e) =>
                                                            setStatusMap(prev => ({ ...prev, [notifi.notify_id]: e.target.value }))
                                                        }
                                                    /> Ongoing
                                                </label>
                                                <label>
                                                    <input
                                                        type="radio"
                                                        name={`status-${notifi.notify_id}`}
                                                        value="completed"
                                                        checked={statusMap[notifi.notify_id] === 'completed'}
                                                        onChange={(e) =>
                                                            setStatusMap(prev => ({ ...prev, [notifi.notify_id]: e.target.value }))
                                                        }
                                                    />Completed</label>
                                            </div>
                                            <button
                                                onClick={() => View(notifi.notify_id)}
                                                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-200 shadow-sm hover:shadow-md text-sm font-medium m-3"
                                            >

                                                Status
                                            </button>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center p-4 text-gray-500">No notifications</div>
                                )}
                            </div>
                        )}
                    </div>

                    <div>

                        <div className="flex justify-end pt-4 pr-4">
                            <button
                                className="bg-sky-500 hover:bg-sky-600 text-white font-medium px-4 py-2 rounded"
                                onClick={() => setCreate(true)}
                            >
                                Create SuperVisior
                            </button>
                        </div>

                    </div>
                </div>

                <div className="flex flex-wrap justify-center gap-8 items-center">
                    {/* Loan Card */}
                    <div className="w-full sm:w-80 bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6">
                            <img src={project} alt="Loan" className="mx-auto h-60 object-contain" />

                            <div className="p-5">
                                <h5 className="mb-4 text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center">
                                    Project
                                </h5>
                                <div className="flex justify-center">
                                    <button
                                        onClick={() => navigate('/project')}
                                        className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-200 to-orange-100 text-black rounded font-semibold shadow-md hover:opacity-90 transition duration-300"
                                    >
                                        Manage
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* License Card */}
                    <div className="w-full sm:w-80 bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6">
                            <img src={dpet} alt="License" className="mx-auto h-60 object-contain" />

                            <div className="p-5">
                                <h5 className="mb-4 text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center">
                                    Department
                                </h5>
                                <div className="flex justify-center">
                                    <button
                                        onClick={() => navigate('/dept')}
                                        className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-200 to-orange-100 text-black rounded font-semibold shadow-md hover:opacity-90 transition duration-300"
                                    >
                                        Manage
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {create && (
                    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center px-4">
                        <div className="bg-white p-8 rounded shadow-md w-full max-w-md relative">
                            <button
                                onClick={() => setCreate(false)}
                                className="absolute top-2 right-2 text-gray-500 hover:text-red-600 text-xl font-bold"
                            >
                                &times;
                            </button>
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

                                <button type="submit" className="w-full bg-blue-700 text-white py-2 rounded hover:bg-blue-800 transition">
                                    Register
                                </button>
                            </form>
                        </div>
                    </div>
                )}


            </section>
        </div>
    )
}
