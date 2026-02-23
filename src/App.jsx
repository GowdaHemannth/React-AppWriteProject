
import { useEffect, useState } from 'react'
import './App.css'
import './index.css'
import {useDispatch} from 'react-redux'
import authservice from './appwrite/auth.js'
import { login,logout } from './store/authslice.js'
import { Footer, Header } from './component/index.js'
function App() {


  // Here Jsut SA Sample For How do i Use the ENV FILES
  // IN Majorityb of the Files it will be Defined by process thing so 
  //  Here Below thing will be Used in Most of the Cases But Here we will be Usingthe VITE Project
 // Since its An Vite App we will Be using the Differnt Things Here
  // console.log(process.env.REACT_APP_APPWRITE_URL);
  // console.log(import.meta.env.VITE_APPWRITE_URL);
  
  // Here we will be Using LoADING Becuase when loading treu still hasnt got the user Data 
  // Loading used till the USEE ffect Finds the Data
  const [loading,setloading]=useState(true)
const dispatch=useDispatch()

  // Here Its just the Effect 
  useEffect(()=>{
    // Since Its An Async Call It Will Return the Promise SO uSE THEN aND cATCH OR fINALLY TO gET THE uSER 
    authservice.GetUser()
    .then((userData)=>{
      // Here Disaptch it Into the Store
      // Here Call Login 
      if(userData){
        dispatch(login({userData}))
      }else{
        dispatch(logout())
      }
    }).catch(()=>{
      console.log("No userInforsmtion has Benn Laoded");
      
    }).finally(()=>
      setloading(false)
    )

  },[])  // These Empty Array State Defines that It Loads only once when its mounted
  
 if (loading) {
  return <h1>Loading...</h1>;
}

return (
<div className="min-h-screen flex justify-center bg-gray-400 pt-10">
  <div className="w-full max-w-4xl">
    <Header />
    <Footer />
  </div>
</div>
);
}

export default App
