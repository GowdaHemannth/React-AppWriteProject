import React from "react";
import { useEffect, useState } from "react";
import { Conatainer, Button } from "../component";
import NewObject from "../appwrite/db";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import parse from "html-react-parser";

function Post() {
  const [Post, setPosts] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();
  const useData = useSelector((state) => 
    state.auth.Userdata
  );
  //                          Here these userId Is Nothing BUt the Origina id of the User After he Logged in
  const isAuthor = Post && useData ? Post.userid === useData.$id : false;
  useEffect(() => {
    NewObject.getPost(slug).then((post) => {
      if (post) {
        setPosts(post);
      } else {
        navigate("/");
      }
    });
  }, [slug, navigate]);
  const deletePost = () => {
    NewObject.deletePost(Post.$id).then((status) => {
      //     Evry Psot Has its Own featured id
      NewObject.DeleteFile(Post.featuredImage);
      navigate("/");
    });
  };
  return Post ? (
    <div>
      <Conatainer>
        <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
          <img
            src={NewObject.getFilePreview(Post.featuredimage)}
            alt={Post.title}
            className="rounded-xl"
          />

          {isAuthor && (
            <div className="absolute right-6 top-6">
              <Link to={`/edit-post/${Post.$id}`}>
                <Button bgColor="bg-green-500" className="mr-3">
                  Edit
                </Button>
              </Link>
              <Button bgColor="bg-red-500" onClick={deletePost}>
                Delete
              </Button>
            </div>
          )}
        </div>
        <div className="w-full mb-6">
          <h1 className="text-2xl font-bold">{Post.title}</h1>
        </div>
        <div className="browser-css">
          {/* After We Created Our Post  */}
          {parse(Post.content)}
        </div>
      </Conatainer>
    </div>
  ) : null;
}

export default Post;
