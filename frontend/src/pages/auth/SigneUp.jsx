import React, { useContext, useState } from "react";
import AuthLayout from "../../components/layouts/AuthLayout";
import { Link, useNavigate } from "react-router-dom";
import ProfilePhotoSelector from "../../components/input/ProfilePhotoSelector";
import AuthInput from "../../components/input/AuthInput";
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../api/axiousInstance";
import { API_PATHS } from "../../api/apiPaths";
import { uploadImage } from "../../utils/UploadImage";
import { toast } from "react-toastify";
import { UserContext } from "../../context/UserContext";

const SigneUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setfullname] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [username, setusername] = useState("");
  const [error, seterror] = useState("");
  const { updateUser } = useContext(UserContext);

  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    let profileImageUrl = "";
    e.preventDefault();
    console.log("hello");
    // validating email and password
    if (!validateEmail(email)) {
      seterror("please enter correct or valid email address");
      return;
    }

    if (!password) {
      seterror("please enter the password");
      return;
    }

    if (!fullname) {
      seterror("please enter the fullname");
      return;
    }
    if (!username) {
      seterror("please enter the username");
      return;
    }
    seterror("");

    // calling api

    try {
      if (profilePic) {
        const imageUpload = await uploadImage(profilePic);
        profileImageUrl = imageUpload.imageUrl || "";
      }
      const res = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        username,
        email,
        password,
        fullname,
        profileImageUrl,
      });
      const { token } = res.data;
      if (token) {
        localStorage.setItem("token", token);
      }
      if (res.data.success) {
        toast.success(res.data.message);
        updateUser(res?.data?.user);
        navigate("/login")
      }
    } catch (error) {}
  };
  return (
    <div>
      <AuthLayout>
        <div className="lg:w-[100%] h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center ">
          <h2 className="text-xl font-bold ">Create an Account </h2>
          <p className="text-sm">
            Join us today to entering your details in below
          </p>

          {/* form */}
          <form onSubmit={handleSignUp} className="mt-5">
            <ProfilePhotoSelector
              profilePic={profilePic}
              setProfilePic={setProfilePic}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <AuthInput
                type={"text"}
                label={"userName"}
                placeholder={"xyz"}
                value={username}
                onChange={({ target }) => setusername(target.value)}
              />
              <AuthInput
                type={"text"}
                label={"fullname"}
                placeholder={"xyz 123 "}
                value={fullname}
                onChange={({ target }) => setfullname(target.value)}
              />
              <AuthInput
                type={"email"}
                label={"email"}
                placeholder={"xyz123@gmail.com"}
                value={email}
                onChange={({ target }) => setEmail(target.value)}
              />
              <AuthInput
                type={"password"}
                label={"password"}
                placeholder={"Min 8 Character"}
                value={password}
                onChange={({ target }) => setPassword(target.value)}
              />
              {error && <p className="text-red-500 text-xs pb-2 ">{error}</p>}
            </div>
            <button type="submit" className="btn-primary">
              Create Account
            </button>

            <p className="text-sm mt-4">
              Do you have already account ?{" "}
              <Link
                to={"/login"}
                className="text-blue-500  font-bold underline "
              >
                Log in
              </Link>
            </p>
          </form>
        </div>
      </AuthLayout>
    </div>
  );
};

export default SigneUp;
