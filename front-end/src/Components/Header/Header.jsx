import "./Header.css";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../Contexts/UserContext";

function Header() {
    const navigate = useNavigate();
    const { user, isLoggedIn } = useContext(UserContext);

    const loginButton = (
        <button
            onClick={() => {
                navigate("/login");
            }}
        >
            Log In
        </button>
    );

    const avatar = (
        <img
            id="avatar"
            src={
                user.photoURL ||
                "https://www.svgrepo.com/show/343494/profile-user-account.svg"
            }
        />
    );

    return (
        <header id="header">
            <h1
                onClick={() => {
                    navigate("/");
                }}
                id="logo"
            >
                EventLoop
            </h1>
            {isLoggedIn ? avatar : loginButton}
        </header>
    );
}

export default Header;
