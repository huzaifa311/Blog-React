import React, { useEffect, useState } from 'react'
import { db } from '../firebase';
import { collection, onSnapshot } from 'firebase/firestore';
import BlogCard from '../Components/BlogCard';
import Header from '../Components/Header';
import Swal from 'sweetalert2';
import { useParams } from 'react-router-dom'

const SingleBlog = () => {

    useEffect(() => {
        fetchDisplayBlogs()
    }, [])

    const authorInfo = JSON.parse(localStorage.getItem('user'));
    const [blogs, setBlogs] = useState([]);
    const { blogid } = useParams();
    
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
        <>
            <div>
                {
                    authorInfo ? (<Header li={'Dashboard'} linkTo={'/blogger'} />) : (<Header li={'Home'} linkTo={'/'} />)
                }

                <h1 className='text-4xl font-sans font-bold flex justify-center mt-[79px]'>{`All Blogs from "${blogid}" `}</h1>

                <div className='flex flex-wrap justify-center mt-10 mb-6 gap-4'>
                    {blogs.map((blog, index) => {
                        let blogAuthor = blog?.author;
                        if (blogid === blogAuthor) {
                            return <div key={blog.id}>

                                <BlogCard key={blog.id} title={blog.title} description={blog.desc} author={blog.author} date={blog?.publishDateTime?.toDate().toLocaleString()} authorImage={blog?.authorImg.imageUrl} />
                            </div>

                        }
                    })}
                </div>
            </div>
        </>
    )
}

export default SingleBlog
