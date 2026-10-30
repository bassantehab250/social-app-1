import { useRef } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FiCheck, FiX } from "react-icons/fi";
import { ImSpinner11 } from "react-icons/im";
import type { CommentType } from "../../Types/Comment.type";

export default function CommentEdit({
  comment,
  postId,
  onClose,
}: {
  comment: CommentType;
  postId: string;
  onClose: () => void;
}) {
  const textInput = useRef<HTMLTextAreaElement>(null);
  const queryClient = useQueryClient();

  function updateComment(content: string) {
    return axios.put(
      `https://route-posts.routemisr.com/posts/${postId}/comments/${comment._id}`,
      { content },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      },
    );
  }

  const { isPending, mutate } = useMutation({
    mutationFn: updateComment,
    onSuccess: (res) => {
      toast.success(res.data.message);
      queryClient.invalidateQueries({ queryKey: ["getPostComments"] });
      queryClient.invalidateQueries({ queryKey: ["getAllPosts"] });
      onClose();
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  function handleUpdateComment() {
    const content = textInput.current?.value.trim();
    if (!content) return;
    mutate(content);
  }

  return (
    <div className="w-full">
      <label htmlFor={`comment-${comment._id}`} className="sr-only">
        Edit comment
      </label>
      <textarea
        ref={textInput}
        id={`comment-${comment._id}`}
        rows={2}
        defaultValue={comment.content}
        placeholder="Write a comment..."
        className="w-full resize-none rounded-xl border border-slate-200 bg-white p-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
      />
      <div className="mt-2 flex items-center justify-end gap-2">
        <button
          type="button"
          onClick={onClose}
          className="inline-flex items-center gap-1 rounded-lg px-3 py-1.5 text-sm font-medium text-slate-600 hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
        >
          <FiX className="h-4 w-4" />
          Cancel
        </button>
        <button
          type="button"
          disabled={isPending}
          onClick={handleUpdateComment}
          className="inline-flex items-center gap-1 rounded-lg bg-indigo-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:bg-slate-900"
        >
          {isPending ? (
            <ImSpinner11 className="animate-spin" />
          ) : (
            <>
              <FiCheck className="h-4 w-4" />
              Save
            </>
          )}
        </button>
      </div>
    </div>
  );
}