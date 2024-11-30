import "./Header.css";
import { useNavigate } from "react-router-dom";

function Header() {
    const navigate = useNavigate();
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
            <button
                onClick={() => {
                    navigate("/login");
                }}
            >
                Log In
            </button>
        </header>
    );
}

export default Header;
