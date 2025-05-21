import React, { useContext, useState } from 'react'
import Header from './components/Header'
import { Route, Routes } from 'react-router-dom'

import Login from './components/Login'
import Register from './components/Register'
import HomePage from './components/HomePage'
import Dashboards from './components/Admin/Dashboards'
import AdminDashboard from './components/Admin/AdminDashboard'
import Department from './components/Admin/Department'
import VisiorDAshboard from './components/SuperVisior/VisiorDAshboard'
import Citizendash from './components/Citizen/Citizendash'
import { DContext } from './components/Provider'
import LoadingPage from './components/Loading'




export default function App() {
  const { Auth } = useContext(DContext)

  console.log("cnsol", Auth)



  // if (!Auth) {
  //   return <div><LoadingPage /></div>
  // }

  return (
    <div>
      <Header />
      <Routes>
        <Route path='/' element={Auth ? (Auth.role === 'citizen' ? <Citizendash /> : Auth.role === 'admin' ? <AdminDashboard /> : Auth?.role === 'supervisior' ? <VisiorDAshboard /> : <HomePage />) : <HomePage/>} />



        <Route path='/login' element={<Login />}></Route>
        <Route path='/regsiter' element={<Register />}></Route>

        {/* Admin */}
        <Route path='/admin-dash' element={<AdminDashboard />} />
        <Route path='/project' element={<Dashboards />} />
        <Route path='/dept' element={<Department />} />
        {/* SuperVisior */}
        <Route path='/visior' element={<VisiorDAshboard />} />
        {/* Citizen Router */}
        <Route path='/citizen' element={<Citizendash />} />
      </Routes>
    </div>
  )
}





