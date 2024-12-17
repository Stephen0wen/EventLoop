import "./FooterNav.css";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../Contexts/UserContext";
import { DisplayContext } from "../../Contexts/DisplayContext";

function FooterNav() {
    const navigate = useNavigate();
    const { isLoggedIn, user_is_staff } = useContext(UserContext);
    const { isWide } = useContext(DisplayContext);

    if (isLoggedIn && !isWide && user_is_staff) {
        return (
            <nav id="footer-nav">
                <button
                    onClick={() => {
                        navigate("/");
                    }}
                >
                    Home
                </button>
                <button
                    onClick={() => {
                        navigate("/plans");
                    }}
                >
                    Plans
                </button>
                <button
                    onClick={() => {
                        navigate("/manage");
                    }}
                >
                    Manage
                </button>
            </nav>
        );
    }

    if (isLoggedIn && !isWide && !user_is_staff) {
        return (
            <nav id="footer-nav">
                <button
                    onClick={() => {
                        navigate("/");
                    }}
                >
                    Home
                </button>
                <button
                    onClick={() => {
                        navigate("/plans");
                    }}
                >
                    Plans
                </button>
            </nav>
        );
    }

    return <></>;
}

export default FooterNav;
