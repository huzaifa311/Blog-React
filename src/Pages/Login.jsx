import React, { useEffect, useState } from 'react'
import NavBar from '../Components/NavBar'
import { Link, useNavigate } from 'react-router-dom';
import Header from '../Components/Header';
import { signInWithEmailAndPassword, auth, db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import CircularColor from '../Components/Loader';
import Swal from 'sweetalert2';
import { TextField } from '@mui/material';
import './Auth.css';


const Login = () => {
    const navigateTo = useNavigate();

    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [loader, setLoader] = useState(false)

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoader(true)
            // console.log('Logging in with email:', loginEmail, 'and password:', loginPassword);
            const userLogin = await signInWithEmailAndPassword(auth, loginEmail, loginPassword)
            const userRef = doc(db, 'users', userLogin.user.uid)
            const docSnap = await getDoc(userRef);
            if (!docSnap.exists) {
                // console.log("No such document!");
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Invalid User!',
                })
                return
            }
            // console.log("Document data:", docSnap.data());
            const userData = docSnap.data();
            localStorage.setItem("user", JSON.stringify(userData));
            navigateTo('/blogger')
        } catch (error) {
            // console.log(error.message);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error,
            })
        } finally {
            setLoader(false)
        }

    }
    return (
        <div>
            <Header li={'Signup'} linkTo={'/signup'} />
            <h4 className="text-4xl font-bold ml-12 mt-[100px]"> <Link to='/signup'>Login</Link></h4>
            <div className=" flex justify-center mt-20">
                <div className="bg-gray-100 w-96 p-8 rounded-lg border border-slate-300 boxShadow">
                    <form onSubmit={handleLoginSubmit} className=''>
                        <div className="mb-4">
                            <TextField
                                id='outlined-basic'
                                label='Email Address'
                                type="email"
                                className="w-full p-2 border border-gray-500 rounded focus:outline-none focus:border-purple-700"
                                value={loginEmail}
                                onChange={(e) => setLoginEmail(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <TextField
                                id='outline-basic'
                                label='Password'
                                type="password"
                                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-purple-700"
                                value={loginPassword}
                                onChange={(e) => setLoginPassword(e.target.value)}
                            />
                        </div>
                        <div className='flex justify-center mt-5'>
                            <button
                                type="submit"
                                className="bg-purple-700 text-white font-semibold py-2 px-4 rounded hover:bg-purple-800 focus:outline-none focus:ring focus:ring-blue-300 mb-3 flex justify-center"
                            >{loader ? <CircularColor /> : 'Login'}
                            </button>
                        </div>
                    </form>

                    <div className="flex justify-center mt-2">
                        <span className="text-gray-600 ">
                            Don't have an account?
                            <Link to='/signup'
                                type="button"
                                className="ml-2 text-blue-500 focus:outline-none hover:cursor-pointer"
                            >
                                Sign Up
                            </Link>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
