import "./LoginPage.css";
import { useState, useContext } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { UserContext } from "../../Contexts/UserContext";
import { useNavigate } from "react-router-dom";
import { ErrorContext } from "../../Contexts/ErrorContext";
import GoogleButton from "../GoogleButton/GoogleButton";

function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [warnings, setWarnings] = useState({
        email: "",
        password: "",
    });
    const { setError } = useContext(ErrorContext);
    const navigate = useNavigate();
    const { setIsLoggedIn, setToken, setUser, setUser_id } =
        useContext(UserContext);

    const updateEmail = (event) => {
        setEmail(event.target.value);
    };

    const updatePassword = (event) => {
        setPassword(event.target.value);
    };

    const googleSignIn = () => {
        firebase
            .auth()
            .signInWithPopup(new firebase.auth.GoogleAuthProvider())
            .then(() => {
                navigate("/");
            })
            .catch((error) => {
                setError(error);
            });
    };

    const handleSubmit = () => {
        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then(() => {
                navigate("/");
            })
            .catch((error) => {
                handleError(error);
            });
    };

    const handleError = (error) => {
        if (error.code === "auth/invalid-email") {
            setWarnings({ email: "Invalid Email", password: "" });
        } else if (error.code === "auth/missing-password") {
            setWarnings({ email: "", password: "Enter Password" });
        } else if (error.code === "auth/invalid-credential") {
            setWarnings({
                email: "",
                password: "Incorrect email or password",
            });
        } else {
            setError(error);
        }
    };

    return (
        <main id="login-page">
            <form id="login-form">
                <h2>Sign in to EventLoop</h2>
                <GoogleButton googleSignIn={googleSignIn} />
                or
                <label>
                    <p>Email</p>
                    <input
                        id="email-input"
                        onChange={updateEmail}
                        value={email}
                    />
                    <p className="warning">{warnings.email}</p>
                </label>
                <label>
                    <p>Password</p>
                    <input
                        id="password-input"
                        type="password"
                        onChange={updatePassword}
                        value={password}
                    />
                    <p className="warning">{warnings.password}</p>
                </label>
                <button type="button" onClick={handleSubmit}>
                    SIGN IN
                </button>
            </form>
            <p id="under-form-message">
                Don't have an account? <span id="sign-up-link">Sign Up</span>
            </p>
        </main>
    );
}

export default LoginPage;
