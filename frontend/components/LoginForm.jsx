import axios from "axios";
import React, { useContext, useState } from "react";
import { data, Link, useNavigate } from "react-router-dom";
import { DataContaxtProvider } from "../contaxtApi/DataContaxt";

const LoginForm = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState();
  const {setProInfo} = useContext(DataContaxtProvider);

  const [getFormData, setFormData] = useState({
    email: null,
    password: null,
  });

  const handleChange = (event) => {
    setFormData(() => ({
      ...getFormData,
      [event.target.name]: event.target.value,
    }));
  };

  // Handle Login Form
  const handleLoginForm = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/user/login",
        getFormData,
        { headers: { "Content-Type": "application/json" } }
      );

      setErrorMessage(null);

      // Setting Data to local storage
      localStorage.setItem("accessToken", response.data.accessToken);
      localStorage.setItem("User", JSON.stringify(response.data.user));
      setProInfo(response.data.user);

      // Go to Home
      navigate('/');
    } catch (error) {
      if(error.response){
        setErrorMessage(error.response.data.message);
      }
    }
  };
  return (
    <form
      className="w-1/3 px-10 py-10 flex flex-col items-center justify-center gap-3 bg-[#e3bbb979] rounded-2xl border border-[#a67a7a5f]"
      onSubmit={handleLoginForm}
    >
      <h2 className="text-3xl font-semibold mb-2  text-[#4782cf]">
        Login User
      </h2>
      <input
        className="bg-[#e3acaca2] w-full px-6 py-3 outline-none border-2 border-[#c9999999] rounded-3xl"
        type="email"
        placeholder="abc@xyz.com"
        name="email"
        onChange={handleChange}
      />
      <input
        className="bg-[#e3acaca2] w-full px-6 py-3 outline-none border-2 border-[#c9999999] rounded-3xl"
        type="password"
        placeholder="Conform Password"
        name="password"
        onChange={handleChange}
      />
      <div className="w-full px-2 font-semibold text-[#4f4f4f]">
        Forget Password
      </div>
      <button className="active:scale-95 w-1/2 mt-3 bg-[#ee6060] uppercase py-3 font-semibold text-[#ffff] rounded-2xl">
        Submit
      </button>
      <div>
        Don't have an account?{" "}
        <span>
          <Link to="/signup" className="text-[#3e95e8] font-semibold px-2">
            Register Yourself
          </Link>
        </span>
      </div>

      {errorMessage && (
        <div className=" z-200 absolute px-5 py-3 top-20  whitespace-nowrap rounded-2xl bg-[#ba3737fb] text-[#ffff] text-2xl">
          ⚠️ {errorMessage}
        </div>
      )}
    </form>
  );
};

export default LoginForm;
