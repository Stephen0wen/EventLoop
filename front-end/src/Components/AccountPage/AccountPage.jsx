import "./AccountPage.css";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { useContext, useEffect } from "react";
import { UserContext } from "../../Contexts/UserContext";
import { useNavigate } from "react-router-dom";

function AccountPage() {
    const { isLoggedIn, user } = useContext(UserContext);
    const nagivate = useNavigate();

    useEffect(() => {
        if (!isLoggedIn) {
            nagivate("/");
        }
    }, [isLoggedIn]);

    const handleSignOut = () => {
        firebase
            .auth()
            .signOut()
            .then(() => {
                nagivate("/");
            });
    };

    return (
        <section id="account-page" className="page">
            <div id="account-container">
                <h2 id="greeting">Hello {user.displayName || user.email}</h2>
                <button onClick={handleSignOut}>Log Out</button>
                <button className="danger">Delete Account</button>
            </div>
        </section>
    );
}

export default AccountPage;
