import React ,{useId}from 'react'


// Main Usage Here Ref Is Used To Like Instaed of Doinf Input Boxes Again and Again Here we will do it once
// There Might Be A Doubt Then Why CANT I USE PROPS
// PROPS ARE USED ITS GOOD WAY BUT THERE WE WONT BE USING ONE AND OTHER STAET 
// HERE BY USING FORWARD REF WE CAN ACTULY USE THESE                           
const input=React.forwardRef(function input({
    // These Are The Inputs That we Use
    label,
    type="text",
    className="",
    ...props

},ref){
    const id=useId()
  return (
    <div className='w-full'>
        {label && 
        <label className='inline-block mb-1 pl-1' htmlFor={id}> 
            {label}
            </label>
            }
            <input
             type={type}
                                                                      // Here One Task Remaning For the is To Add ClassName
             className={`${className}`} 
             ref={ref} 
             {...props}
             id={id}                            
             />

    </div>
  )
})



export default input
