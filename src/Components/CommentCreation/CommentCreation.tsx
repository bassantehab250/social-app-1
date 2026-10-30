import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useForm } from "react-hook-form";
import { FaCommentAlt } from "react-icons/fa";
import { FaImage } from "react-icons/fa6";
import { ImSpinner2 } from "react-icons/im";

export default function CommentCreation({
  postId,
  querykey,
}: {
  postId: string;
  querykey: string[];
}) {
  const form = useForm({
    defaultValues: {
      content: "",
      image: "",
    },
  });
  const { register, handleSubmit, reset } = form;
  const formdata = new FormData();
  const query = useQueryClient();

  function createComment() {
    return axios.post(
      `https://route-posts.routemisr.com/posts/${postId}/comments`,
      formdata,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      },
    );
  }

  const {isPending, mutate } = useMutation({
    mutationFn: createComment,
    onSuccess: () => {
      console.log("comment created");
      query.invalidateQueries({ queryKey: querykey });
      reset();
    },
    onError: (err) => {
      console.log(err);
    },
    // onstalled: () => {},
  });

  function handleCreateComment(values: { content: string; image: string }) {
    if (!values.content && !values.image) return;
    if (values.content) {
      formdata.append("content", values.content);
    }
    if (values.image) {
      formdata.append("image", values.image[0]);
    }
    mutate();
  }
  return (
    <>
      <div className="bg-white p-3 my-4">
        <form
          className="max-w-md mx-auto"
          onSubmit={handleSubmit(handleCreateComment)}
        >
          <div className="relative">
            <input
              {...register("content")}
              type="text"
              id="search"
              className="block rounded-lg w-full p-3 ps-9 bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand shadow-xs placeholder:text-body"
              placeholder="Search"
              required
            />
            <button
              disabled={isPending}
              type="submit"
              className="absolute disabled:bg-slate-900 disabled:cursor-not-allowed cursor-pointer top-[50%] end-[10px] translate-y-[-50%] text-white bg-blue-600 hover:bg-brand-strong box-border border border-transparent focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded text-xs px-3 py-1.5 focus:outline-none"
            >
              {isPending ? (
                <ImSpinner2 className="animate-spin" />
              ) : (
                <FaCommentAlt />
              )}
            </button>
          </div>
          <label className=" my-2 cursor-pointer bg-blue-600 hover:bg-blue-700 hover:transition-colors rounded-sm p-2 flex justify-center text-white">
            <FaImage className="size-5 " />
            <input type="file" hidden {...register("image")} />
          </label>
        </form>
      </div>
    </>
  );
}
