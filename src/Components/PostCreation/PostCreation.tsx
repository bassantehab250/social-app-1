import React, { useRef, useState } from "react";
import { FaFileImage } from "react-icons/fa";
import { FiSend } from "react-icons/fi";
import meal from "../../assets/Honey Garlic Salmon.jpg";
import { IoIosCloseCircle } from "react-icons/io";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ImSpinner11 } from "react-icons/im";
import toast from "react-hot-toast";

export default function PostCreation() {
  const [isUploaded, setisUploaded] = useState("");
  const textInput = useRef(null);
  const imgInput = useRef(null);
  const query = useQueryClient();
  //   console.log(imgInput.current.files[0])
  //   console.log(textInput.current.value)
  const formdata = new FormData();
  function createPost() {
    return axios.post(`https://route-posts.routemisr.com/posts`, formdata, {
      headers: { Authorization: `Bearer ${localStorage.getItem("userToken")}` },
    });
  }
  function clearForm() {
    textInput.current.value = "";
    imgInput.current.value = "";
    setisUploaded("");
  }
  const { data, isPending, mutate } = useMutation({
    mutationFn: createPost,
    onSuccess: (res) => {
      console.log(res.data.message);
      toast.success(res.data.message);
      clearForm();
      query.invalidateQueries({ queryKey: ["getAllPosts"] });
    },
    onError: (err) => {
        toast.error(err.message);
      console.log("err");
    },
    onSettled: () => {},
  });
  function handleCreatePost() {
    if (textInput.current.value === "" && imgInput.current.value === "") return;
    if (textInput.current.value) {
      formdata.append("body", textInput.current!.value);
    }
    if (imgInput.current.value) {
      formdata.append("image", imgInput.current?.files[0]);
    }
    mutate();
  }

  function handleImagePreview(e) {
    const path = URL.createObjectURL(e.target.files[0]);
    setisUploaded(path);
  }
  return (
    <>
      <div className="mx-auto w-full max-w-xl rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
        {/* Input 1: text */}
        <textarea
          ref={textInput}
          rows={4}
          placeholder="What's on your mind?"
          className="w-full resize-none rounded-xl border border-gray-200 p-3 text-gray-800 placeholder-gray-400 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
        />
        {isUploaded && (
          <div className="relative">
            <img src={isUploaded} alt="" />
            <IoIosCloseCircle
              onClick={() => setisUploaded("")}
              className="absolute top-[10px] end-[10px] size-8 text-white cursor-pointer"
            />
          </div>
        )}
        <div className="mt-3 flex items-center justify-between">
          {/* Input 2: image */}
          <div>
            <input
              ref={imgInput}
              id="post-image"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImagePreview}
            />
            <label
              htmlFor="post-image"
              className="inline-flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-blue-600 transition hover:bg-blue-50"
            >
              <FaFileImage size={20} />
              Add image
            </label>
          </div>

          <button
            disabled={isPending}
            onClick={() => {
              handleCreatePost();
            }}
            type="submit"
            className="inline-flex items-center gap-2 disabled:bg-slate-900 disabled:cursor-not-allowed rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            {isPending ? (
              <ImSpinner11 className=" animate-spin" />
            ) : (
              <>
                <FiSend size={16} />
                Create Post
              </>
            )}
          </button>
        </div>
      </div>
    </>
  );
}
