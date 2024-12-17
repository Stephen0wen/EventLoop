import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import "./Config/firebase-config.js";
import { UserProvider } from "./Contexts/UserContext.jsx";
import { DisplayProvider } from "./Contexts/DisplayContext.jsx";
import { ErrorProvider } from "./Contexts/ErrorContext.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";

createRoot(document.getElementById("root")).render(
    <BrowserRouter>
        <GoogleOAuthProvider clientId="410749109743-086kc6ica906frrahf07mt6ob1joorn6.apps.googleusercontent.com">
            <DisplayProvider>
                <ErrorProvider>
                    <UserProvider>
                        <StrictMode>
                            <App />
                        </StrictMode>
                    </UserProvider>
                </ErrorProvider>
            </DisplayProvider>
        </GoogleOAuthProvider>
    </BrowserRouter>
);
