import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import "./Config/firebase-config.js";
import { UserProvider } from "./Contexts/UserContext.jsx";

createRoot(document.getElementById("root")).render(
    <BrowserRouter>
        <UserProvider>
            <StrictMode>
                <App />
            </StrictMode>
        </UserProvider>
    </BrowserRouter>
);
