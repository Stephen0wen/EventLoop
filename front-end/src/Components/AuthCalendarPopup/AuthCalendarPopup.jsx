import "./AuthCalendarPopup.css";
import { useContext } from "react";
import { ErrorContext } from "../../Contexts/ErrorContext";
import { useGoogleLogin } from "@react-oauth/google";

export default function AuthCalendarPopup({ isHidden, setIsHidden }) {
    const { setError } = useContext(ErrorContext);

    const onSuccess = ({ code }) => {
        console.log(code);
        setIsHidden(true);
    };

    const onError = (error) => {
        setError(error);
    };

    const authorise = useGoogleLogin({
        onSuccess,
        onError,
        flow: "auth-code",
        scope: "https://www.googleapis.com/auth/calendar.events",
    });

    return (
        <div id="grey-zone" className={isHidden ? "hidden" : ""}>
            <section id="calendar-auth-popup">
                <p id="calendar-auth-message">
                    To add this event to your google calendar, you need to grant
                    EventLoop access.
                </p>
                <div id="calendar-auth-button-container">
                    <button
                        onClick={() => {
                            setIsHidden(true);
                        }}
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => {
                            authorise();
                        }}
                    >
                        Add to Calendar
                    </button>
                </div>
            </section>
        </div>
    );
}
