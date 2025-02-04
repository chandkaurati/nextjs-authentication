"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

interface UserDetails {
  username: string;
  email: string;
  password: string;
}

function Signup() {
  const [user, setUser] = useState<UserDetails>({
    username: "",
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const onSignup = async () => {
    setLoading(true);
    try {
      const responce = await axios.post("/api/users/signup", user);
      console.log(responce);
      console.log("signup success");
      router.push("/login");
    } catch (error: any) {
      console.log("signup Failed");
      toast.error(error.message);
    }finally{
      setLoading(false)
    }
  };

  const setFormValues = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setUser((prevStates) => ({
      ...prevStates,
      [name]: value,
    }));
  };

  return (
    <div className="flex justify-center items-center p-10">
      <div className="form border p-4 flex flex-col w-80 rounded-md ">
        <p>{loading && "processing"}</p>
        <label className="m-2" htmlFor="username">
          Username
        </label>
        <input
          className="m-1 bg-transparent text-white  p-1 border rounded-md"
          type="text"
          name="username"
          placeholder="enter your name "
          value={user.username}
          onChange={setFormValues}
        />
        <label className="m-2" htmlFor="username">
          Email
        </label>
        <input
          className="m-1 bg-transparent text-white  p-1 border rounded-md"
          type="email"
          name="email"
          placeholder="enter your name "
          value={user.email}
          onChange={setFormValues}
        />
        <label className="m-2" htmlFor="username">
          passowrd
        </label>
        <input
          className="m-1 bg-transparent text-white  p-1 border rounded-md"
          type="password"
          name="password"
          placeholder="enter your name "
          value={user.password}
          onChange={setFormValues}
        />

        <button
          className="border rounded-md py-1 mt-3"
          onClick={onSignup}
          disabled={loading}
        >
          Signup
        </button>
      </div>
    </div>
  );
}

export default Signup;
