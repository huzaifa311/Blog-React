// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import {
    getFirestore, collection, addDoc, getDocs, doc, updateDoc, setDoc, getDoc
} from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAedHa0ugRVAzfKF3B_BnsYeoVQnYgudUg",
    authDomain: "react-blog-42ef4.firebaseapp.com",
    projectId: "react-blog-42ef4",
    storageBucket: "react-blog-42ef4.appspot.com",
    messagingSenderId: "941137949421",
    appId: "1:941137949421:web:211a062283937084ff12e4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);
const blogCollection = collection(db , 'blogs')
const storage = getStorage(app)
// const userRef = collection(db, "users");

export {
    app,
    auth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    db,
    addDoc,
    doc,
    setDoc,
    getDoc,
    collection,
    signOut,
    blogCollection,
    storage,
}