import config from "../config/config.js";
// Client → stores connection config
// Account → uses that config to make auth requests Here Account is Class
// Account is Class Which will be aahving Differnt Methods To Execute it Like login Logout
// client nothing but Which create the Connection Between Appwrite Backenmd and here in the project

import { Client, Account, ID } from "appwrite"; // Here App write Cleni Nothing But It is Connection Thing Which will Connect
// Your Appwrite Id and All and Account Has Login thing Logout Thing and all

class AuthSerive {
  client = new Client();
  account;
  constructor() {
    this.client
      .setEndpoint(config.appWriteUrl)
      .setProject(config.appWriteProjectId);
    this.account = new Account(this.client); // These     Account Will Create the nessecry Connection Between them
  }

  // Instead Of Creating Automaticalyy Creating the Function
  // Here We will Create the Login Func,Log-Out Func,Async-Func
  //    Here we will Create the Things   That Can be Used AnyWay
  async createAccount({email,password,name}){
    // Here there Might be Like Error While Creating Account
    try{
      const userAccount=   await this.account.create({
            userID:ID.unique(),
            email,
            password,
            name
         })
         if(userAccount){
            // Here Since The Account is Created // Lets Us Redirect Him to Login
            return this.Login({email,password})
         }
         else{
            return userAccount; // Here IF Useraccount is empty it will return null
         }
    }
    catch(error){
        throw error;
        
    }
  }

  // Here Since We Created 
  async Login({email,password}){
    // Here Need to Create The login Credentials 
   try{
    // Here We are Just Returning the value
       return await this.account.createEmailPasswordSession({  
      email,password
    })
   }
   catch(error){
    throw error

   }
  }

  // Then When user Logged in We nned to get is Accont 
  async GetUser(){
    try{
    return await this.account.get()
    }
    catch(error){
      throw(error)

    }
  }

  // These is For LogOut things
  async logout(){
    try{
       await this.account.deleteSession({ sessionId: "current" })   // Here current menas special keyword where Appwrite Only Understands 
    }
    catch(error){
      throw(error)

    }
  }
}
const authservice = new AuthSerive();
export default authservice;
// Since there i Was Creating the Class If ANYONE NEED TO CALL THESE AuthService They Need to Create the Object
// So Here i Will Create the Things Which will Effect
