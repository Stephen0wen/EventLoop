import "./ReauthenticationPopup.css";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { deleteUser } from "../../apiRequests";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { ErrorContext } from "../../Contexts/ErrorContext";
import { UserContext } from "../../Contexts/UserContext";

export default function ReauthenticationPopup({
    isHidden,
    setIsHidden,
    provider,
}) {
    const { setError } = useContext(ErrorContext);
    const { token, user } = useContext(UserContext);
    const [password, setPassword] = useState("");
    const [warning, setWarning] = useState("");
    const nagivate = useNavigate();

    const googleReauth = () => {
        return firebase
            .auth()
            .currentUser.reauthenticateWithPopup(
                new firebase.auth.GoogleAuthProvider()
            );
    };

    const passwordReauth = () => {
        const { email } = firebase.auth().currentUser._delegate;
        const credential = firebase.auth.EmailAuthProvider.credential(
            email,
            password
        );
        return firebase
            .auth()
            .currentUser.reauthenticateWithCredential(credential);
    };

    const googleDelete = () => {
        googleReauth()
            .then(() => {
                return deleteUser(token);
            })
            .then(() => {
                return firebase.auth().currentUser.delete();
            })
            .then(() => {
                nagivate("/");
            })
            .catch((error) => {
                setError(error);
            });
    };

    const passwordDelete = () => {
        passwordReauth()
            .then(() => {
                return deleteUser(token);
            })
            .then(() => {
                return firebase.auth().currentUser.delete();
            })
            .then(() => {
                nagivate("/");
            })
            .catch((error) => {
                if (error.code === "auth/invalid-credential") {
                    setWarning("Incorrect Password");
                    setPassword("");
                } else {
                    setError(error);
                }
            });
    };

    const updatePassword = ({ target: { value } }) => {
        setWarning("");
        setPassword(value);
    };

    if (provider === "google.com") {
        return (
            <div id="grey-zone" className={isHidden ? "hidden" : ""}>
                <section id="reauth-popup">
                    <p id="reauth-message">
                        Are you sure you want to delete your account and all
                        associated data? You must sign in again to confirm...
                    </p>
                    <div id="reauth-button-container">
                        <button
                            onClick={() => {
                                setIsHidden(true);
                            }}
                        >
                            Cancel
                        </button>
                        <button className="danger" onClick={googleDelete}>
                            Delete Account
                        </button>
                    </div>
                </section>
            </div>
        );
    }

    if (provider === "password") {
        return (
            <div id="grey-zone" className={isHidden ? "hidden" : ""}>
                <section id="reauth-popup">
                    <p id="reauth-message">
                        Are you sure you want to delete your account and all
                        associated data? You must enter your password to
                        confirm...
                    </p>
                    <form>
                        <p>{user.password}</p>
                        <label>
                            <p>Password</p>
                            <input
                                id="password-input"
                                type="password"
                                onChange={updatePassword}
                                value={password}
                            />
                        </label>
                        <p className="warning">{warning}</p>
                    </form>
                    <div id="reauth-button-container">
                        <button
                            onClick={() => {
                                setIsHidden(true);
                            }}
                        >
                            Cancel
                        </button>
                        <button className="danger" onClick={passwordDelete}>
                            Delete Account
                        </button>
                    </div>
                </section>
            </div>
        );
    }
}
