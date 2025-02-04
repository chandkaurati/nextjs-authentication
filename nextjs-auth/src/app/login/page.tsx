"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

interface UserDetails {
  email: string;
  password: string;
}


function Login() {
  const [user, setUser] = useState<UserDetails>({
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const onLogin = async () => {
    setLoading(true);
    try {
      const responce = await axios.post("/api/users/login", user);
      console.log(responce);
      router.push("/profile");
      alert("user loggin successfully")
    } catch (error: any) {
      console.log(error.message)
      console.log("login Failed");
      toast.error(error.message);
    }finally{
      setLoading(false)
    }
  };

  const logout = async()=>{
    try {
      await axios.get("/api/users/logout")
    } catch (error) {
      console.log(error)
    }
  }

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
          password
        </label>
        <input
          className="m-1 bg-transparent text-white  p-1 border rounded-md"
          type="password"
          name="password"
          placeholder="enter password "
          value={user.password}
          onChange={setFormValues}
        />

        <button
          className="border rounded-md py-1 mt-3"
          onClick={onLogin}
          disabled={loading}
        >
          login
        </button>
      </div>
    </div>
  );
}

export default Login
