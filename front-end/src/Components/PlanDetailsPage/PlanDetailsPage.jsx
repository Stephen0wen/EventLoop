import "./PlanDetailsPage.css";
import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../../Contexts/UserContext";
import { addToCalendar, deletePlan, getPlan } from "../../apiRequests";
import LoadMsg from "../LoadMsg/LoadMsg";
import EventDetails from "../EventDetails/EventDetails";
import ConfirmationPopup from "../ConfirmationPopup/ConfirmationPopup";
import { useNavigate } from "react-router-dom";
import { ErrorContext } from "../../Contexts/ErrorContext";
import AuthCalendarPopup from "../AuthCalendarPopup/AuthCalendarPopup";
import OpenCalendarPopup from "../OpenCalendarPopup/OpenCalendarPopup";

function PlanDetailsPage() {
    const [isLoading, setIsLoading] = useState(true);
    const [event, setEvent] = useState({});
    const [hideCancelPlanPopup, setHideCancelPlanPopup] = useState(true);
    const [hideAuthPopup, setHideAuthPopup] = useState(true);
    const [hideCalendarPopup, setHideCalendarPopup] = useState(true);
    const [calendarLink, setCalendarLink] = useState(null);
    const { event_id } = useParams();
    const { token, user_id, user_calendar_allowed } = useContext(UserContext);
    const { setError } = useContext(ErrorContext);
    const navigate = useNavigate();

    useEffect(() => {
        setIsLoading(true);
        if (token && user_id) {
            getPlan(token, user_id, event_id)
                .then((apiEvent) => {
                    if (apiEvent.is_user_attending) setEvent(apiEvent);
                    else navigate(`/events/${event_id}`);
                })
                .then(() => {
                    setIsLoading(false);
                })
                .catch((apiError) => {
                    setError(apiError);
                });
        }
    }, [token, user_id]);

    const cancelPlan = () => {
        deletePlan(token, user_id, event_id)
            .then(() => {
                navigate("/plans");
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const cancel_plan_button = (
        <>
            <button
                className="danger"
                onClick={() => {
                    setHideCancelPlanPopup(false);
                }}
            >
                Cancel Plan
            </button>
            <ConfirmationPopup
                message="Are you sure you want to cancel this plan?"
                isHidden={hideCancelPlanPopup}
                setIsHidden={setHideCancelPlanPopup}
                func={cancelPlan}
                args={[token, user_id, event_id]}
            />
        </>
    );

    const calander_allowed_button = (
        <>
            <button
                onClick={() => {
                    addToCalendar(token, user_id, event_id)
                        .then(({ htmlLink }) => {
                            setCalendarLink(htmlLink);
                            setHideCalendarPopup(false);
                        })
                        .catch((error) => {
                            setError(error);
                        });
                }}
            >
                Add to Calendar
            </button>
        </>
    );

    const calendar_not_allowed_button = (
        <>
            <button
                onClick={() => {
                    setHideAuthPopup(false);
                }}
            >
                Add to Calendar
            </button>
            <AuthCalendarPopup
                isHidden={hideAuthPopup}
                setIsHidden={setHideAuthPopup}
                event_id={event_id}
            />
        </>
    );

    if (isLoading) {
        return <LoadMsg message="Loading Plan.." />;
    }

    return (
        <main id="plan-details-page">
            <EventDetails event={event} />
            <section aria-label="Plan Options" id="button-container">
                <button
                    onClick={() => {
                        navigate("/plans");
                    }}
                >
                    Back
                </button>
                {cancel_plan_button}
                {user_calendar_allowed
                    ? calander_allowed_button
                    : calendar_not_allowed_button}
                <OpenCalendarPopup
                    isHidden={hideCalendarPopup}
                    setIsHidden={setHideCalendarPopup}
                    calendarLink={calendarLink}
                />
            </section>
        </main>
    );
}

export default PlanDetailsPage;
