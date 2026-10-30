import * as zod from "zod"; 


export const RegisterSchema = zod.object({
  name: zod
    .string()
    .nonempty("name is required")
    .min(3, "min length is 3 chars")
    .max(10, "max length is 10 chars"),
  email: zod
    .email()
    .nonempty("email is required")
    .regex(
      /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/,
      "invaild email",
    ),
  dateOfBirth: zod
    .string()
    .nonempty("date is required")
    .refine((dateOfBirthValue) => {
      const userDate = new Date(dateOfBirthValue).getFullYear();
      const nowDate = new Date().getFullYear();
      return nowDate - userDate > 10 ? true : false;
    }, "date should be less than 2015"),
  gender: zod.enum(["male", "female"]),
  password: zod
    .string()
    .nonempty("password is required")
    .regex(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
      "Password must be 8 characters or more + 1 uppercase letter + 1 lowercase letter + 1 number + 1 special character",
    ),
    rePassword :zod
    .string()
    .nonempty("rePassword is required")
}).refine((obj)=>{
  if(obj.password===obj.rePassword){
    return true
  }
  else{
    return false
  }
},{
  path :["rePassword"],
  error:"password and rePassword not match",
});

export type RegisterSchemaType = zod.infer<typeof RegisterSchema>

//////////////////////////////////////
export const LoginSchema = zod.object({
  email: zod
    .email()
    .nonempty("email is required")
    .regex(
      /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/,
      "invaild email",
    ),
  password: zod
    .string()
    .nonempty("password is required")
    .regex(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
      "Password must be 8 characters or more + 1 uppercase letter + 1 lowercase letter + 1 number + 1 special character",
    ),
});

export type LoginSchemaType = zod.infer<typeof LoginSchema>