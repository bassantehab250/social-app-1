import { AiFillLike } from "react-icons/ai";
import { FaCommentAlt } from "react-icons/fa";
import { FaShare } from "react-icons/fa";
import type { PostType } from "../../Types/Post.type";
import Comment from "../Comment/Comment";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Loader from "../Loader/Loader";
import type { CommentType } from "../../Types/Comment.type";
import CommentCreation from "../CommentCreation/CommentCreation";
import { HiDotsVertical } from "react-icons/hi";
import { FaPen } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useContext, useState } from "react";
import { AuthContext } from "./../../Context/AuthContext";
import { ImSpinner } from "react-icons/im";
import toast from "react-hot-toast";

export default function Post({
  post,
  isPostDetails = false,
}: {
  post: PostType;
  isPostDetails?: boolean;
}) {
  const { body, image, user, createdAt, topComment, _id } = post;
  const { name, photo, _id: userId } = user;
  const [isOpen, setisOpen] = useState(false);
  const { userId: loginUserId } = useContext(AuthContext);
  const query = useQueryClient();
  const navigate = useNavigate();
  function getPostComments() {
    return axios.get(
      `https://route-posts.routemisr.com/posts/${_id}/comments?page=1&limit=10`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      },
    );
  }
  const { data, isError, isLoading, error } = useQuery({
    queryKey: ["getPostComments"],
    queryFn: getPostComments,
    enabled: isPostDetails,
  });
  function handleDeletePost() {
    return axios.delete(`https://route-posts.routemisr.com/posts/${_id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("userToken")}` },
    });
  }
  const { isPending, mutate } = useMutation({
    mutationFn: handleDeletePost,
    onSuccess: (res) => {
      toast.success(res.data.message);
      query.invalidateQueries({ queryKey: ["getAllPosts"] });
      navigate("/");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  if (isLoading) {
    return <Loader />;
  }
  if (isError) {
    return <h1>{error.message}</h1>;
  }

  return (
    <>
      <div className="w-150 mx-auto bg-slate-300 p-4 rounded-lg my-6">
        <div className="flex gap-4  justify-between items-center">
          <div className="flex gap-4 items-center">
            <img
              src={photo}
              className="w-10 h-10 rounded-full border-2 border-white"
              alt=""
            />
            <div>
              <p className="font-bold">{name}</p>
              <p className="text-sm text-slate-500">{createdAt}</p>
            </div>
          </div>
          <div className="relative">
            {loginUserId === userId && (
              <HiDotsVertical
                onClick={() => setisOpen(!isOpen)}
                className="font-bold text-2xl cursor-pointer"
              />
            )}
            {isOpen && (
              <div className="bg-white p-2 rounded-lg absolute  top-[120%] -inset-e-20 shadow-2xl border-slate-400 border-2">
                <ul className="flex flex-col gap-2">
                  {/* Edit: go to the edit page with the post id */}
                  <li>
                    <button
                      onClick={() => navigate(`/postedit/${_id}`)}
                      className="flex w-full gap-2 items-center cursor-pointer bg-slate-100 p-2"
                    >
                      Edit <FaPen />
                    </button>
                  </li>

                  <li>
                    <button
                      disabled={isPending}
                      onClick={() => mutate()}
                      className="flex justify-center w-full disabled:bg-slate-900 disabled:cursor-not-allowed disabled:text-white gap-2 items-center cursor-pointer bg-slate-100 p-2"
                    >
                      {isPending ? (
                        <ImSpinner className=" animate-spin" />
                      ) : (
                        <>
                          Delete <MdDelete />
                        </>
                      )}
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
        <div className="p-4">
          <p className="mb-4">{body}</p>
          <img src={image} className="w-full" alt="" />
        </div>
        <div className="p-4 flex justify-between bg-slate-200 rounded-sm">
          <div className="font-bold cursor-pointer flex gap-2 items-center">
            Likes <AiFillLike />
          </div>
          <Link to={`/postdetails/${_id}`}>
            <div className="font-bold cursor-pointer flex gap-2 items-center">
              Comments <FaCommentAlt />
            </div>
          </Link>
          <div className="font-bold cursor-pointer flex gap-2 items-center">
            Shares <FaShare />
          </div>
        </div>
        <CommentCreation
          postId={_id}
          querykey={isPostDetails ? ["getPostComments"] : ["getAllPosts"]}
        />
        {/*top comment */}
        <div>
          {topComment && <Comment comment={topComment} postId={_id} />}
          {/* all comments */}
          {isPostDetails &&
            data?.data.data.comments &&
            data?.data.data.comments.map((comment: CommentType) => (
              <Comment key={comment._id} comment={comment} postId={_id} />
            ))}
        </div>
      </div>
    </>
  );
}
