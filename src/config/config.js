// Here we are Building these Folder Just to Configure all the Api calss You Know why right 
// Instead of console.log(import.meta.env.VITE_APPWRITE_URL); these in App Everytime Here i will Call these 
// in APP,JSX INSTAED CALL EVRYTHING AND sTORE IT IN THE vARIBLE hOW DOES THAT sOUND gOOD RIGHT yA wE CAN dO THESE 

const  config={
   appWriteUrl:String(import.meta.env.VITE_APPWRITE_URL),
   appWriteProjectId:String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
   appWriteDataBaseId:String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
   appWriteCollectionid:String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
   appWriteBucketid:String(import.meta.env.VITE_APPWRITE_BUCKET_ID)

}

export default config