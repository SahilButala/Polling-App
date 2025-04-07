import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserContextProvider } from "./context/UserContext.jsx";

createRoot(document.getElementById("root")).render(
  <>
    <UserContextProvider>
      <App />
      <ToastContainer
        toastStyle={{
          fontSize: "13px",
        }}
      />
    </UserContextProvider>
  </>
);
