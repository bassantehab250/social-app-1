import { useContext, useState } from "react";
import { HiDotsVertical } from "react-icons/hi";
import { FaPen } from "react-icons/fa";
import type { CommentType } from "../../Types/Comment.type";
import { AuthContext } from "../../Context/AuthContext";
import CommentEdit from "../CommentEdit/CommentEdit";

export default function Comment({
  comment,
  postId,
}: {
  comment: CommentType;
  postId: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const { userId: loginUserId } = useContext(AuthContext);

  const isOwner = loginUserId === comment?.commentCreator?._id;

  return (
    <div className=" my-2 p-4 rounded-sm bg-slate-100">
      <div className="flex gap-4 items-center justify-between">
        <div className="flex gap-4 items-center">
          <img
            src={comment?.commentCreator?.photo}
            className="w-10 h-10 rounded-full border-2 border-white"
            alt=""
          />
          <div>
            <p className="font-bold">{comment?.commentCreator?.name}</p>
            <p className="text-sm text-slate-500">{comment?.createdAt}</p>
          </div>
        </div>

        {isOwner && !isEditing && (
          <div className="relative">
            <HiDotsVertical
              onClick={() => setIsOpen(!isOpen)}
              className="font-bold text-2xl cursor-pointer"
            />
            {isOpen && (
              <div className="bg-white p-2 rounded-lg absolute top-[120%] inset-e-0 shadow-2xl border-slate-400 border-2">
                <ul className="flex flex-col gap-2">
                  <li>
                    <button
                      onClick={() => {
                        setIsEditing(true);
                        setIsOpen(false);
                      }}
                      className="flex w-full gap-2 items-center cursor-pointer bg-slate-100 p-2"
                    >
                      Edit <FaPen />
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        )}
      </div>

      {isEditing ? (
        <div className="mt-3">
          <CommentEdit
            comment={comment}
            postId={postId}
            onClose={() => setIsEditing(false)}
          />
        </div>
      ) : (
        <>
          <p className="px-4">{comment?.content}</p>
          {comment.image && <img src={comment.image} alt="" />}
        </>
      )}
    </div>
  );
}