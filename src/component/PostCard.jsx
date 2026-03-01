import React from "react";
import Link from 'react-router-dom'
import NewObject from "../appwrite/db";
function PostCard({ $id, title, featuredImage }) {
  return (
    // Here You Can Say These $id has Unique ID
    <Link to={`/post/${$id}`}> 
      <div className="w-full bg-gray-100 rounded-xl p-4">
        <div className="w-full justify-center mb-4">
          <img
          // Here3 File Preview Will Give You thE REQUIRED URL THAT IS NESSECRY FOR THE REDiRECTION 
           src={NewObject.getFilePreview(featuredImage)}
            alt={title}
            className="rounded-xl"
          />
        </div>
        <h2 className="text-xl font-bold">{title}</h2>
      </div>
    </Link>
  );
}

export default PostCard;
