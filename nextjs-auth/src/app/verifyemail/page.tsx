"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";

function VerifyEmail() {
  const [token, setToken] = useState<string>("");
  const [verified, setVerified] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const verifyUserEmail = async () => {
    try {
      await axios.post("/api/users/verifyemail", { token });
      setVerified(true);
      setError(false);
    } catch (error: any) {
      setError(true);
      console.log(error);
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  useEffect(() => {
    if (token?.length > 0) {
      verifyUserEmail();
    }
  },[token]);

  return (
    <>
      <div>
        {verified ? "you've verified successfully" : "somethng went wrong"}
      </div>
      ;<div>{error && "something actucally went wrong"}</div>
    </>
  );
}

export default VerifyEmail;
