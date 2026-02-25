import React from 'react'
import {Conatainer,Logo,LogoutButton} from '../index.js'
import{Link} from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
function Header() {
  // Here There are Certain Things Like Logout Button And All and Will SHow onlty Those buttons Whern 
  // Here auth Menas Its the Name of the authslice selctor
  const authstatus=useSelector((state)=>state.auth.status)
  // Here Navigate means after certain thing you will get it 
  const navigate=useNavigate()

  // Here We will Create navItems
  const navItems=[
    {
      name:'Home',
      slug:'/',
      active:true
    },
     {
      name:'Login',
      slug:'/login',
      // Here Login button Willbe Shown Only When status is True
      active:!authstatus
    },
    {
      name:'Signup',
      slug:'/signup',
      // Here Login button Willbe Shown Only When status is True
      active:!authstatus
    },
    {
      name:'Login',
      slug:'/login',
      // Here Login button Willbe Shown Only When status is True
      active:!authstatus
    },
    {
      name:'All Post',
      slug:'/all-post',
      // Here Login button Willbe Shown Only When status is True
      active:authstatus
    },
    {
      name:'Add Post',
      slug:'/add-post',
      // Here Login button Willbe Shown Only When status is True
      active:authstatus
    },
   
  ]
  return (
   <header className='py-3 shadow bg-gray-500'>
    <Conatainer>
    <nav className='flex'>
      <div className="mr-4">
        <Link to='/'>
        <Logo width='70px'/>
        </Link>
      </div>
      <ul className='flex ml'>
      {navItems.map((items)=>{
            items.active ?(
              // Note : When Ever there is Repeat of the HTML Elemsnts There i need To Add Keys
              <li key={items.name}>
                <button onClick={()=>{navigate(items.slug)}} className=''>{items.name}</button>
              </li>
            ):null
      })}
        {/* iF THE Auth Person is True in the Sense if he is Loggin then only Show logout Button */}
        {authstatus && ( // Here Thewse Pices of Code ias Simple If The User Is Active then Only Dispaly the  Log Out Code
          <li>
            <LogoutButton/>
          </li>
        )}
      </ul>
    </nav>

    </Conatainer>
   </header>
  )
}

export default Header
