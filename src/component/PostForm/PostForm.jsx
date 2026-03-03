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
      const file = data.image[0] ? NewObject.uploadFile(data.image[0]) : null;

      // Think user Has Updated the Psot tahts why you are Getting file output So hence Here
      if (file) {
        NewObject.deletePost(post.featuredImage);
      }
    }
  };
  return <div></div>;
}

export default PostForm;
