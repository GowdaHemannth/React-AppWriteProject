import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as AuthLogin, logout } from "../store/authslice";
import { Button, input, Logo } from "./index";
import { useDispatch } from "react-redux";
import authservice from "../appwrite/auth";
import { useForm } from "react-hook-form";

// You Might Be wONDERING wHY AM I uSING THE USEfROM THING HERE
// tHE sIMPLE THING fOR THESE IS NORMAL FORMS THEIR YOU NEED TO TAKE EACH INPUT STATES AND UPDATE THE
// STATES AND ALONG WITH IT YOU NEED TO ahngle on change things
// but here in react hookfrom all the things will be doe  by these steps only

//.. Here Writting ... the regiister will connect you to the input Box then you can actully do a lot of things tahts it
function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, hadleSubmit } = useForm();
  const { error, setError } = useState("");
  const Login = async (data) => {
    setError("");
    try {
      // Here You Might be Thinkng for login th Data Should be Ceratin Things Like email // Here we Have Wrapped the Data
      const session = await authservice.Login(data);
      if (session) {
        const userData = await authservice.GetUser();
        if (userData) {
          dispatch(AuthLogin(userData));
        }
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };
  return;
  <div className="flex items-center justify-center w-full">
    <div className="mb-2 flex justify-center">
      <span className="inline-block w-full max-w-[100px]">
        <Logo width="100%" />
      </span>
    </div>
    <h2 className="text-center text-2xl font-bold leading-tight">
      Sign in to your account
    </h2>
    <p className="mt-2 text-center text-base text-black/60">
      Don&apos;t have any account?&nbsp;
      <Link
        to="/signup"
        className="font-medium text-primary transition-all duration-200 hover:underline"
      >
        Sign Up
      </Link>
    </p>
    {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

    {/*  From Here We Will See the Output Value Here The Usage of the From  */}
    {/*  By Default We Will Be Using the  */}
    <form onSubmit={hadleSubmit(Login)} className="mt-8">
      <div className="space-y-5">
        {/*  Here These Is Not the Actuall Input Field You Might Think these is A Input Field */}
        <input
          label="email"
          placeholder="Enter Your Email" // Here IhAVE tAKEN THE palceholder when you see these in Inpuit Fired // You Can Actually use These
          type="email"
          {...register("email", {
            required: true,
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,   // Here As you Can See The Eamil mSUT MATCH THE Value 
              message: "Enter a valid email",
            },
          })} // Here the Thing email is Make Sures that it Gaoes into Unique ones
        />
        <input
        label='password'
        placeholder="Enter Your Password"
        type="password"
        {...register("password",{
          required:true
        })}

        />
       <Button
       type="submit"
       className="w-full"
       >Sgin in Into Your Account</Button>
      </div>
    </form>
  </div>;
}

export default Login;
