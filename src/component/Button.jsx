import React from 'react'

function Button({
    // Here I cULD HAVE tOLD THESE HAS A TEXT BUT FOR AESTHICS WE SAY LIKE THESE
    children,
    type='button' ,// Here the Given Button will be OF Type Button if i want it to have submit ity will have That Nothing to Worry Here
    bgColor='bg-blue-600',
    textColor='text-white',
    className='',
    ...props  // Thing here I MIGHT wANT THESE bUTTON TO bECOME lARGE lIKE tHOSE tHINGS
}) {
  return (
   <button className={`px-4 py-2 rounded-lg ${className} ${bgColor} ${textColor}`} {...props}>{children}</button>
  ) 
}

export default Button
