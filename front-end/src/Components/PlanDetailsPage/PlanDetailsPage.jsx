import { useEffect, useState } from "react";
import "./PlanDetailsPage.css";
import { useParams } from "react-router-dom";
import { getEvent } from "../../apiRequests";
import LoadMsg from "../LoadMsg/LoadMsg";
import EventDetails from "../EventDetails/EventDetails";
import { useNavigate } from "react-router-dom";

function PlanDetailsPage() {
    const [isLoading, setIsLoading] = useState(true);
    const [event, setEvent] = useState({});
    const { event_id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        setIsLoading(true);
        getEvent(event_id)
            .then((apiEvent) => {
                setEvent(apiEvent);
            })
            .then(() => {
                setIsLoading(false);
            });
    }, []);

    if (isLoading) {
        return <LoadMsg message="Loading Plan.." />;
    }

    return (
        <main id="plan-details-page" className="page">
            <EventDetails event={event} />
            <section aria-label="Plan Options" id="button-container">
                <button
                    onClick={() => {
                        navigate("/plans");
                    }}
                >
                    {"<-- Back <--"}
                </button>
            </section>
        </main>
    );
}

export default PlanDetailsPage;
