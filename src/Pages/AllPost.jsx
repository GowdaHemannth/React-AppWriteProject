// Here we will be Creating The AllPost where i need to Dispaluy the All Psot
import React from "react";
import { useState,useEffect } from "react";
import { Conatainer,PostCard } from "../component";
import NewObject from "../appwrite/db";
import React from 'react'

function AllPost() {
    const [posts,setPosts]=useState([])
    useEffect(()=>{
        NewObject.getPosts([]).then((posts)=>{
            if(posts){
                setPosts(posts)
            }
        })
        
    },[])
  return (
      <div className='w-full py-8'>
        <Conatainer>
            <div className='flex flex-wrap'>
                {posts.map((post) => (
                    <div key={post.$id} className='p-2 w-1/4'>
                        <PostCard {...post} />
                    </div>
                ))}
            </div>
            </Conatainer>
    </div>
  )
}

export default AllPost
