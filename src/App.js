import React from 'react'
import Header from './components/Header'
import { Route, Routes } from 'react-router-dom'

import Login from './components/Login'
import Register from './components/Register'
import HomePage from './components/HomePage'




export default function App() {
  return (
    <div>
      <Header/>
      <Routes>
        <Route path='/' element={<HomePage/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/regiter' element={<Register/>}></Route>
      </Routes>
    </div>
  )
}





