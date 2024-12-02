import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import "./Config/firebase-config.js";
import { UserProvider } from "./Contexts/UserContext.jsx";
import { DisplayProvider } from "./Contexts/DisplayContext.jsx";

createRoot(document.getElementById("root")).render(
    <BrowserRouter>
        <DisplayProvider>
            <UserProvider>
                <StrictMode>
                    <App />
                </StrictMode>
            </UserProvider>
        </DisplayProvider>
    </BrowserRouter>
);
