import "./Header.css";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../Contexts/UserContext";
import HeaderNav from "../HeaderNav/HeaderNav";

function Header() {
    const navigate = useNavigate();
    const { user } = useContext(UserContext);
    const [photoURL, setPhotoURL] = useState("");

    useEffect(() => {
        setPhotoURL(
            "https://www.svgrepo.com/show/343494/profile-user-account.svg"
        );
        if (user && user.photoURL) {
            setPhotoURL(user.photoURL);
        }
    }, [user]);

    const avatar = (
        <Link to={"/account"}>
            <img id="avatar" src={photoURL} alt="Account Settings Icon" />
        </Link>
    );

    const loginButton = (
        <button
            onClick={() => {
                navigate("/login");
            }}
        >
            Log In
        </button>
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
            <HeaderNav>{user ? avatar : loginButton}</HeaderNav>
        </header>
    );
}

export default Header;
