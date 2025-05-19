import React, { useEffect, useState } from 'react'

import { useNavigate } from 'react-router-dom'
import LoadingPage from '../Loading'

export default function Department() {

    const apiurl = process.env.REACT_APP_URL
    console.log(apiurl)

    const navigate = useNavigate()



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

    const [see, setSee] = useState(false)

    const [create, setCreate] = useState({
        name: '',
        desc: '',

    })

    const Create = (e, keys) => {
        const value = e.target.value
        setCreate(prev => ({
            ...prev,
            [keys]: value
        }))
    }


    const Save = () => {
        fetch(`${apiurl}/create-dept`,
            {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                credentials: 'include',
                body: JSON.stringify({
                    name: create.name, desc: create.desc
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



    if (dept === null) {
        return <LoadingPage />

    }

    return (
        <div>

            <section className='bg-gradient-to-br from-blue-200 via-blue-50 to-blue-100  h-[100vh]'>
                <main className="w-full py-6 px-4 flex-grow ">
                    <h3 className="text-center text-2xl font-semibold mb-6">Department Details</h3>

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
                                    <th className="p-3">Department Name</th>
                                    <th className="p-3">Description</th>

                                </tr>
                            </thead>
                            <tbody>
                                {/* {name, desc, startDate, status, endDate, departmentID, budget, progress} */}
                                {dept.map((dep, index) => {

                                    return (
                                        <tr
                                            key={index}
                                            className={`${dep.id % 2 === 0 ? 'bg-white' : 'bg-blue-50'} border-b border-gray-200`}
                                        >
                                            <td className="p-3 font-semibold">{index + 1}</td>
                                            <td className="p-3 uppercase">{dep.deptname}</td>
                                            <td className="p-3 uppercase">{dep.desc}</td>

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
                                            <h3 className="text-2xl font-semibold text-[#4835d4] mb-6">Department Information</h3>



                                            <div className="flex flex-col sm:flex-row gap-4 mb-10">
                                                <div className="w-full">
                                                    <label className="block text-lg font-medium mb-1">Department Name :</label>
                                                    <select className="w-full border text-black border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
                                                        value={create.name} onChange={(e) => Create(e, 'name')} >
                                                        <option>Select Department</option>
                                                        <option value="Public Works Department">Public Works Department</option>
                                                        <option value="Highways Department">Highways Department</option>
                                                        <option value="Rural Development">Rural Development</option>
                                                        <option value="Urban Development">Urban Development</option>
                                                    </select>
                                                </div>

                                            </div>



                                        </div>

                                        {/* Right: Contact Details */}
                                        <div className="w-full lg:w-1/2 p-8 bg-blue-700 text-white rounded-t-none lg:rounded-tr-2xl lg:rounded-br-2xl rounded-b-2xl">
                                            <h3 className="text-2xl font-semibold mb-6">Description Details</h3>

                                            <div className="mb-4">
                                                <label className="block text-lg font-medium mb-1">Description : </label>
                                                <input type="text" className="w-full border border-gray-300  text-black rounded-lg px-4 py-3" value={create.desc} onChange={(e) => Create(e, 'desc')} />
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



            </section>
        </div>
    )
}
