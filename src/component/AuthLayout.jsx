import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
export default function Protected({ chidren, authentication = true }) {
  const [Loader, setLoader] = useState(true);

  // Here You will be Taking Or Checking Whether

  const navigation = useNavigate();
  const authStatus = useSelector((state) => state.auth.status);
  // Here UseEffect will Tell me Whether to go to the Home Page Or Login Page
  useEffect(() => {
    // Here Depending up on THE AuthSatatus and the Authentication i will Go And Check Whther to

    // here insated of these You Can Actually Use the authstatus thing 

    // // if(authstatus===true){
    // navigation('/')
    // }
    // else if(authStatus!==true){
    //     navigation('/login')
    // }

    //  Here as You Can See Above Aslo you can actually do the Things Buth Dong in these Way More Commandable
    if(authentication && authStatus!==authentication){
        navigation('/login')
    }else if(!authentication && authStatus!==authentication){
        navigation('/')
    }
   setLoader(false)
  }, [authStatus,authentication,navigation]);
  return <div></div>;
}
