import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { UserType } from "../../Types/ProfileUser.type";
import { jwtDecode } from "jwt-decode";
import Post from "../../Components/Post/Post";
import type { PostType } from "../../Types/Post.type";
export default function Profile() {
  function getMyProfile() {
    return axios.get(`https://route-posts.routemisr.com/users/profile-data`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("userToken")}` },
    });
  }
  const { data } = useQuery({
    queryKey: ["getMyProfile"],
    queryFn: getMyProfile,
  });
  const user: UserType = data?.data.data.user;
  console.log(user);
  const { user: userId }:{user:string} = jwtDecode(localStorage.getItem("userToken")!)
  function getMyPosts() {
    return axios.get(
      `https://route-posts.routemisr.com/users/${userId}/posts`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      },
    );
  }
  const { data: postUserData} = useQuery({
    queryKey: ["getUserPosts"],
    queryFn: getMyPosts,
  });
  // console.log(postUserData?.data.data.posts);
  return (
    <>
      {user&& <div className="w-175 mx-auto p-2 rounded-lg shadow-2xl bg-slate-200 my-4">
        <div className="flex justify-between items-center">
          <img
            src={user?.photo}
            className="w-10 h-10 rounded-full border-2 border-white"
            alt=""
          />
          <div>
            <p>
              <span className=" font-bold">UserName:</span>
              {user?.username}
            </p>
            <p>
              <span className=" font-bold">Email:</span>
              {user?.email}
            </p>
            <p>
              <span className=" font-bold">UserGender:</span>
              {user?.gender}
            </p>
            <p>
              <span className=" font-bold">BirthDay:</span>
              {user?.dateOfBirth.split("T")[0]}
            </p>
          </div>
        </div>
      </div>
      
      }{postUserData?.data.data.posts.map((currentPost : PostType)=><Post key={currentPost._id} post={currentPost}/>)}
    </>
  );
}
