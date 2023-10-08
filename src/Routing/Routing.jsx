import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Index from '../Pages/Index'
import Signup from '../Pages/Signup'
import Login from '../Pages/Login'
import Blogger from '../Pages/Blogger'
import Profile from '../Pages/Profile'
import SingleBlog from '../Pages/SingleBlog'
import AuthRoute from '../Routes/AuthRoute'
import ProtectedRoute from '../Routes/ProtectedRoute'

const Routing = () => {
  return (
    <>
      <Routes>

        {/* Public Routes */}
        <Route index element={<Index />} />

        {/* Auth Routes */}
        <Route element={<AuthRoute />}>
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
        </Route>

        {/* Private Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path='/blogger' element={<Blogger />} />
          <Route path='/profile' element={<Profile />} />
        </Route>

        {/* Public and Private Route */}
        <Route path="/singleblog/:blogid" element={<SingleBlog />} />

      </Routes>
    </>
  )
}

export default Routing
