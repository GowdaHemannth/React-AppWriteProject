import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, input, RTE } from "../index.js";
import NewObject from "../../appwrite/db.js";
import { useNavigate } from "react-router-dom";
import { Button, input, RTE, Select } from "../index.js";
// You Might Have Forgotten These Thing is Used to Extarxt the States from the
import { useSelector } from "react-redux";
function PostForm({ post }) {
  const { register, handleSubmit, watch, setValue, control, getValues } =
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

  //  Callback is The Best Prcatice
  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string") {
      return value
        .trim()
        .toLowerCase.replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");
    }
    return "";
  }, []);

  // Now Comes The Most Imporatnt Part

  // Here we will doing unsubscribe Jsut BECAUSE
  // IMAGINE IN STEP 1-->>> USERS ENTER THE FORM CHANGES WATCH WAXTHES IF USER ENTERS ANYTHING IN TITLE
  // WATCH TAKE STHAT INPUT SET THE SLUG VALUE ACCRODING TO THE SLUGTRANFORM
  // now if he left the page again comes and type since we have taken subscription for the first watch value
  // we need to unsubscribe otherwise if user closes tab
  // comes for the change title watch value will create slug but since its been calling that subscribe it will crete the
  // it will createthe unnessecry memory
  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, setValue, slugTransform]);

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
      <div className="w-2/3 px-2">
        {/* Here Title Thing */}
        <input
          label="Title"
          placeholder="Title"
          className="mb-4"
          {...register("title", { required: true })}
        />
        {/* here */}
        <input
          label="Slug"
          placeholder="Slug"
          className="mb-4"
          {...register("slug", { required: true })}
          onInput={(e) => {
            setValue("slug", slugTransform(e.currentTarget.value), {
              shouldValidate: true,
            });
          }}
        />

        {/* RTE EDITOR                                             hERE hOW DE wE GET THE dEFAULt ValueSince we have a;ready takken value from post which will value content */}
        {/* From the DataBase We Will gwt thw Value  */}
        <RTE
          label="Content :"
          name="content"
          control={control}
          defaultValue={getValues("content")}
        />
      </div>

      {/*Now Here Come the Aquisation of thr image  */}
      <div className="w-1/3 px-2">
        <input
          label="FeaturedIamge"
          type="file"
          className="mb-4"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image", { required: !post })}
        />
        {post && (
          <div className="w-full mb-4">
            <img
              src={appwriteService.getFilePreview(post.featuredImage)}
              alt={post.title}
              className="rounded-lg"
            />
          </div>
        )}
      </div>
      <Select
        options={["active", "inactive"]}
        label="Status"
        className="mb-4"
        {...register("status", { required: true })}
      />
      <Button
        type="submit"
        bgColor={post ? "bg-green-500" : undefined}
        className="w-full"
      >
        {post ? "Update" : "Submit"}
      </Button>
    </form>
  );
}

export default PostForm;
