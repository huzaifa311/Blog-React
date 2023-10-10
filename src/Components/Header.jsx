import React from 'react'
import { Link } from 'react-router-dom'

const Header = ({ li, linkTo }) => {
    return (
        <div className='bg-purple-700 w-full h-[64px] flex justify-between px-4 top-0 fixed'>
            <h1 className='text-lg sm:text-2xl font-bold text-white items-center flex'><Link className='hover:cursor-default' /* to={'/'} */>BLOGGING APP</Link></h1>
            <ul className='flex items-center list-none pl-10'>
                <Link to={linkTo} className='text-white text-base sm:text-lg font-bold cursor-pointer'>{li}</Link>
            </ul>

        </div>
    )
}

export default Header
