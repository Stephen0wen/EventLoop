import "./ErrorDisplay.css";
import { useContext } from "react";
import { ErrorContext } from "../../Contexts/ErrorContext";
import { useNavigate } from "react-router-dom";

const ErrorDisplay = ({ notFound }) => {
    const { error, setError } = useContext(ErrorContext);
    const navigate = useNavigate();

    const handleClick = () => {
        setError(false);
        if (notFound) {
            navigate("/");
        } else {
            navigate(-1);
        }
    };

    console.log(error.code);
    let message = "An error occured";

    if (notFound) {
        message = "404 - Page not found.";
    } else if (error.code && error.code === "ERR_NETWORK") {
        message = "Unable to connect to server...";
    } else if (error.code && error.code === "auth/network-request-failed") {
        message = "Unable to connect to Auth server...";
    } else if (error.response.data.msg) {
        message = error.response.data.msg;
    } else if (error.message) {
        message = error.message;
    }

    return (
        <div id="error-display">
            <h3 id="error-msg">{message}</h3>
            <button id="error-button" onClick={handleClick}>
                Back
            </button>
        </div>
    );
};

export default ErrorDisplay;
