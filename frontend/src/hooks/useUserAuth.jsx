import React, { useEffect } from "react";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiousInstance";
import { API_PATHS } from "../api/apiPaths";

const useUserAuth = () => {
  const { user, clearUser, updateUser } = useContext(UserContext);
  const navigate = useNavigate();
  
  useEffect(() => {
      if (user) return;
      let isMounted = true;
    const fetchUserInfo = async () => {
      try {
        const res = await axiosInstance.get(API_PATHS.AUTH.GET_USER);
        if (isMounted && res.data) {
          updateUser(res.data.user);
        }
      } catch (error) {
        if (isMounted) {
          clearUser();
          navigate("/login");
        }
      }
    };

    fetchUserInfo()
    return ()=>{
        isMounted = false
    }
  },[user, clearUser, updateUser]);
};

export default useUserAuth;
