import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Header from '../Components/Header';
import Swal from 'sweetalert2';
import { auth, createUserWithEmailAndPassword, db, storage } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';
import CircularColor from '../Components/Loader';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { TextField } from '@mui/material';
import './Auth.css'

const Signup = () => {

    const navigateTo = useNavigate()
    const [signupEmail, setSignupEmail] = useState('');
    const [signupPassword, setSignupPassword] = useState('');
    const [signupName, setSignupName] = useState('');
    const [profileImg, setProfileImg] = useState('');
    const [loader, setLoader] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleSignupSubmit = async (e) => {
        e.preventDefault();
        setLoader(true)
        // console.log(signupPassword, signupEmail, signupName, profileImg.files[0]);

        const imageUrl = await uploadImage(profileImg.files[0])
        try {
            if (!signupName || !signupEmail || !signupPassword) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Required Fiels are Missing!',
                })
                return
            }
            if (!profileImg) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Upload an Image for your Profile',
                })
                return
            }
            const userAuth = await createUserWithEmailAndPassword(auth, signupEmail, signupPassword)
            const uid = userAuth.user.uid

            const imageRef = ref(storage, `profileImages/${uid}`);
            const userObj = {
                signupName,
                signupEmail,
                imageUrl,
                accountActivate: true,
                uid,
            }
            const userRef = doc(db, "users", uid);
            const userDB = await setDoc(userRef, userObj)
            Swal.fire(
                'Account Created Successfully!',
                'Kindly login to Continue!',
                'success'
            )
            navigateTo('/login')
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error.message,
            })
            // console.log(error.message);
        } finally {
            setLoader(false)
        }


        function uploadImage(file) {
            return new Promise((resolve, reject) => {
                let imageUrl;
                const metaData = {
                    contentType: 'image/jpeg'
                }
                const storageRef = ref(storage, 'profileImages' + file.name)
                const uploadTask = uploadBytesResumable(storageRef, file, metaData)
                uploadTask.on('state_changed', snapshot => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                    switch (snapshot.state) {
                        case 'paused':
                            console.log('Upload is paused');
                            break;
                        case 'running':
                            console.log('Upload is running');
                            break;
                    }
                }, error => {
                    reject({
                        message: 'something went wrong'
                    })
                    switch (error.code) {
                        case 'storage/unauthorized':
                            // User doesn't have permission to access the object
                            break;
                        case 'storage/canceled':
                            // User canceled the upload
                            break;

                        // ...

                        case 'storage/unknown':
                            // Unknown error occurred, inspect error.serverResponse
                            break;
                    }
                },
                    () => {
                        getDownloadURL(uploadTask.snapshot.ref).then(downloadUrl => {
                            console.log('File available at', downloadUrl);
                            resolve({
                                imageUrl: downloadUrl
                            })
                        })
                    }
                )
            })
        }
    }

    return (
        <div>

            <Header li={'Login'} linkTo={'/login'} />
            <h4 className="text-4xl font-bold ml-12 mt-[80px]"> <Link to='/login'>Signup</Link></h4>
            <div className=" flex justify-center mt-10">
                <div className="bg-gray-100 w-96 p-8 border border-slate-400 rounded-lg boxShadow">
                    <form onSubmit={handleSignupSubmit} className='w-full '>
                        <div className="mb-4">
                            <TextField
                                type="text"
                                // id='outline-basic'
                                label="Full Name"
                                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-purple-700"
                                value={signupName}
                                onChange={(e) => setSignupName(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-600 font-semibold mb-2 md:text-sm">
                                Upload Profile Image
                            </label>
                            <input type="file" id="img" name="img" accept="image/*" className='w-full text-sm sm:text-lg p-2 border  hover:border-gray-600 border-gray-300 rounded focus:outline-none focus:border-purple-700' onChange={e => setProfileImg(e.target)} />
                        </div>
                        <div className="mb-5">
                            <TextField
                                // id='outline-basic'
                                type="email"
                                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-purple-700"
                                label="Email"
                                value={signupEmail}
                                onChange={(e) => setSignupEmail(e.target.value)}
                            />
                        </div>
                        <div className="mb-4 relative">
                            <TextField
                                // id='outline-basic'
                                type={showPassword? 'text' : 'password'}
                                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-purple-700"
                                label="Password"
                                value={signupPassword}
                                onChange={(e) => setSignupPassword(e.target.value)}
                            />
                            <button className='mt-2 absolute right-2 top-2 text-blue-500 focus:outline-none hover:cursor-pointer bg-white' type='button' onClick={()=>setShowPassword(!showPassword)}>{showPassword ? 'hide' : 'show' }</button>
                        </div>
                        <div className='flex justify-center'>
                            <button
                                type="submit"
                                className="bg-purple-700 text-white font-semibold py-2 px-4 rounded hover:bg-purple-800 focus:outline-none focus:ring focus:ring-blue-300 mb-3 flex justify-center"
                            >
                                {loader ? <CircularColor /> :
                                    'Signup'}
                            </button>
                        </div>
                    </form>

                    <div className="flex justify-center">
                        <span className="text-gray-600">
                            Already have an account?
                            <Link to='/login'
                                type="button"
                                className="ml-2 text-blue-500 focus:outline-none hover:cursor-pointer"
                            >
                                Login
                            </Link>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup
