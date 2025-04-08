import { lazy, useContext, useState } from "react";
import "./App.css";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import RouteGuard from "./Protected_Route";
import { UserContext } from "./context/UserContext";

// all components
const LoginPage = lazy(() => import("./pages/auth/LoginPage"));
const CreatePoll = lazy(() => import("./pages/dashboard/CreatePoll"));
const BookMarks = lazy(() => import("./pages/dashboard/BookMarks"));
const VotedPolls = lazy(() => import("./pages/dashboard/VotedPolls"));
const Home = lazy(() => import("./pages/dashboard/Home"));
const MyPolls = lazy(() => import("./pages/dashboard/MyPolls"));
const SigneUp = lazy(() => import("./pages/auth/SigneUp"));
const NotFoundPage = lazy(() => import("./NotFound/index"));

function App() {
  const { auth } = useContext(UserContext);
  return (
    <div>
      <Router>
        <Routes>
          <Route
            path=""
            element={
              <RouteGuard
                element={<Home />}
                authenticated={auth.isAuthenticated}
              />
            }
          />

          <Route
            path="/login"
            element={
              <RouteGuard
                element={<LoginPage />}
                authenticated={auth.isAuthenticated}
              />
            }
          />
          <Route
            path="/dashboard"
            element={
              <RouteGuard
                element={<Home />}
                authenticated={auth.isAuthenticated}
              />
            }
          />
          <Route
            path="/sign-up"
            element={
              <RouteGuard
                authenticated={auth.isAuthenticated}
                element={<SigneUp />}
              />
            }
          />
          <Route
            path="/my-polls"
            element={
              <RouteGuard
                element={<MyPolls />}
                authenticated={auth.isAuthenticated}
              />
            }
          />
          <Route
            path="/create-poll"
            element={
              <RouteGuard
                element={<CreatePoll />}
                authenticated={auth.isAuthenticated}
              />
            }
          />
          <Route
            path="/bookmarks"
            element={
              <RouteGuard
                element={<BookMarks />}
                authenticated={auth.isAuthenticated}
              />
            }
          />
          <Route
            path="/voted-polls"
            element={
              <RouteGuard
                element={<VotedPolls />}
                authenticated={auth.isAuthenticated}
              />
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

const Root = () => {
  // checking if token is exsisting in localstorege
  const isauthenticated = !!localStorage.getItem("token");

  // checking user is authenticated then it redirect to dashboard otherwise it redirect to login page
  return isauthenticated ? (
    <Navigate to={"/dashboard"} />
  ) : (
    <Navigate to="/login" />
  );
};
