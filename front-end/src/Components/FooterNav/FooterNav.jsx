import "./FooterNav.css";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../Contexts/UserContext";
import { DisplayContext } from "../../Contexts/DisplayContext";

function FooterNav() {
    const navigate = useNavigate();
    const { isLoggedIn } = useContext(UserContext);
    const { isWide } = useContext(DisplayContext);

    if (isLoggedIn && !isWide) {
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
                <button>Manage</button>
            </nav>
        );
    }

    return <></>;
}

export default FooterNav;
