import React, { useEffect, useState } from 'react'
import Header from '../Header'
import { useNavigate } from 'react-router-dom'
import LoadingPage from '../Loading'

export default function Dashboards() {

    const apiurl = process.env.REACT_APP_URL
    console.log(apiurl)

    const navigate = useNavigate()

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


    // Create projects

    const [see, setSee] = useState(false)

    const [create, setCreate] = useState({
        name: '',
        desc: '',
        startDate: '',
        endDate: '',
        departmentID: '',
        status: '',
        budget: '',
        progress: ''
    })

    const Create = (e, keys) => {
        const value = e.target.value
        setCreate(prev => ({
            ...prev,
            [keys]: value
        }))
    }

    // view Department
    const [dept, setDept] = useState(null)
    useEffect(() => {
        fetch(`${apiurl}/dept`, {
            method: "GET",
            credentials: 'include'
        })
            .then(res => res.json())
            .then(data => {
                if (data.success === true) {
                    setDept(data.dept)
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
    console.log(dept)
    const Save = () => {
        fetch(`${apiurl}/create-project`,
            {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                credentials: 'include',
                body: JSON.stringify({
                    name: create.name, desc: create.desc, startDate: create.startDate, status: create.status, endDate: create.endDate, departmentID: create.departmentID,
                    budget: create.budget, progress: create.progress

                })
            })
            .then(res => res.json())
            .then(data => {
                if (data.success === true) {
                    alert(data.message)
                    window.location.reload()
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

    if (project === null) {
        return <LoadingPage />

    }

    return (
        <div>

            <section className='bg-gradient-to-br from-blue-200 via-blue-50 to-blue-100  h-[100vh]'>
                <main className="w-full py-6 px-4 flex-grow ">
                    <h3 className="text-center text-2xl font-semibold mb-6">Project Details</h3>

                    <div className="flex justify-end mb-4">
                        <button
                            className="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded shadow"
                            onClick={() => setSee(!see)}
                        >
                            Create
                        </button>
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


                {/* create projects */}
                {
                    see && (
                        <section>
                            <div className="fixed top-0 left-0 w-full min-h-screen flex justify-center items-center bg-light/75 z-30">
                                <div className="p-3 rounded bg-gradient-to-r from-white to-blue-200 shadow-2xl w-full overflow-auto max-w-[800px] max-h-[90vh]">
                                    <div className="w-full max-w-6xl  overflow-hidden flex flex-col lg:flex-row">
                                        {/* Left: General Information */}
                                        <div className="w-full lg:w-1/2 p-8">
                                            <h3 className="text-2xl font-semibold text-[#4835d4] mb-6">General Information</h3>



                                            <div className="flex flex-col sm:flex-row gap-4 mb-10">
                                                <div className="w-full">
                                                    <label className="block text-lg font-medium mb-1">Name :</label>
                                                    <input type="text" className="w-full border border-gray-300 rounded-lg px-4 py-3" value={create.name} onChange={(e) => Create(e, 'name')} />
                                                </div>

                                            </div>

                                            <div className="mb-10">
                                                <label className="block text-lg font-medium mb-1">Description :</label>
                                                <input type="text" className="w-full border border-gray-300 rounded-lg px-4 py-3" value={create.desc} onChange={(e) => Create(e, 'desc')} />

                                            </div>

                                            <div className="mb-10">
                                                <label className="block text-lg font-medium mb-1">Start Date :</label>
                                                <input type="date" className="w-full border border-gray-300 rounded-lg px-4 py-3" value={create.startDate} onChange={(e) => Create(e, 'startDate')} />

                                            </div>

                                            <div className="mb-10">
                                                <label className="block text-lg font-medium mb-1">End Date :</label>
                                                <input type="date" className="w-full border border-gray-300 rounded-lg px-4 py-3" value={create.endDate} onChange={(e) => Create(e, 'endDate')} />

                                            </div>


                                        </div>

                                        {/* Right: Contact Details */}
                                        <div className="w-full lg:w-1/2 p-8 bg-blue-700 text-white rounded-t-none lg:rounded-tr-2xl lg:rounded-br-2xl rounded-b-2xl">
                                            <h3 className="text-2xl font-semibold mb-6">Progress Details</h3>

                                            <div className="mb-4">
                                                <label className="block text-lg font-medium mb-1">Department : </label>
                                                <select className="w-full border text-black border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
                                                    value={create.departmentID} onChange={(e) => Create(e, 'departmentID')} >
                                                    <option>Select Department</option>
                                                    {
                                                        dept && dept.map((dep, index) => (
                                                            <option key={index} value={dep.id
                                                            }>{dep.deptname}</option>
                                                        ))
                                                    }
                                                </select>
                                            </div>

                                            <div className="mb-4">
                                                <label className="block text-lg font-medium mb-1">Budget: </label>
                                                <input type="text" className="w-full border border-white bg-transparent rounded-lg px-4 py-3 text-white placeholder-white"
                                                    value={create.budget}
                                                    onChange={(e) => Create(e, 'budget')} />
                                            </div>

                                            <div className="flex flex-col sm:flex-row gap-4 mb-4">
                                                <div className="w-full">
                                                    <label className="block text-lg font-medium mb-1">Status :</label>
                                                    <select className="w-full border text-black border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
                                                        value={create.status} onChange={(e) => Create(e, 'status')}>

                                                        <option>Select Status</option>
                                                        <option value="ongoing">Ongoing</option>
                                                        <option value="completed">Completed</option>

                                                    </select>
                                                </div>

                                            </div>
                                            <div className="mb-4">
                                                <label className="block text-lg font-medium mb-1">Progress: </label>
                                                <input type="text" className="w-full border border-white bg-transparent rounded-lg px-4 py-3 text-white placeholder-white"
                                                    value={create.progress} onChange={(e) => Create(e, 'progress')} />
                                            </div>

                                            <div className="flex gap-4 justify-end mt-4">
                                                <button
                                                    className="bg-white text-red-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition"
                                                    onClick={() => setSee(false)}
                                                >
                                                    Cancel
                                                </button>
                                                <button
                                                    className="bg-white text-blue-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition"
                                                    onClick={Save}
                                                >
                                                    Save
                                                </button>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    )
                }


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

            </section>
        </div>
    )
}
