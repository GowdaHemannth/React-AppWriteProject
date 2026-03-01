import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as AuthLogin, logout } from "../store/authslice";
import { Button, input, Logo } from "./index";
import { useDispatch } from "react-redux";
import authservice from "../appwrite/auth";
import { useForm } from "react-hook-form";

function Signup() {
  const [error, setError] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, hadleSubmit } = useForm();

  // Here Function to Create the aCCOUNT wE have Already Created it in the authslice
  const CreateAccount = async (data) => {
    setError("");
    try {
      const UserData = await authservice.createAccount(data);
      if (UserData) {
        const CurrentUser = await authservice.GetUser(UserData);
        if (CurrentUser) {
          dispatch(AuthLogin(CurrentUser));
          navigate("/");
        }
      }
    } catch (error) {
      setError(error.message);
    }
  };
  return (
        <div className="flex items-center justify-center">
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
            <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">Sign up to create account</h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Already have an account?&nbsp;
                    <Link
                        to="/login"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign In
                    </Link>
                </p>
                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
              
                <form onSubmit={hadleSubmit(CreateAccount)}>
                      <div className="className='space-y-5'">
                    
                    <input
                      label='Full-Name'
                        placeholder="Enter Your Full Name"
                    {...register ,('name',{
                        required:true,

                    })}
                         />

                         {/* Here You Need One More Filed Taht */}
                   <input 
                     label="Eamil:"
                      placeholder="Enter Your Eamil"
                      type="email"
                       {...register,('email',{
                        required:true,
                         validate: {
                                matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                "Email address must be a valid address",
                            }
                       })}/>

                       {/* Here One More Input Fie;d for Password  */}

                       <input
                        label='password'
                         type="password"
                          placeholder="Enter Your Password"
                           
                           {...register,('password',{
                            required:true
                           })}/>

                         <Button type="submit" className="w-full">Create An Account</Button>  
                        </div>
                </form>
                
  </div>
  </div>
  )

}

export default Signup;
