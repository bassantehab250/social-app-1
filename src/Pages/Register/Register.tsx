import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  RegisterSchema,
  type RegisterSchemaType,
} from "../../schemas/auth..schema";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Register() {
  const [apiError,setapiError]=useState(null)
  const [isLoading,setisLoading]=useState(false)
  const navigate = useNavigate();
  const form = useForm<RegisterSchemaType>({
    defaultValues: {
      name: "",
      email: "",
      dateOfBirth: "",
      gender: "female",
      password: "",
      rePassword: "",
    },
    resolver: zodResolver(RegisterSchema),
    mode: "onChange",
  });
  let { register, handleSubmit, formState } = form;
  function handleRegister(values: RegisterSchemaType) {
    // console.log(values);
    setisLoading(true)
    axios
      .post(`https://route-posts.routemisr.com/users/signup`, values)
      .then((res) => {
        if (res.data.success) {
          alert(res.data.message);
          navigate("/login")
        }
      })
      .catch((err) => {console.log(err.response.data.message)
    setapiError(err.response.data.message)}
  ).finally(()=>{
    setisLoading(false)
  })
      
  }
  return (
    <>
      <h1 className="text-center text-5xl font-bold">Register Now</h1>
      {apiError&&<p className="bg-red-500 text-white text-center font-bold p-2 rounded-sm w-[300px] mx-auto py-3 mt-3">{apiError}</p>}
      <form
        onSubmit={handleSubmit(handleRegister)}
        className="max-w-md mx-auto my-5"
      >
        <div className="relative z-0 w-full mb-5 group">
          <input
            {...register(
              "name",
              //   ,{
              //   required: { value: true, message: "name is required" },
              //   minLength: {
              //     value: 3,
              //     message: "min length should be more than 3 chars",
              //   },
              //   maxLength: {
              //     value: 10,
              //     message: "max length shouldn't be more than 10 chars",
              //   },
              // }
            )}
            type="text"
            id="name"
            className="block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer"
            placeholder=" "
          />
          <label
            htmlFor="name"
            className="absolute text-sm text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
          >
            Enter Your Name
          </label>
          {formState.errors.name?.message && formState.touchedFields.name && (
            <p className="text-red-500 font-bold p-3">
              {" "}
              {formState.errors.name?.message}{" "}
            </p>
          )}
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            {...register(
              "email",
              //  {required:{value:true,message:"email is required"},
              //   pattern: {
              //     value: /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/,
              //     message: "invalid email",
              //   },
              // }
            )}
            type="email"
            id="email"
            className="block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer"
            placeholder=" "
          />
          <label
            htmlFor="email"
            className="absolute text-sm text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
          >
            Enter Your Email
          </label>
          {formState.errors.email?.message && formState.touchedFields.email && (
            <p className="text-red-500 font-bold p-3">
              {" "}
              {formState.errors.email?.message}{" "}
            </p>
          )}
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            {...register(
              "dateOfBirth",
              //   ,{
              //   validate: function (value) {
              //     const userDate = new Date(value).getFullYear();
              //     const nowDate = new Date().getFullYear();
              //     return (nowDate - userDate)>10 ? true:"invalid date"
              //     if (nowDate - userDate > 10) {
              //       return true
              //     }
              //     else{
              //       return false
              //     }
              //   },
              // }
            )}
            type="date"
            id="dateOfBirth"
            className="block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer"
            placeholder=" "
          />
          <label
            htmlFor="dateOfBirth"
            className="absolute text-sm text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
          >
            Enter Your Birthday
          </label>
          {formState.errors.dateOfBirth?.message &&
            formState.touchedFields.dateOfBirth && (
              <p className="text-red-500 font-bold p-3">
                {" "}
                {formState.errors.dateOfBirth?.message}{" "}
              </p>
            )}
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            {...register(
              "password",
              //   ,{
              //   pattern: {
              //     value:
              //       /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/,
              //     message:
              //       "password must contain 1 number (0-9) password must contain 1 uppercase letters password must contain 1 lowercase letters password must contain 1 non-alpha numeric number password is 8-16 characters with no space",
              //   },
              // }
            )}
            type="password"
            id="password"
            className="block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer"
            placeholder=" "
          />
          <label
            htmlFor="password"
            className="absolute text-sm text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
          >
            Enter Your Password
          </label>
          {formState.errors.password?.message &&
            formState.touchedFields.password && (
              <p className="text-red-500 font-bold p-3">
                {" "}
                {formState.errors.password?.message}{" "}
              </p>
            )}
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            {...register(
              "rePassword",
              //   ,{
              //   validate:function(rePasswordValue){
              //     if(rePasswordValue=== getValues("password")){
              //       return true
              //     }
              //     else{
              //       return "password and repassword not match"
              //     }
              //   }
              // }
            )}
            type="password"
            id="rePassword"
            className="block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer"
            placeholder=" "
          />
          <label
            htmlFor="rePassword"
            className="absolute text-sm text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
          >
            Enter Your Confirm Password
          </label>
          {formState.errors.rePassword?.message &&
            formState.touchedFields.rePassword && (
              <p className="text-red-500 font-bold p-3">
                {" "}
                {formState.errors.rePassword?.message}{" "}
              </p>
            )}
        </div>
        <div className="flex gap-3 items-center">
          <div>
            <input
              {...register("gender")}
              id="country-option-1"
              type="radio"
              defaultValue="male"
              className="w-4 h-4 text-neutral-primary border-default-medium bg-neutral-secondary-medium rounded-full checked:border-brand focus:ring-2 focus:outline-none focus:ring-brand-subtle border border-default appearance-none"
              defaultChecked
            />
            <label
              htmlFor="country-option-1"
              className="select-none ms-2 text-sm font-medium text-heading"
            >
              Male
            </label>
          </div>
          <div>
            <input
              {...register("gender")}
              id="country-option-1"
              type="radio"
              defaultValue="female"
              className="w-4 h-4 text-neutral-primary border-default-medium bg-neutral-secondary-medium rounded-full checked:border-brand focus:ring-2 focus:outline-none focus:ring-brand-subtle border border-default appearance-none"
              defaultChecked
            />
            <label
              htmlFor="country-option-1"
              className="select-none ms-2 text-sm font-medium text-heading"
            >
              Female
            </label>
          </div>
          {formState.errors.gender?.message &&
            formState.touchedFields.gender && (
              <p className="text-red-500 font-bold p-3">
                {" "}
                {formState.errors.gender?.message}{" "}
              </p>
            )}
        </div>
        <button
        disabled={isLoading}
          type="submit"
          className="text-white disabled:bg-slate-900 disabled:text-white disabled:cursor-not-allowed bg-blue-500 w-full rounded-lg curser-pointer hover:bg-blue-600 transition-all my-3 box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none"
        >
          {isLoading ?"Loading...":"Register"}
        </button>
        <div className="flex justify-center my-2 text-blue-600 font-bold underline cursor-pointer"><Link to={"/login"}>Do You Have An Acount? Go login</Link></div>
      </form>
    </>
  );
}
