import React, { useEffect, useState } from "react";
import NewObject from "../appwrite/db";
import { Conatainer, PostCard } from "../component";
function Home() {
  const [Posts, SetPosts] = useState([]);
  useEffect(() => {
    NewObject.getPosts().then((posts) => {
      if (posts) {
        SetPosts(posts.documents);
      }
    });
  }, []);

  if (Posts.length === 0) {
    return (
      <div className="w-full py-8 mt-4 text-center">
        <Conatainer>
          <div className="flex flex-wrap">
            <div className="p-2 w-full">
              <h1 className="text-2xl font-bold hover:text-gray-500">
                No Posts Availble TO Show Login To See the Posts
              </h1>
            </div>
          </div>
        </Conatainer>
      </div>
    );
  }
  return (
    <div className="w-full py-8">
      <Conatainer>
        <div className="flex flex-wrap">
          {Posts.map((post) => (
            <div key={post.$id} className="p-2 w-1/4">
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Conatainer>
    </div>
  );
}

export default Home;
