import axios from "axios";
import { useEffect, useState } from "react";
import type { PostType } from "../../Types/Post.type";
import Post from "../../Components/Post/Post";
import Loader from "../../Components/Loader/Loader";
import { useQuery } from "@tanstack/react-query";
import PostCreation from "../../Components/PostCreation/PostCreation";

export default function Home() {
  // const [allProducts, setallProducts] = useState([]);
  // const [isLoaing, setisLoading] = useState(true);
  // const [isError, setisError] = useState(false);

  function getAllPosts() {
    return axios.get(`https://route-posts.routemisr.com/posts?sort=-createdAt`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
      },
    });
    // .then((res) => {
    //   console.log(res.data.data.posts);
    //   setallProducts(res.data.data.posts);
    // })
    // .catch((err) => {
    //   console.log(err);
    //   setisError(true);
    // })
    // .finally(() => {
    //   setisLoading(false);
    // });
  }
  // useEffect(() => {
  //   getAllPosts();
  // }, []);

  // if (isLoaing) {
  //   return (
  //     <Loader/>
  //   );
  // }
  // if (isError) {
  //   return <h1>error...</h1>;
  // }
  const {data,isError,isLoading,error,isFetching} = useQuery({
    queryKey: ["getAllPosts"],
    queryFn: getAllPosts,
  });
  // console.log("data",data?.data.data.posts)
  if (isLoading) {
    return (
      <Loader/>
    );
  }
  if (isError) {
    return <h1>{error.message}</h1>;
  }
  return (
    <>
      <div className="my-4">
       <div className="w-[600px]  mx-auto">
        <PostCreation/>
       </div>

        {data?.data.data.posts.map((post: PostType) => (
          <Post post={post} key={post.id} isPostDetails={false}/>
        ))}
      </div>
    </>
  );
}
