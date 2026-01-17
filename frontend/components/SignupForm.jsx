import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const SignupForm = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const navigate = useNavigate();

  const [getFormData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (event) => {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmitSignupForm = async (event) => {
    event.preventDefault();

    try {
      // // Using Fetch function
      // const response = await fetch('http://localhost:8000/api/v1/user/register',{
      //   method: "POST",
      //   headers: { "Content-Type": "application/json"},
      //   body: JSON.stringify(getFormData),
      // })

      const response = await axios.post(
        "http://localhost:8000/api/v1/user/register",
        getFormData,
        { headers: { "Content-Type": "application/json" } }
      );
      setSuccessMessage(response.data.message); // e.g. "User registered successfully!"
      setErrorMessage(null); // clear error if success

      setTimeout(() => navigate("/login"), 2000);
      // Set form data
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data.message); // e.g. "User already exist"
        setSuccessMessage(null); // clear success if error
      } else {
        setErrorMessage("Network error, please try again.");
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmitSignupForm}
      className="w-1/3  px-10 py-10 flex flex-col items-center justify-center gap-3 bg-[#e3bbb979] border border-[#a67a7a5f]  rounded-2xl"
    >
      <h2 className="text-4xl font-semibold mb-5 mt-3 text-[#4782cf]">
        Register Yourself
      </h2>
      <div className="w-full flex  gap-2">
        <input
          name="firstName"
          className="bg-[#e3acaca2] w-full px-6 py-3 outline-none border-2 border-[#c9999999] rounded-3xl"
          type="text"
          placeholder="First Name"
          onChange={handleChange}
          value={getFormData.firstName}
        />
        <input
          name="lastName"
          className="bg-[#e3acaca2] w-full px-6 py-3 outline-none border-2 border-[#c9999999] rounded-3xl"
          type="text"
          placeholder="Last Name"
          onChange={handleChange}
          value={getFormData.lastName}
        />
      </div>
      <input
        name="email"
        className="bg-[#e3acaca2] w-full px-6 py-3 outline-none border-2 border-[#c9999999] rounded-3xl"
        type="email"
        placeholder="abc@xyz.com"
        onChange={handleChange}
        value={getFormData.email}
      />
      <input
        name="password"
        className="bg-[#e3acaca2] w-full px-6 py-3 outline-none border-2 border-[#c9999999] rounded-3xl"
        type="password"
        placeholder="Password"
        onChange={handleChange}
        value={getFormData.password}
      />
      <input
        name="confirmPassword"
        className="bg-[#e3acaca2] w-full px-6 py-3 outline-none border-2 border-[#c9999999] rounded-3xl"
        type="password"
        placeholder="Conform Password"
        onChange={handleChange}
        value={getFormData.confirmPassword}
      />
      <button
        type="submit"
        className="active:scale-95 w-1/2 mt-3 bg-[#ee6060] uppercase py-3 font-semibold text-[#ffff] rounded-2xl"
      >
        Submit
      </button>
      <div>
        Already have an account?{" "}
        <span>
          <Link to="/login" className="text-[#3e95e8] font-semibold px-2">
            Login
          </Link>
        </span>
      </div>

      {errorMessage && (
        <div className=" absolute px-5 py-3 top-20  whitespace-nowrap rounded-2xl bg-[#ba3737fb] text-[#ffff] text-2xl">
          ⚠️ {errorMessage}
        </div>
      )}
      {successMessage && (
        <div className=" absolute px-5 py-3 top-20  whitespace-nowrap rounded-2xl bg-[#60ac7dfb] text-[#ffff] text-2xl">
          ✅ {successMessage}
        </div>
      )}
    </form>
  );
};

export default SignupForm;
