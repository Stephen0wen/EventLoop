import { useEffect, useState, useContext } from "react";
import "./PlanDetailsPage.css";
import { useParams } from "react-router-dom";
import { UserContext } from "../../Contexts/UserContext";
import { getPlan } from "../../apiRequests";
import LoadMsg from "../LoadMsg/LoadMsg";
import EventDetails from "../EventDetails/EventDetails";
import ConfirmationPopup from "../ConfirmationPopup/ConfirmationPopup";
import { useNavigate } from "react-router-dom";

function PlanDetailsPage() {
    const [isLoading, setIsLoading] = useState(true);
    const [event, setEvent] = useState({});
    const [hideCancelPlanPopup, setHideCancelPlanPopup] = useState(true);
    const { event_id } = useParams();
    const { token, user_id } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        setIsLoading(true);
        getPlan(token, user_id, event_id)
            .then((apiEvent) => {
                if (apiEvent.is_user_attending) setEvent(apiEvent);
                else navigate(`/events/${event_id}`);
            })
            .then(() => {
                setIsLoading(false);
            });
    }, []);

    if (isLoading) {
        return <LoadMsg message="Loading Plan.." />;
    }

    return (
        <>
            <main id="plan-details-page" className="page">
                <EventDetails event={event} />
                <section aria-label="Plan Options" id="button-container">
                    <button
                        onClick={() => {
                            navigate("/plans");
                        }}
                    >
                        {"Back"}
                    </button>
                    <button
                        onClick={() => {
                            setHideCancelPlanPopup(false);
                        }}
                    >
                        Cancel Plan
                    </button>
                    <button>Add to Calendar</button>
                </section>
            </main>
            <ConfirmationPopup
                message="Are you sure you want to cancel this plan?"
                isHidden={hideCancelPlanPopup}
                setIsHidden={setHideCancelPlanPopup}
            />
        </>
    );
}

export default PlanDetailsPage;