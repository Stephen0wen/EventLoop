import { useEffect, useState, useContext } from "react";
import { UserContext } from "../../Contexts/UserContext";
import "./EventPage.css";
import { useParams } from "react-router-dom";
import { getEvent, getPlan, postPlan } from "../../apiRequests";
import LoadMsg from "../LoadMsg/LoadMsg";
import EventDetails from "../EventDetails/EventDetails";
import { useNavigate } from "react-router-dom";
import { ErrorContext } from "../../Contexts/ErrorContext";

function EventPage() {
    const [isLoading, setIsLoading] = useState(true);
    const [event, setEvent] = useState({});
    const [buttons, setButtons] = useState([]);
    const { event_id } = useParams();
    const { isLoggedIn, user_id, token } = useContext(UserContext);
    const { error, setError } = useContext(ErrorContext);
    const navigate = useNavigate();

    const backButton = (
        <button
            id="back-button"
            key="back-button"
            onClick={() => {
                navigate("/");
            }}
        >
            {"Back"}
        </button>
    );

    const loginButton = (
        <button
            id="login-button"
            key="login-button"
            onClick={() => {
                navigate("/login");
            }}
        >
            Log In
        </button>
    );

    const signUpButton = (
        <button
            id="sign-up-button"
            key="sign-up-button"
            onClick={() => {
                postPlan(token, user_id, event_id).then(() => {
                    navigate(`/plans/${event_id}`);
                });
            }}
        >
            Sign Up
        </button>
    );

    const viewPlanButton = (
        <button
            id="view-plan-button"
            key="view-plan-button"
            onClick={() => {
                navigate(`/plans/${event_id}`);
            }}
        >
            View Plan
        </button>
    );

    const requestEvent = (token, user_id, event_id) => {
        if (isLoggedIn) return getPlan(token, user_id, event_id);
        else return getEvent(event_id);
    };

    useEffect(() => {
        const newButtons = [backButton];
        setIsLoading(true);
        requestEvent(token, user_id, event_id)
            .then((apiEvent) => {
                if (!isLoggedIn) newButtons.push(loginButton);
                if (Object.keys(apiEvent).includes("is_user_attending")) {
                    newButtons.push(
                        apiEvent.is_user_attending
                            ? viewPlanButton
                            : signUpButton
                    );
                }
                setButtons(newButtons);
                setEvent(apiEvent);
            })
            .then(() => {
                setIsLoading(false);
            })
            .catch((apiError) => {
                setError(apiError);
            });
    }, [isLoggedIn]);

    if (isLoading) {
        return <LoadMsg message="Loading Event.." />;
    }

    return (
        <main id="event-page">
            <EventDetails event={event} />
            <section aria-label="Event Options" id="button-container">
                {buttons}
            </section>
        </main>
    );
}

export default EventPage;
