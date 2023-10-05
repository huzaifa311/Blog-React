import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import { CircularProgress } from '@mui/material';
import { db } from '../firebase';
import { addDoc, collection } from 'firebase/firestore';
import Swal from 'sweetalert2';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 280,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 2,
    borderRadius : '20px'
};

export default function TransitionsModal() {
    const [open, setOpen] = React.useState(false);
    const [loader, setloader] = React.useState(false);
    const authorInfo = JSON.parse(localStorage.getItem('user'));

    const publishDateTime = new Date();

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const blogCollection = collection(db, 'blogs')
    const [title, setTitle] = React.useState('')
    const [desc, setDesc] = React.useState('')

    const publishBlog = async (e) => {
        e.preventDefault()
        // console.log('title : ', title, " desc : ", desc);
        const author = authorInfo.signupName
        const authorImage = authorInfo.imageUrl

        try {
            setloader(true)
            const blogObj = {
                "title": title,
                "desc": desc,
                "author": author,
                'uid': authorInfo.uid,
                'publishDateTime': publishDateTime,
                'authorImg': authorImage
            }
            let blogPublished = await addDoc(blogCollection, blogObj)
            Swal.fire(
                'Good job!',
                'Blog Published Successfully!',
                'success'
            )
            // console.log("blog published with id: ", blogPublished.id)
            setOpen(false)
        } catch (error) {
            // console.log(error.message);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error,
            })
        } finally {
            setloader(false)
        }
    }

    return (
        <div className='mt-24 justify-center flex'>
            <Button variant='contained' onClick={handleOpen} sx={{
                background: 'rgb(126, 34, 206)',
                ":hover": {
                    background: 'rgb(150, 60, 230)'
                }
            }
            }>Publish Blog</Button>
            <Modal
                
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                // onClose={handleClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={open} >
                    <Box sx={style} >

                        <Box>
                            <h1 className='text-4xl font-bold'>Publish Blog</h1>
                        </Box>

                        <Box component={'form'} onSubmit={publishBlog}>

                            <input type="text" placeholder='Title' className='border mt-4 border-stone-500 rounded-lg p-3 w-full' onChange={e => setTitle(e.target.value)} />

                            <textarea type="text" placeholder='Description¿' className='border h-[120px] my-4 border-stone-500 rounded-lg p-3 w-full' onChange={e => setDesc(e.target.value)} />

                            <Box sx={{
                                display: 'flex',
                                justifyContent: 'end',
                                gap: "10px",
                            }}>
                                <Button variant='contained' type='submit'>{loader ? (<CircularProgress color="success" />) : ('Add')}</Button>
                                <Button variant='contained' color='error' onClick={handleClose}>Close</Button>
                            </Box>
                        </Box>

                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}