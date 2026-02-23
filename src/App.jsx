
import { useEffect, useState } from 'react'
import './App.css'
import {useDispatch} from 'react-redux'
import authservice from './appwrite/auth.js'
function App() {


  // Here Jsut SA Sample For How do i Use the ENV FILES
  // IN Majorityb of the Files it will be Defined by process thing so 
  //  Here Below thing will be Used in Most of the Cases But Here we will be Usingthe VITE Project
 // Since its An Vite App we will Be using the Differnt Things Here
  // console.log(process.env.REACT_APP_APPWRITE_URL);
  // console.log(import.meta.env.VITE_APPWRITE_URL);
  
  // Here we will be Using LoADING Becuase when loading treu still hasnt got the user Data 
  const[Loading,Setloading]=useState(true)

  useEffect(()=>{
    // Since Its An Async Call It Will Return the Promise SO uSE THEN aND cATCH OR fINALLY TO gET THE uSER 
    authservice.GetUser()
    .then((userData)=>{
      // here Disaptch it Into the 
    })

  },[])  // These Empty Array State Defines that It Loads only once when its mounted
  const dispatch=useDispatch()
  return (
    <>
    <h1>Lets DO Some Real-World-Projects</h1>
        
    </>
  )
}

export default App
