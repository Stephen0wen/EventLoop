import "./AuthCalendarPopup.css";
import { useContext } from "react";
import { UserContext } from "../../Contexts/UserContext";
import { ErrorContext } from "../../Contexts/ErrorContext";
import { useGoogleLogin } from "@react-oauth/google";
import { addToCalendar, enableCalendar } from "../../apiRequests";

export default function AuthCalendarPopup({ isHidden, setIsHidden, event_id }) {
    const { user_id, token, setUser_calendar_allowed } =
        useContext(UserContext);
    const { setError } = useContext(ErrorContext);

    const onSuccess = ({ code }) => {
        enableCalendar(token, user_id, code)
            .then((user_calendar_allowed) => {
                setUser_calendar_allowed(user_calendar_allowed);
            })
            .then(() => {
                return addToCalendar(token, user_id, event_id);
            })
            .then(({ htmlLink }) => {
                window.open(htmlLink, "_blank");
            })
            .catch((error) => {
                setError(error);
            });
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
