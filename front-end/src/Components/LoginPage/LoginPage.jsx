import "./LoginPage.css";
import { useState, useContext } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";

function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [warnings, setWarnings] = useState({
        email: "",
        password: "",
    });

    const updateEmail = (event) => {
        setEmail(event.target.value);
    };

    const updatePassword = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = () => {
        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then(() => {
                return firebase.auth().currentUser.getIdToken();
            })
            .then((token) => {
                setWarnings({
                    email: "",
                    password: "",
                });
                console.dir(token);
            })
            .catch((error) => {
                handleError(error);
            });
    };

    const handleError = (error) => {
        if (error.code === "auth/invalid-email") {
            setWarnings({ email: "Invalid Email", password: "" });
        }
        if (error.code === "auth/missing-password") {
            setWarnings({ email: "", password: "Enter Password" });
        }
        if (error.code === "auth/invalid-credential") {
            setWarnings({
                email: "",
                password: "Incorrect email or password",
            });
        }
    };

    return (
        <section id="login-page" className="page">
            <form id="login-form">
                <h2>Sign in to EventLoop</h2>
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
        </section>
    );
}

export default LoginPage;
