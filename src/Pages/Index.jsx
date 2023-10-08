import React, { useEffect, useState } from 'react'
import { db } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { collection, onSnapshot } from 'firebase/firestore';
import BlogCard from '../Components/BlogCard';
import Header from '../Components/Header'
import Swal from 'sweetalert2';

const Index = () => {
  
  useEffect(() => {
    fetchDisplayBlogs()
  }, [])
  const [blogs, setBlogs] = useState([]);

  async function fetchDisplayBlogs() {
    try {
      let tempArr = [];
      const unsub = onSnapshot(collection(db, 'blogs'), doc => {
        tempArr = []
        doc.forEach(data => {
          tempArr.push({ ...data.data(), id: data.id })
        })
        setBlogs(tempArr.sort((a, b) => b.publishDateTime - a.publishDateTime));
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

  return (
    <div>
      <Header li={'Signup'} linkTo={'/signup'} />
      <div className='flex flex-wrap justify-center mt-[80px] mb-6 gap-4'>
        {blogs.map((blog, index) => {
          return <BlogCard key={index} title={blog.title} linkToProfile={`/singleBlog/${blog?.author}`} description={blog.desc} author={blog.author} date={blog?.publishDateTime?.toDate().toLocaleString()} authorImage={blog?.authorImg.imageUrl} />
        })}
      </div>
    </div>
  )
}

export default Index
