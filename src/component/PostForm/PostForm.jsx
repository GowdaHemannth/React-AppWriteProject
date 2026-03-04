import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Button, input, RTE } from "../index.js";
import NewObject from "../../appwrite/db.js";
import { useNavigate } from "react-router-dom";
// You Might Have Forgotten These Thing is Used to Extarxt the States from the
import { useSelector } from "react-redux";
function PostForm({ post }) {
  const { register, handlesubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.slug || "",
        content: post?.content || "",
        status: post?.status || "active",
      },
    });
  const navigate = useNavigate();
  const UserData = useSelector((state) => state.auth.userData);

  //   Nowe Here Comes the Most Intresting Part here like
  //  These Function Is Usefull When a Person Sub,it the Data it might be Edited Data Or New psot create
  const submit = async (data) => {
    if (post) {
      // One Important Thinmg to Know After Uploading the File
      // IT RETURNS THE
      //             {
      //    $id: "65fabc123xyz",
      //    bucketId: "bucket123",
      //    name: "image.png",
      //    sizeOriginal: 204800,
      //    mimeType: "image/png",
      //    $createdAt: "...",
      //    $updatedAt: "..."
      // }

      // tHESE mANY Things Are accepted in file
      // Here You Might thinkg how do i gte these arry  like
      // here in the Input Form WHEN I FILL IMAGE PART IT RETURNS TWO THINGS ONE IS FILE OBJECT OTHER IS JSUT NANE SO WHEN UPLOADING WE NEEDED THESE
      const file = data.image[0] ? NewObject.uploadFile(data.image[0]) : null;

      // Think user Has Updated the Psot tahts why you are Getting file output So hence Here
      if (file) {
        NewObject.deletePost(post.featuredImage);
      }
      // Now Comes the Updation Part
      //    here these Psot id is the Original ID
      const dbPost = await NewObject.updatePost(post.$id, {
        ...data,
        // Just Spread the Data if the File Abvaibe then Update it Through the new File id esle keep the Past one
        featuredImage: file ? file.$id : post.featuredImage,
      });
      if (dbPost) {
        navigate(`/post/${dbPost.$id}`);
      }
    } else {
      const file = await NewObject.uploadFile(data.image[0]);
      if (file) {
        data.featuredImage = file.$id;
        //    Might Think What is These UserData once user loggin You GAot their Dat with id
        const dbpost = await NewObject.createPost({
          ...data,
          userId: UserData.$id,
        });
      }
    }
  };
  return <div></div>;
}

export default PostForm;
