import React, { useContext, useState } from "react";
import AuthLayout from "../../components/layouts/AuthLayout";
import { Link, useNavigate } from "react-router-dom";
import AuthInput from "../../components/input/AuthInput";
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../api/axiousInstance";
import { API_PATHS } from "../../api/apiPaths";
import { toast } from "react-toastify";
import { UserContext } from "../../context/UserContext";


// import { LoginUserService } from "../../services/ApiServices";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [error, seterror] = useState("");
  const {updateUser} = useContext(UserContext)


  // all functions
  const handleLogin = async (e) => {
    e.preventDefault();

    // validating email and password
    if (!validateEmail(email)) {
      seterror("please enter correct or valid email address");
      return;
    }
   // validate password
    if (!password) {
      seterror("please enter the password");
      return;
    }
    seterror("");

    // calling api
    try {
      const res = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      });
      
      
      // set up token
      const { token } = res.data;
      if (res.data.success) {
        toast.success(res.data.message);
        updateUser(res?.data?.user)
      }
      
      if (token) {
        localStorage.setItem("token", token);
        navigate("/dashboard");
      }


    } catch (error) {
      if (error.response && error.response.data.message) {
        seterror(error.response.data.message);
      } else {
        seterror("Something went wrong please try again");
      }
    }
  };

  const navigate = useNavigate();
  return (
    <AuthLayout>
      <div className="lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center">
        <h3 className="text-2xl font-bold text-black">Welcome Back</h3>
        <p className="mb-8 text-sm capitalize">
          please enter your details to log in
        </p>
        <form onSubmit={handleLogin}>
          <AuthInput
            value={email}
            onChange={({ target }) => setEmail(target.value)}
            label="Email address"
            placeholder="xyz123@gamil.com"
            type="email"
          />
          <AuthInput
            value={password}
            onChange={({ target }) => setpassword(target.value)}
            label="Enter password"
            placeholder="password must 8 character"
            type="password"
          />
          {/* 
              // error message */}
          {error && <p className="text-red-500 text-xs pb-2 ">{error}</p>}
          <button type="submit" className="btn-primary">
            Login
          </button>

          {/* link to navigate signup page */}
          <p className="flex gap-2.5 mt-5 text-sm">
            Don't have an account ?
            <Link to={"/sign-up"} className="font-bold text-blue-500 underline">
              SignUp
            </Link>
          </p>
        </form>
        <p className="text-sm"></p>
      </div>
    </AuthLayout>
  );
};

export default LoginPage;
