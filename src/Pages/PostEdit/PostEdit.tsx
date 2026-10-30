import { useRef, useState } from "react";
import type { ChangeEvent } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { FiImage, FiSend, FiX } from "react-icons/fi";
import { ImSpinner11 } from "react-icons/im";
import Loader from "../../Components/Loader/Loader";

export default function PostEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const textInput = useRef<HTMLTextAreaElement>(null);
  const imgInput = useRef<HTMLInputElement>(null);

  const [preview, setPreview] = useState<string | null>(null);

  // 1) get the post data
  function getPost() {
    return axios.get(`https://route-posts.routemisr.com/posts/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("userToken")}` },
    });
  }
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["getSinglePost", id],
    queryFn: getPost,
  });

  // 2) update the post
  function updatePost(formdata: FormData) {
    return axios.put(`https://route-posts.routemisr.com/posts/${id}`, formdata, {
      headers: { Authorization: `Bearer ${localStorage.getItem("userToken")}` },
    });
  }
  const { isPending, mutate } = useMutation({
    mutationFn: updatePost,
    onSuccess: (res) => {
      toast.success(res.data.message);
      queryClient.invalidateQueries({ queryKey: ["getAllPosts"] });
      queryClient.invalidateQueries({ queryKey: ["getSinglePost"] });
      navigate("/");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  function handleUpdatePost() {
    const formdata = new FormData();
    const body = textInput.current?.value;
    const file = imgInput.current?.files?.[0];

    if (body) formdata.append("body", body);
    // only send the image if the user picked a new one
    if (file) formdata.append("image", file);

    mutate(formdata);
  }

  function handleImagePreview(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setPreview(URL.createObjectURL(file));
  }

  function handleRemoveImage() {
    setPreview("");
    if (imgInput.current) imgInput.current.value = "";
  }

  if (isLoading) {
    return <Loader />;
  }
  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const post = data?.data.data.post;
  const shownImage = preview === null ? post?.image : preview;

  return (
    <div className="mx-auto my-6 w-full max-w-xl rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-900">Edit post</h2>
        <button
          type="button"
          aria-label="Close"
          onClick={() => navigate(-1)}
          className="rounded-full p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
        >
          <FiX className="h-5 w-5" />
        </button>
      </div>

      {/* Input 1: text */}
      <label htmlFor="post-text" className="sr-only">
        Post text
      </label>
      <textarea
        ref={textInput}
        id="post-text"
        rows={5}
        defaultValue={post?.body}
        placeholder="What's on your mind?"
        className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 p-3 text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-200"
      />

      {/* Image preview */}
      {shownImage && (
        <div className="relative mt-4">
          <img src={shownImage} alt="" className="w-full rounded-xl" />
          <button
            type="button"
            aria-label="Remove image"
            onClick={handleRemoveImage}
            className="absolute end-2 top-2 rounded-full bg-black/60 p-1.5 text-white hover:bg-black/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <FiX className="h-5 w-5" />
          </button>
        </div>
      )}

      {/* Input 2: image */}
      <label
        htmlFor="post-image"
        className="mt-4 flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 px-4 py-8 text-center text-slate-500 transition-colors hover:border-indigo-400 hover:bg-indigo-50 hover:text-indigo-600"
      >
        <FiImage className="h-8 w-8" />
        <span className="text-sm font-medium">
          {shownImage ? "Click to change image" : "Click to add image"}
        </span>
        <span className="text-xs text-slate-400">PNG, JPG or WEBP</span>
        <input
          ref={imgInput}
          id="post-image"
          type="file"
          accept="image/*"
          onChange={handleImagePreview}
          className="sr-only"
        />
      </label>

      {/* Actions */}
      <div className="mt-5 flex items-center justify-end gap-2">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="rounded-lg px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
        >
          Cancel
        </button>
        <button
          type="button"
          disabled={isPending}
          onClick={handleUpdatePost}
          className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:bg-slate-900"
        >
          {isPending ? (
            <ImSpinner11 className="animate-spin" />
          ) : (
            <>
              <FiSend className="h-4 w-4" />
              Save changes
            </>
          )}
        </button>
      </div>
    </div>
  );
}