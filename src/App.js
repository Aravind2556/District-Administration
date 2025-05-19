import React, { useState } from 'react'
import Header from './components/Header'
import { Route, Routes } from 'react-router-dom'

import Login from './components/Login'
import Register from './components/Register'
import HomePage from './components/HomePage'
import Dashboards from './components/Admin/Dashboards'
import AdminDashboard from './components/Admin/AdminDashboard'
import Department from './components/Admin/Department'




export default function App() {
  const [isauth, setAuth] = useState(false)
  return (
    <div>
      <Header />
      <Routes>
        <Route path='/' element={<HomePage />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/regsiter' element={<Register />}></Route>
        {/* Admin */}
        <Route path='/admin-dash' element={<AdminDashboard />} />
        <Route path='/project' element={<Dashboards />} />
        <Route path='/dept' element={<Department />} />
      </Routes>
    </div>
  )
}





