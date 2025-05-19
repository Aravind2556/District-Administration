import React, { useEffect, useState } from 'react'
import Header from '../Header'
import { useNavigate } from 'react-router-dom'
import LoadingPage from '../Loading'

export default function Dashboards() {

    const apiurl = process.env.REACT_APP_API_URL
    console, log(apiurl)

    const navigate = useNavigate()

    // View all project Details
    const [project, setProject] = useState(null)

    useEffect(`${apiurl}/project`, {
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

    console.log(project)

    if (project === null) {
        return <LoadingPage />

    }

    return (
        <div>
            <Header />
            <section className='g-gradient-to-r from-blue-300 to-blue-200'>
                <main className="w-full py-6 px-4 flex-grow ">
                    <h3 className="text-center text-2xl font-semibold mb-6">Project Details</h3>

                    <div className="flex justify-end mb-4">
                        <button
                            className="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded shadow"
                            onClick={() => use('/trip_register')}
                        >
                            Create
                        </button>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left shadow-lg rounded-lg overflow-hidden">
                            <thead className="bg-gray-200 text-gray-700 uppercase text-xs">
                                <tr>
                                    <th className="p-3">S.No</th>
                                    <th className="p-3">Project Name</th>
                                    <th className="p-3">Employee Name</th>
                                    <th className="p-3 hidden md:table-cell">Start Date</th>
                                    <th className="p-3 hidden md:table-cell">End Date</th>
                                    <th className="p-3">Department</th>
                                    <th className="p-3">Progress</th>
                                    <th className="p-3">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {project.map((trip, index) => {
                                    const employee = employees.find(emp => emp.id === trip.employeeId);
                                    const isEven = index % 2 === 0;

                                    return (
                                        <tr
                                            key={index}
                                            className={`${isEven ? 'bg-white' : 'bg-blue-50'} border-b border-gray-200`}
                                        >
                                            <td className="p-3 font-semibold">{index + 1}</td>
                                            <td className="p-3 uppercase">{trip.vehicleNumber}</td>
                                            <td className="p-3">{employee ? employee.name : 'Unknown'}</td>
                                            <td className="p-3 hidden md:table-cell">
                                                <span
                                                    className={`inline-block px-2 py-1 text-xs font-medium rounded-full text-white ${trip.status === 'cancelled' ? 'bg-red-600' : 'bg-green-600'}`}
                                                >
                                                    {trip.status}
                                                </span>
                                            </td>
                                            <td className="p-3 hidden md:table-cell">{trip.expenses.length}</td>
                                            <td className="p-3 space-x-2">
                                                <i
                                                    className="bi bi-trash-fill text-red-600 hover:text-red-800 cursor-pointer"
                                                    onClick={() => Delete(trip.id)}
                                                ></i>
                                                <i
                                                    className="bi bi-pencil-square text-blue-600 hover:text-blue-800 cursor-pointer"
                                                    onClick={() => use(`/edit_trip/${trip.id}`)}
                                                ></i>
                                                <i
                                                    className="bi bi-eye-fill text-green-600 hover:text-green-800 cursor-pointer"
                                                    onClick={() => use(`/view_trips/${trip.id}`)}
                                                ></i>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </main>


            </section>
        </div>
    )
}
