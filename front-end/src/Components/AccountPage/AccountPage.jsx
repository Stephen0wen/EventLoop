import "./AccountPage.css";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../Contexts/UserContext";
import { ErrorContext } from "../../Contexts/ErrorContext";
import { useNavigate } from "react-router-dom";
import LoadMsg from "../LoadMsg/LoadMsg";

function AccountPage() {
    const { isLoggedIn, user, token, user_id } = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(true);
    const { setError } = useContext(ErrorContext);
    const nagivate = useNavigate();

    useEffect(() => {
        setIsLoading(true);
        if (token && user_id && !isLoggedIn) {
            nagivate("/login");
        }
        if (token && user_id && isLoggedIn) {
            setIsLoading(false);
        }
    }, [isLoggedIn, token, user_id]);

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

    return (
        <main id="account-page">
            <section aria-label="Account Settings" id="account-container">
                <h2 id="greeting">Hello {user.displayName || user.email}</h2>
                <button onClick={handleSignOut}>Log Out</button>
                <button className="danger">Delete Account</button>
            </section>
        </main>
    );
}

export default AccountPage;
