// import { Fragment } from "react";
// import { useLocation, Navigate } from "react-router-dom";

// export default function RouteGuard({ authinticated, element }) {
//   const location = useLocation();
//   // if user not authinticated and try  to access home page or other routes then it will redirect auth page
//   if (
//     (!authinticated && !location.pathname.includes("/login"))
//   ) {
//     return <Navigate to="/login" />;
//   }
//   if (
//     (authinticated && location.pathname.includes("/login")) ||
//     location.pathname.includes("/sign-up")
//   ) {
//     return <Navigate to={"/dashboard"} />;
//   }
//   return <Fragment>{element}</Fragment>;
// }


import { Fragment } from "react";
import { useLocation, Navigate } from "react-router-dom";

export default function RouteGuard({ authenticated, element }) {
  const location = useLocation();

  // If not logged in and accessing any page other than login or sign-up
  if (!authenticated && !["/login", "/sign-up"].includes(location.pathname)) {
    return <Navigate to="/login" />;
  }

  // If logged in and trying to access login or sign-up
  if (
    authenticated &&
    ["/login", "/sign-up"].includes(location.pathname)
  ) {
    return <Navigate to="/dashboard" />;
  }

  return <Fragment>{element}</Fragment>;
}

