import React from "react";
import { useState, useEffect } from "react";
import { Conatainer, PostForm } from "../component";
import NewObject from "../appwrite/db";


import { Navigate, useNavigate, useParams } from "react-router-dom";

function EditPost() {
  const [post, setPosts] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (slug) {
      NewObject.getPost(slug).then((post) => {
        if (post) {
          setPosts(post);
        }
      });
    } else {
      navigate("/");
    }
  }, [slug, navigate]);
  return post ?(
    <div className='py-8'>
        <Conatainer>
            <PostForm post={post} />
        </Conatainer>
    </div>
  ) : null

}

export default EditPost;
