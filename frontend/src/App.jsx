import { lazy, useState } from "react";
import "./App.css";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";



// all components 
const LoginPage = lazy(()=>import('./pages/auth/LoginPage'))
const CreatePoll = lazy(()=>import('./pages/dashboard/CreatePoll'))
const BookMarks = lazy(()=>import('./pages/dashboard/BookMarks'))
const VotedPolls = lazy(()=>import('./pages/dashboard/VotedPolls'))
const Home = lazy(()=>import('./pages/dashboard/Home'))
const MyPolls = lazy(()=>import('./pages/dashboard/MyPolls'))
const SigneUp = lazy(()=>import('./pages/auth/SigneUp'))
const NotFoundPage = lazy(()=>import('./NotFound/index'))


function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Root />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<Home />} />
          <Route path="/sign-up" element={<SigneUp />} />
          <Route path="/my-polls" element={<MyPolls />} />
          <Route path="/create-poll" element={<CreatePoll />} />
          <Route path="/bookmarks" element={<BookMarks />} />
          <Route path="/voted-polls" element={< VotedPolls/>} />
          <Route path="*" element={< NotFoundPage/>} />
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
