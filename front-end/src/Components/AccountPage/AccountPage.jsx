import "./AccountPage.css";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { useContext, useEffect } from "react";
import { UserContext } from "../../Contexts/UserContext";
import { useNavigate } from "react-router-dom";
import LoginPage from "../LoginPage/LoginPage";

function AccountPage() {
    const { isLoggedIn, user } = useContext(UserContext);
    const nagivate = useNavigate();

    useEffect(() => {
        console.dir(user);
        if (!isLoggedIn) {
            nagivate("/login");
        }
    }, [isLoggedIn]);

    return (
        <section id="account-page" className="page">
            <div id="account-container">
                <h2 id="greeting">Hello {user.displayName || user.email}</h2>
                <button>Log Out</button>
                <button className="danger">Delete Account</button>
            </div>
        </section>
    );
}

export default AccountPage;
