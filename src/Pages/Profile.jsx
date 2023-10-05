import React, { useEffect, useState } from 'react'
import { db } from '../firebase';
import { collection, doc, onSnapshot, deleteDoc } from 'firebase/firestore';
import BlogCard from '../Components/BlogCard';

// import NavBar from '../Components/NavBar'
import ProfileCard from '../Components/ProfileCard'
import Header from '../Components/Header';
import Swal from 'sweetalert2';
import CircularColor from '../Components/Loader';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigateTo = useNavigate();
  const checkLogin = ()=>{
    const user = localStorage.getItem('user')
    if(!user){
      navigateTo('/login')
    }
  }
  
  useEffect(() => {
    checkLogin()
    fetchDisplayBlogs()
  }, [])
  const authorInfo = JSON.parse(localStorage.getItem('user'));
  
  const [blogs, setBlogs] = useState([]);
  const [loader, setLoader] = useState(false);
  const showDeleteButton = true;

  async function fetchDisplayBlogs() {
    try {
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
    }
  }

  const dltBlog = async (blogId) => {
    try {
      setLoader(true)
      let a = confirm('Are you sure?')

      if (a === true) { console.log("true"); }
      else {
        Swal.fire(
          'ALRIGHT!',
          'Deletion Process Stops!',
          'success'
        )
        console.log("false");
        return;
      }
      // console.log('dltBlog qith id ', blogId);

      let blogDlt = await deleteDoc(doc(db, 'blogs', blogId))
      Swal.fire(
        'DELETED!',
        'Blog Deleted Successfully!',
        'success'
      )
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
      <Header li={'Dashboard'} linkTo={'/blogger'} />
      <div className='flex justify-center'>

        <ProfileCard name={authorInfo?.signupName} email={authorInfo?.signupEmail} imageUrl={authorInfo?.imageUrl.imageUrl} />
      </div>
      <h1 className='text-4xl font-sans font-bold flex justify-center mt-12'>Your Blogs</h1>
      {loader ? <CircularColor /> :
        <div className='flex flex-wrap justify-center mt-10 mb-6 gap-4'>
          {blogs.map((blog, index) => {

            let blogAuthor = blog?.author;
            const authorName = authorInfo.signupName;
            if (authorName === blogAuthor) {
              return <div key={blog.id}>
                {loader ? <CircularColor /> :
                  <BlogCard key={blog.id} title={blog.title} description={blog.desc} author={blog.author} date={blog?.publishDateTime?.toDate().toLocaleString()} authorImage={blog?.authorImg.imageUrl} showDeleteButton={showDeleteButton} onClickdlt={() => dltBlog(blog.id)} />}
              </div>

            }
          })}
        </div>}
    </div>
  )
}

export default Profile
