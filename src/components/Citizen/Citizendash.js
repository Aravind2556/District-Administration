import React, { useContext, useEffect, useState } from 'react'
import notify1 from '../../assets/notification-bell.png'

import { useNavigate } from 'react-router-dom'
import LoadingPage from '../Loading'
import alertImage from '../../assets/text.png'
import { DContext } from '../Provider'

export default function Citizendash() {


    const apiurl = process.env.REACT_APP_URL
    console.log(apiurl)

    const navigate = useNavigate()

    const { Auth } = useContext(DContext)

    // View all project Details
    const [project, setProject] = useState(null)

    useEffect(() => {
        fetch(`${apiurl}/project`, {
            method: "GET",
            credentials: 'include'
        })
            .then(res => res.json())
            .then(data => {
                if (data.success === true) {
                    setProject(data.project)
                    console.log(data)
                }
                else {
                    alert(data.message)
                }
            })
            .catch(err => {
                console.log("Error fetching in checkauth", err)
            })
    }, [])

    console.log(project)

    // View Particular projects

    const [view, setView] = useState(null)
    const [get, setGet] = useState(false)

    const View = (id) => {
        console.log(id)
        fetch(`${apiurl}/Project/${id}`,
            {
                method: 'GET',
                credentials: 'include',

            })
            .then(res => res.json())
            .then(data => {
                if (data.success === true) {
                    setView(data.Project);
                    setGet(true)


                }
                else {
                    alert(data.message)
                }
            })
            .catch(err => {
                console.log("Error : ", err)
                alert("Trouble in connecting to the Server !!!")
            })

    }

    // Create notification

    const [see, setSee] = useState(false)

    const [create, setCreate] = useState({
        title: '',
        msg: '',
        citizen: ''
    })
    console.log("Auth", Auth)
    const Create = (e, keys) => {
        setCreate(prev =>
        ({
            ...prev,
            [keys]: e.target.value,
            'citizen': Auth.id
        })
        )

    }

    const Save = () => {
        fetch(`${apiurl}/create-notification`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            credentials: 'include',
            body: JSON.stringify({
                citizenId: create.citizen, title: create.title, msg: create.msg
            })
        })
            .then(res => res.json())
            .then(data => {
                if (data.success === true) {
                    alert(data.message)
                } else {
                    alert(data.message)
                }
            })
            .catch(err => {
                console.log("Error : ", err)
                alert("Trouble in connecting to the Server !!!")
            })
    }

    const [notify, setNotify] = useState(false)
    const [viewNotify, setViewnotify] = useState(null)

    const getNotify = `${apiurl}/notification`
    console.log(getNotify)

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const response = await fetch(getNotify)
                const data = await response.json()

                console.log("Fetched notification data:", data)

                if (data.success && Array.isArray(data.notification)) {
                    const userNotifications = data.notification.filter(
                        noti => noti.citizen.id === Auth.id
                    );
                    setViewnotify(userNotifications);
                } else {
                    console.warn("Unexpected response structure:", data)
                    setViewnotify([]) // set empty to avoid null errors
                }
            } catch (error) {
                console.error("Error fetching notifications:", error)
            }
        }

        fetchNotifications()
    }, [getNotify])

    if (project === null) {
        return <LoadingPage />

    }

    return (
        <div>

            <section className='bg-gradient-to-br from-blue-200 via-blue-50 to-blue-100  h-[100vh]'>
                <main className="w-full py-6 px-4 flex-grow ">
                    <h3 className="text-center text-2xl font-semibold mb-6">Project Details</h3>

                    <div className="w-full mt-auto pb-3 px-4 sm:px-6 md:px-8">
                        <div className="relative flex justify-start px-4 sm:px-6 md:px-8">
                            {/* Notification Icon */}
                            <div className="flex-shrink-0">
                                <img
                                    src={notify1}
                                    alt="Notification"
                                    className="w-10 h-10 sm:w-12 sm:h-12 md:w-[50px] md:h-[50px] transition-transform duration-300 ease-in-out cursor-pointer"
                                    onClick={() => setNotify(true)}
                                />
                            </div>

                            {/* Notification Dropdown */}
                            {notify && (
                                <div className="absolute top-full left-0 mt-2 w-full sm:w-80 max-w-md px-2 sm:px-0 z-50">
                                    {viewNotify.length > 0 ? (
                                        viewNotify.map((notifi) => (
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
                                                        <small className="text-xs text-gray-500">
                                                            {new Date(notifi.createdAt).toLocaleString()}
                                                        </small>
                                                        <button
                                                            type="button"
                                                            className="text-gray-500 hover:text-red-500 text-sm"
                                                            onClick={() => setNotify(false)}
                                                        >
                                                            ✕
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="px-4 py-3 text-sm text-gray-700">
                                                    <strong>{notifi.citizen?.fullname || "Unknown User"}</strong> — {notifi.message}<br></br>
                                                    <strong>{notifi.status}</strong>
                                                </div>
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
                                    className="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded shadow"
                                    onClick={() => setSee(true)}
                                >
                                    Create Notification
                                </button>
                            </div>

                        </div>
                    </div>
                    <div className="overflow-x-auto shadow-2xl mt-20">
                        <table className="w-full text-sm text-left  rounded-lg overflow-hidden">
                            <thead className="bg-gray-200 text-gray-700 uppercase text-xs">
                                <tr>
                                    <th className="p-3">S.No</th>
                                    <th className="p-3">Project Name</th>
                                    <th className="p-3 hidden md:table-cell">Start Date</th>
                                    <th className="p-3 hidden md:table-cell">End Date</th>
                                    <th className="p-3">Status</th>
                                    <th className="p-3">Department</th>
                                    <th className="p-3">Progress</th>
                                    <th className="p-3">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* {name, desc, startDate, status, endDate, departmentID, budget, progress} */}
                                {project.map((pro, index) => {

                                    return (
                                        <tr
                                            key={index}
                                            className={`${pro.id % 2 === 0 ? 'bg-white' : 'bg-blue-50'} border-b border-gray-200`}
                                        >
                                            <td className="p-3 font-semibold">{index + 1}</td>
                                            <td className="p-3 uppercase">{pro.name}</td>
                                            <td className="p-3 hidden md:table-cell"> {pro.startDate} </td>
                                            <td className="p-3 hidden md:table-cell">{pro.endDate}</td>
                                            <td className="p-3">
                                                <span
                                                    className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${pro.status === 'completed' ? 'bg-green-600' : 'bg-yellow-500'
                                                        }`}
                                                >
                                                    {pro.status}
                                                </span>
                                            </td>
                                            <td className="p-3 uppercase">{pro.departmentID.deptname}</td>
                                            <td className="p-3 uppercase">{pro.progress}</td>
                                            <td className="p-3 space-x-2">

                                                <i
                                                    className="bi bi-eye-fill text-green-600 hover:text-green-800 cursor-pointer"
                                                    onClick={() => View(pro.id)}
                                                ></i>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </main>


                {/* Get Particular projects */}
                {
                    get &&
                    (
                        <section>
                            <div className="fixed top-0 left-0 w-full min-h-screen flex justify-center items-center bg-light/75 z-30">
                                <div className="p-3 rounded bg-gradient-to-br from-blue-200 via-blue-50 to-orange-200 shadow-2xl w-full overflow-auto max-w-[800px] max-h-[90vh]">
                                    <h4 className="m-2 pb-4 text-info text-center text-xl font-semibold">Application Details</h4>

                                    {/* Form Rows */}
                                    <div className="flex flex-wrap px-3">
                                        <div className="w-full md:w-1/2 mb-4 px-2">
                                            <label className="block font-medium text-info mb-1">Name:</label>
                                            <p className="border border-gray-300 rounded px-4 py-2 text-sm font-medium text-black bg-gray-100">{view.name || ''}</p>
                                        </div>
                                        <div className="w-full md:w-1/2 mb-4 px-2">
                                            <label className="block font-medium text-info mb-1">Description:</label>
                                            <p className="border border-gray-300 rounded px-4 py-2 text-sm font-medium text-black bg-gray-100">{view.description}</p>
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap px-3">
                                        <div className="w-full md:w-1/2 mb-4 px-2">
                                            <label className="block font-medium text-info mb-1">Start Date:</label>
                                            <p className="border border-gray-300 rounded px-4 py-2 text-sm font-medium text-black bg-gray-100">{view.startDate}</p>
                                        </div>
                                        <div className="w-full md:w-1/2 mb-4 px-2">
                                            <label className="block font-medium text-info mb-1">End Date:</label>
                                            <p className="border border-gray-300 rounded px-4 py-2 text-sm font-medium text-black bg-gray-100">{view.endDate}</p>
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap px-3">
                                        <div className="w-full md:w-1/2 mb-4 px-2">
                                            <label className="block font-medium text-info mb-1">Status:</label>
                                            <p className="border border-gray-300 rounded px-4 py-2 text-sm font-medium text-black bg-gray-100">{view.status}</p>
                                        </div>
                                        <div className="w-full md:w-1/2 mb-4 px-2">
                                            <label className="block font-medium text-info mb-1">Department:</label>
                                            <p className="border border-gray-300 rounded px-4 py-2 text-sm font-medium text-black bg-gray-100">{view.departmentID.deptname}</p>
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap px-3">
                                        <div className="w-full md:w-1/2 mb-4 px-2">
                                            <label className="block font-medium text-info mb-1">Budget:</label>
                                            <p className="border border-gray-300 rounded px-4 py-2 text-sm font-medium text-black bg-gray-100">{view.budget}</p>
                                        </div>
                                        <div className="w-full md:w-1/2 mb-4 px-2">
                                            <label className="block text-info font-medium mb-1">Progress:</label>

                                            <p className="mb-2 text-sm font-medium text-black">
                                                Progress: {view.progress}%
                                            </p>

                                            <div className="w-full bg-gray-300 rounded-full h-4">
                                                <div
                                                    className="bg-blue-500 h-4 rounded-full transition-all duration-300"
                                                    style={{ width: `${view.progress}%` }}
                                                ></div>
                                            </div>
                                        </div>

                                    </div>

                                    <div className="flex flex-col md:flex-row justify-end items-stretch gap-2 pt-3 px-3">
                                        <button className="bg-gray-100 hover:bg-gray-200 text-black font-semibold py-2 px-4 rounded" onClick={() => setGet(false)}>
                                            Cancel
                                        </button>


                                    </div>
                                </div>
                            </div>
                        </section>


                    )}


                {/* Create Notification */}
                {
                    see && (
                        <div className="fixed inset-0 z-30 flex justify-center items-center bg-white/75">
                            <div className="w-full max-w-3xl max-h-[90vh] overflow-auto bg-white rounded-lg shadow-lg p-6">
                                <h4 className="text-center text-info text-2xl font-semibold mb-6">Notification</h4>

                                {/* Form Rows */}
                                <div className="flex flex-wrap -mx-2">
                                    <div className="w-full md:w-1/2 px-2 mb-4">
                                        <label className="block text-info font-medium mb-1">Title:</label>
                                        <input
                                            type="text"
                                            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-info"
                                            value={create.title}
                                            onChange={(e) => Create(e, 'title')}
                                        />
                                    </div>

                                    <div className="w-full md:w-1/2 px-2 mb-4">
                                        <label className="block text-info font-medium mb-1">Message:</label>
                                        <input
                                            type="text"
                                            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-info"
                                            value={create.message}
                                            onChange={(e) => Create(e, 'msg')}
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-wrap -mx-2 gap-7">

                                    <div className="w-full md:w-1/2 px-2 mb-4 flex justify-around">
                                        <button
                                            className="px-4 py-2 border border-gray-300 rounded-md bg-white hover:bg-gray-100 font-medium"
                                            onClick={() => setSee(false)}
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            className="px-4 py-2 rounded-md bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium hover:opacity-90"
                                            onClick={() => Save()}
                                        >
                                            Send
                                        </button>
                                    </div>
                                </div>


                            </div>
                        </div>
                    )
                }



            </section>
        </div>
    )
}
