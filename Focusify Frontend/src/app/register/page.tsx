"use client";

import GoogleIcon from "../components/ui/Google";
import { TextField } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FormData, UserSchema } from "@/types/types";
import FormField from "../components/form/FormField";
import { zodResolver } from "@hookform/resolvers/zod";

const Register = () => {
  const { push } = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormData>({
    resolver: zodResolver(UserSchema),
  });

  const [errorMessage, setErrorMessage] = useState<string>("");

  const styleInput = "text-[14px] rounded-[10px] py-[12px] px-[11px] w-[300px]";

  const onSubmit = async (data: FormData) => {
    const response = await fetch(
      "https://focusify-web.onrender.com/api/v1/auth/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: data.email,
          password: data.password,
          firstName: data.firstName,
          lastName: data.lastName,
        }),
      }
    );

    if (response.status === 200) {
      alert("Account Created Successfully!");
      push("/login");
    } else {
      const responseData = await response.json();
      setErrorMessage("Username Already Exists");
      console.log("Error:", responseData.message);
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="w-[420px]  rounded-[15px] shadow-2xl text-center">
        <div className="flex justify-center">
          <button className="flex justify-center items-center h-[40px] w-[350px] border-[1px] rounded-[15px] mt-[50px] mb-[25px] py-[25px] font-bold border-black">
            <div className="w-[25px] h-[25px] mr-[10px]">
              <GoogleIcon />
            </div>
            Continue With Google
          </button>
        </div>
        <h1 className="text-[12px] mb-[25px]">OR</h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col text-center items-center space-y-[10px]"
        >
          <FormField
            type="email"
            placeholder="Email"
            name="email"
            register={register}
            error={errors.email}
            className={styleInput}
          />
          {errorMessage && (
            <div className="text-red-500 mt-2">
              <p>{errorMessage}</p>
            </div>
          )}

          <FormField
            type="text"
            placeholder="FirstName"
            name="firstName"
            register={register}
            error={errors.firstName}
            className={styleInput}
          />

          <FormField
            type="text"
            placeholder="Last Name"
            name="lastName"
            register={register}
            error={errors.lastName}
            className={styleInput}
          />

          <FormField
            type="password"
            placeholder="Password"
            name="password"
            register={register}
            error={errors.password}
            className={styleInput}
          />

          <FormField
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            register={register}
            error={errors.confirmPassword}
            className={styleInput}
          />

          <div className="flex justify-center">
            <button
              className="mt-[20px] flex justify-center items-center h-[40px] w-[350px] border-[1px] rounded-[15px]  bg-skyblue mb-[30px] py-[25px] text-white"
              type="submit"
            >
              Create Account
            </button>
          </div>
        </form>

        <div className="flex justify-center">
          <input type="checkbox" value="terms" name="terms" id="terms" />
          <label htmlFor="terms" className="text-[12px] ml-[10px]">
            I agree to the terms and conditions
          </label>
        </div>

        <p className="text-[14px]">
          Already have an account?{" "}
          <Link href="/login" className="text-skyblue">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
