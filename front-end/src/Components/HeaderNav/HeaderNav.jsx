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
                <button>Plans</button>
                <button>Manage</button>
                {children}
            </nav>
        );
    }

    return <>{children}</>;
}

export default HeaderNav;
