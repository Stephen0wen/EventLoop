import "./ReauthenticationPopup.css";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { deleteUser } from "../../apiRequests";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ErrorContext } from "../../Contexts/ErrorContext";
import { UserContext } from "../../Contexts/UserContext";

export default function ReauthenticationPopup({
    isHidden,
    setIsHidden,
    provider,
}) {
    const { setError } = useContext(ErrorContext);
    const { token } = useContext(UserContext);
    const nagivate = useNavigate();

    const googleReauth = () => {
        return firebase
            .auth()
            .currentUser.reauthenticateWithPopup(
                new firebase.auth.GoogleAuthProvider()
            );
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
}
