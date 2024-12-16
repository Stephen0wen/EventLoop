import "./Header.css";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../Contexts/UserContext";
import HeaderNav from "../HeaderNav/HeaderNav";

function Header() {
    const navigate = useNavigate();
    const [avatarURL, setAvatarURL] = useState(null);
    const { user, isLoggedIn, user_id } = useContext(UserContext);

    useEffect(() => {
        if (user_id) {
            console.log(user.photoURL);
            setAvatarURL(user.photoURL);
        }
    }, [user_id, isLoggedIn]);

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
        <Link to={"/account"}>
            <img
                id="avatar"
                src={
                    avatarURL ||
                    "https://www.svgrepo.com/show/343494/profile-user-account.svg"
                }
                alt="Account Settings Icon"
            />
        </Link>
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
            <HeaderNav>{isLoggedIn ? avatar : loginButton}</HeaderNav>
        </header>
    );
}

export default Header;
