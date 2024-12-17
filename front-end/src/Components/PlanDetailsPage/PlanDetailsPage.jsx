import "./PlanDetailsPage.css";
import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../../Contexts/UserContext";
import { deletePlan, getPlan } from "../../apiRequests";
import LoadMsg from "../LoadMsg/LoadMsg";
import EventDetails from "../EventDetails/EventDetails";
import ConfirmationPopup from "../ConfirmationPopup/ConfirmationPopup";
import { useNavigate } from "react-router-dom";
import { ErrorContext } from "../../Contexts/ErrorContext";
import AuthCalendarPopup from "../AuthCalendarPopup/AuthCalendarPopup";

function PlanDetailsPage() {
    const [isLoading, setIsLoading] = useState(true);
    const [event, setEvent] = useState({});
    const [hideCancelPlanPopup, setHideCancelPlanPopup] = useState(true);
    const [hideAuthPopup, setHideAuthPopup] = useState(true);
    const { event_id } = useParams();
    const { token, user_id } = useContext(UserContext);
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
                <button
                    className="danger"
                    onClick={() => {
                        setHideCancelPlanPopup(false);
                    }}
                >
                    Cancel Plan
                </button>
                <button
                    onClick={() => {
                        setHideAuthPopup(false);
                    }}
                >
                    Add to Calendar
                </button>
            </section>
            <ConfirmationPopup
                message="Are you sure you want to cancel this plan?"
                isHidden={hideCancelPlanPopup}
                setIsHidden={setHideCancelPlanPopup}
                func={cancelPlan}
                args={[token, user_id, event_id]}
            />
            <AuthCalendarPopup
                isHidden={hideAuthPopup}
                setIsHidden={setHideAuthPopup}
            />
        </main>
    );
}

export default PlanDetailsPage;
