import "./HeaderNav.css";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../Contexts/UserContext";
import { DisplayContext } from "../../Contexts/DisplayContext";

function HeaderNav({ children }) {
    const navigate = useNavigate();
    const { isLoggedIn } = useContext(UserContext);
    const { isWide } = useContext(DisplayContext);

    if (isLoggedIn && isWide) {
        return (
            <nav id="header-nav">
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
                {children}
            </nav>
        );
    }

    return <>{children}</>;
}

export default HeaderNav;
