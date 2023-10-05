import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Index from '../Pages/Index'
import Signup from '../Pages/Signup'
import Login from '../Pages/Login'
import Blogger from '../Pages/Blogger'
import Profile from '../Pages/Profile'
import SingleBlog from '../Pages/SingleBlog'

const Routing = () => {
  return (
    <div>
      <Routes>
        <Route index element={<Index />}/>
        <Route path='/signup' element={<Signup />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/blogger' element={<Blogger />}/>
        <Route path='/profile' element={<Profile />}/>
        <Route path="/singleblog/:blogid" element={<SingleBlog />} />
      </Routes>
    </div>
  )
}

export default Routing
