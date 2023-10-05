import React, { useEffect, useState } from 'react'
import NavBar from '../Components/NavBar'
import { auth, db, signOut } from '../firebase';
import { useNavigate } from 'react-router-dom';
import TransitionsModal from '../Components/Modal';
import { collection, onSnapshot } from 'firebase/firestore';
import BlogCard from '../Components/BlogCard';
import CircularColor from '../Components/Loader';
import Swal from 'sweetalert2';

const Blogger = () => {
  const navigateTo = useNavigate();
  const checkLogin = () => {
    const user = localStorage.getItem("user");
    if (!user) {
      navigateTo('/login')
      return;
    }
  }

  useEffect(() => {
    displayName()
    fetchDisplayBlogs()
    checkLogin()
  }, [])
  const [userName, setUserName] = useState('');
  const [loader, setLoader] = useState(false);
  const authorInfo = JSON.parse(localStorage.getItem('user'));
  const [blogs, setBlogs] = useState([]);

  async function fetchDisplayBlogs() {
    try {
      setLoader(true)
      let tempArr = [];
      const unsub = onSnapshot(collection(db, 'blogs'), doc => {
        tempArr = []
        doc.forEach(data => {
          tempArr.push({ ...data.data(), id: data.id })
        })
        setBlogs(tempArr.sort((a, b) => b.publishDateTime - a.publishDateTime));
        // console.log(blogs);
      })

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

  const logout = async () => {
    try {
      setLoader(true)
      await signOut(auth);
      localStorage.removeItem('user')
      signOut(auth).then(() => {
        console.log('signed out');
        navigateTo('/login')
      })

    } catch (error) {
      console.log(error);
    } finally {
      setLoader(false)
    }
  }
  function displayName() {
    const name = JSON.parse(localStorage.getItem("user"));
    setUserName(name?.signupName);
  }
  return (
    <div>
      <NavBar customClass2={'cursor-pointer'} li1={userName} li2={loader ? <CircularColor /> : 'Logout'} onClick2={logout} linkTo1={'/profile'} imgSrc={authorInfo?.imageUrl?.imageUrl} imgClass={`w-10 h-10 rounded-full`} />
      <TransitionsModal />
      <div className='flex justify-center mt-8 mb-5'>

        <h1 className='text-4xl font-bold'>{loader ? <CircularColor /> : 'All Blogs'}</h1>
      </div>
      <div className='flex flex-wrap justify-center mb-12 gap-5'>
        {blogs.map((blog, index) => {
          return <BlogCard key={blog.id} title={blog.title} linkToProfile={`/singleBlog/${blog?.author}`} description={blog.desc} author={blog.author} date={blog?.publishDateTime?.toDate().toLocaleString()} authorImage={blog?.authorImg.imageUrl} />

        })}
      </div>
    </div>
  )
}

export default Blogger
