import config from "../config/config.js";

import { Client, ID, Databases, Storage, Query } from "appwrite";

// Here The Same Concept Like Previous Concepts Where We Will be Creating the databases
class Sql {
  // Here we be Creating the Certain Methods which will be Used For the Database
  // Data Fetching Data Loading
  client = new Client();
  // Here the Client is the Bridge Which Connects the Present file with the Backend
  databases;
  bucket; // I Might think here i should have got error why am i not geeting because database here databases and bucket uses ; these menas class fields plus its define dinside the class
  constructor() {
    this.client
      .setEndpoint(config.appWriteUrl)   // Here Config .AppWrite We are Writtng is Nothing but the object thing
      .setProject(config.appWriteProjectId);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  //  Lets Create Something which we were Doing Manualyy in Todo Where we Were  created one SetTodos
  // After the Todo Added You Will Add into the SetTodos

  // Like that Similar After the Creating Post
  async createPost({ title, slug, content, featuredImage, status, userId }) {
    try {
      // Here You Will Return the  Thing That is
      return await this.databases.createDocument(
        config.appWriteDataBaseId,
        config.appWriteCollectionid,
        // Here Document id these id menas After the EACH pOST CREATE DYOU WUILL HAVING Unique Id With
        // it would helpull while Editing Updating ,Deleting
        slug,
        {
          title,
          content,
          featuredImage,
          status,
          userId,
        },
      );
    } catch (error) {
      throw error;
    }
  }
  // Here Come the Update Post
  //     // updateDocument() = UPDATE existing row
  // It does:
  // UPDATE posts SET title="new" WHERE id="123"

  // Here Update thing will take Up All things Similar only Differnce is here we will call function
  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      return await this.databases.updateDocument(
        config.appWriteDataBaseId,
        config.appWriteCollectionid,
        {
          title,
          content,
          featuredImage,
          status,
        },
      );
    } catch (error) {
      throw error;
    }
  }

  // Here Lets Use Delete Post Thing
  async deletePost(slug) {
    try {
      return await this.databases.deleteDocument(
        config.appWriteDataBaseId,
        config.appWriteCollectionid,
        slug,
      );
      return true; // Here After Deleting the Thing you will Return true
    } catch (error) {
      throw error;
      // If Anythings get happens
      return false;
    }
  }

  // Even I Might Feell Why Do I need get Function
  // First You Create 5 Post
  // Ui Will Show the 5 POSTS BUT AS SOON AS I REFRESH THE PAGE GONE
  // REACT UPADTES TO AVOID THESE
  // YOU WILL HAVE ONE GET FUNCTION WHERE YOU WILL CREATE oNE Function whuch gets all posts in DATABASE S
  // THEN YOU CAN ADD USEEFFECT WHEN REFERSH HAPPENS CALL THAT OPARTICLUAR FUNCTION

  // and More Thing is When a user Clicks on one pOST YOU will Redirect him top Particluar Page and from thier you
  // will fetch particular post detaisl and show
  async getPost(slug) {
    try {
      return await this.databases.getDocument(
        config.appWriteDataBaseId,
        config.appWriteCollectionid,
        slug,  // Here ist Uniqe Id
      );
    } catch (error) {
      throw error;
    }
  }

  // getting all post Which are Active
  async getPosts(queries = [Query.equal("status", "active")]) {  //  Here As You can See it is A Default a Value
    try {
      return await this.databases.listDocuments(
        config.appWriteDataBaseId,
        config.appWriteCollectionid,
        queries

      );
    } catch (error) {
      throw error;
      return false;
    }
  }

  // Here I WILL Create the Storage Thing For the Storage of the Files 

  async uploadFile(file){
    try{
      return await this.bucket.createFile(
        config.appWriteBucketid,
        ID.unique(),
        file
      )
    }
    catch(error){
      throw error

    }

  }

  // here Deleting the File
  async DeleteFile(fileid){
    try{
      await this.bucket.deleteFile(
        config.appWriteBucketid,
        fileid
      )
     return true
    }
    catch(error){
      throw error 
    
    }
  }

  getFilePreview(fileid){
    return this.bucket.getFilePreview(
      config.appWriteBucketid,
      fileid
    )
  }
}

const NewObject = new Sql();
export default NewObject;
