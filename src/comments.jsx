{/* 
        e.preventDefault();
        // console.log('Signup with email: ', signupEmail, ' and password: ', signupPassword, 'and name: ', signupName);
        if (signupName === ' ' || signupEmail === ' ' || signupPassword === ' ') {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Enter your Name, Email, Password'
            })
            return;
        }
        try {
            setLoader(true)

            const userAuth = await createUserWithEmailAndPassword(
                auth,
                signupEmail,
                signupPassword
            );
            const uid = userAuth.user.uid;

            const userObj = {
                signupName,
                // signupImg,
                signupPassword,
                signupEmail,
                accountActivation: true,
                uid
            };

            const userRef = doc(db, 'users', uid);
            await setDoc(userRef, userObj);
            setLoader(false)

            Swal.fire(
                'Your Account Created Successfully!',
                'Please Login to Continue!',
                'success'
            )

            setTimeout(() => navigateTo('/login'), 2000)

        } catch (error) {
            setLoader(false)
            alert(error)

        }

     */}

     {try {
        if (title === '' || desc === '') {
            alert("Can't post an Empty Blog")
            return
        }
        const author = authorInfo.signupName

        const blogs = 

        /* const docRef = await setDoc(blogCollection, {
            author,
            title,
            desc,
            publishDateTime,
        }); */
        handleClose()
        console.log('blog publish with id :', docRef.id);

    } catch (error) {
        alert(error)
    }}

    {try {
        const querySnapshot = await getDocs(blogCollection);
        console.log(querySnapshot);
        // const uid = auth.currentUser.uid;
        // querySnapshot.forEach(doc => {
        //   const data = doc.data()
        //   const { title, desc, author, publishDateTime } = data
  
        //   setBlogData({
        //     title,
        //     desc,
        //     author,
        //     publishDateTime
        //   })
        // })
  
      } catch (error) {
        alert(error)
      }}

      {try {
        setLoader(true)
        const userLogin = await signInWithEmailAndPassword(auth, loginEmail, loginPassword)
        const userRef = doc(db, 'users', userLogin.user.uid);
        const docSnap = await getDoc(userRef);
        if (!docSnap.exists()) {
            console.log("No Such Document");
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'User not Found!',
            })
            return;
        }
        const userData = docSnap.data();
        localStorage.setItem("user", JSON.stringify(userData));
        setLoader(false)

        navigateTo('/blogger');


    } catch (error) {
        setLoader(false)
        alert(error)
    }}

    {/* const blogRef = doc(db, 'blogs', authorInfo.uid)
      const docSnap = await getDoc(blogRef);
      if (!docSnap.exists) {
        console.log("No such document!");
        alert("invalid blog")
        return
      }
      console.log(docSnap.data()); */}

    //   onChange={e=>{setProfileImg(e.target.value)}}

    // onClick={()=>editBlog(blog.id)}