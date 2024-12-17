import "./SignUpPage.css";
import { useState, useContext } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { useNavigate } from "react-router-dom";
import { ErrorContext } from "../../Contexts/ErrorContext";
import GoogleButton from "../GoogleButton/GoogleButton";

function SignUpPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [warnings, setWarnings] = useState({
        email: "",
        password: "",
        password2: "",
    });
    const { setError } = useContext(ErrorContext);
    const navigate = useNavigate();

    const updateEmail = ({ target: { value } }) => {
        setEmail(value);
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const newWarnings = warnings;
        if (!emailPattern.test(value)) {
            newWarnings.email = "Please enter a valid email";
        } else {
            newWarnings.email = "";
        }
        setWarnings(newWarnings);
    };

    const updatePassword = ({ target: { value } }) => {
        setPassword(value);
    };

    const updatePassword2 = ({ target: { value } }) => {
        setPassword2(value);
        const newWarnings = warnings;
        if (value === password) {
            newWarnings.password2 = "";
        } else {
            newWarnings.password2 = "Passwords must match";
        }
        setWarnings(newWarnings);
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
        if (!warnings.email && !warnings.password && !warnings.password2) {
            firebase
                .auth()
                .createUserWithEmailAndPassword(email, password)
                .then(() => {
                    navigate("/");
                })
                .catch((error) => {
                    setError(error);
                });
        }
    };

    return (
        <main id="signup-page">
            <form id="signup-form">
                <h2>Sign up for EventLoop</h2>
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
                <label>
                    <p>Repeat Password</p>
                    <input
                        id="password2-input"
                        type="password"
                        onChange={updatePassword2}
                        value={password2}
                    />
                    <p className="warning">{warnings.password2}</p>
                </label>
                <button type="button" onClick={handleSubmit}>
                    SIGN UP
                </button>
            </form>
            <p id="under-form-message">
                Already have an account?{" "}
                <span
                    id="sign-in-link"
                    onClick={() => {
                        navigate("/login");
                    }}
                >
                    Sign in
                </span>
            </p>
        </main>
    );
}

export default SignUpPage;
