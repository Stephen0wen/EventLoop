import "./AccountPage.css";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../Contexts/UserContext";
import { ErrorContext } from "../../Contexts/ErrorContext";
import { useNavigate } from "react-router-dom";
import LoadMsg from "../LoadMsg/LoadMsg";

import ReauthenticationPopup from "../ReauthenticationPopup/ReauthenticationPopup";

function AccountPage() {
    const { user, token, user_id } = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(true);
    const [isHidden, setIsHidden] = useState(true);
    const { setError } = useContext(ErrorContext);
    const [provider, setProvider] = useState(null);
    const nagivate = useNavigate();

    useEffect(() => {
        setIsLoading(true);
        if (token && user_id && !user) {
            nagivate("/login");
        }
        if (token && user_id && user) {
            setIsLoading(false);
        }
    }, [user, token, user_id]);

    useEffect(() => {
        if (token && user_id && user) {
            const { providerId } =
                firebase.auth().currentUser._delegate.providerData[0];
            setProvider(providerId);
        }
    }, [user, token, user_id]);

    const handleSignOut = () => {
        firebase
            .auth()
            .signOut()
            .then(() => {
                nagivate("/");
            })
            .catch((error) => {
                setError(error);
            });
    };

    if (isLoading) {
        return (
            <main>
                <LoadMsg message="Loading page.." />
            </main>
        );
    }

    if (user) {
        return (
            <main id="account-page">
                <section aria-label="Account Settings" id="account-container">
                    <h2 id="greeting">
                        Hello {user.displayName || user.email}
                    </h2>
                    <button onClick={handleSignOut}>Log Out</button>
                    <button
                        className="danger"
                        onClick={() => {
                            setIsHidden(false);
                        }}
                    >
                        Delete Account
                    </button>
                </section>
                <ReauthenticationPopup
                    isHidden={isHidden}
                    setIsHidden={setIsHidden}
                    provider={provider}
                />
            </main>
        );
    }
}

export default AccountPage;
