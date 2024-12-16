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

    console.log(error);
    let message = "An error occured";

    if (notFound) {
        message = "404 - Page not found.";
    }

    // if (error.message) {
    //     message = error.message;
    // }

    if (error.code && error.code === "ERR_NETWORK") {
        message = "Unable to connect to server...";
    }

    // if (error.msg) {
    //     message = error.msg;
    //     notFound = true;
    // }

    if (error.response.data.msg) {
        message = error.response.data.msg;
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
