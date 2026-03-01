import React from 'react'
import {useDispatch} from 'react-redux'
import authservice from '../../appwrite/auth.js'
import { login,logout } from '../../store/authslice.js'

// Here You Will be Knowing the Ceratian Things More than A Home Page
function LogoutButton() {
    // Here We Will Give the All the Essential Functions Like We Created Login and Logout 
    const dispatch=useDispatch()
    const logoutHandler=()=>{
        authservice.logout()
        .then(()=>{
            // After the Person Enters Logout 
            dispatch(logout())
        })
    }

  return (
    <button className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'>
        LogOut
    </button>
  )
}

export default LogoutButton
