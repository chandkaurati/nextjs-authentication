"use client";

import axios from "axios";
import { waitForDebugger } from "inspector";
import React, { useEffect, useState } from "react";

interface userDataType {
  name: string;
  email: string;
  isverified: boolean;
}

function Profile() {
  const [userdata, setUserdata] = useState<userDataType | {}>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const getData = async () => {
    setLoading(true);
    try {
      const responce = await axios.post("/api/users/me");
      setUserdata(responce?.data);
      console.log(responce);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const logoutUser = async () => {
    try {
      await axios.get("/api/users/logout");
      setUserdata({});
      alert("user logged out");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div>{loading ? "data is loading" : "data fetched"}</div>
      <button onClick={logoutUser} className="py-1 mt-1 px-3 rounded-md bg-slate-500">Logout</button>
    </>
  );
}

export default Profile;
