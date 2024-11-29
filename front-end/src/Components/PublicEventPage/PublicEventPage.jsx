import { useEffect, useState } from "react";
import "./PublicEventPage.css";
import { useParams } from "react-router-dom";
import { getEvent } from "../../apiRequests";
import LoadMsg from "../LoadMsg/LoadMsg";
import EventDetails from "../EventDetails/EventDetails";
import { useNavigate } from "react-router-dom";

function PublicEventPage() {
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
        return <LoadMsg message="Loading Event.." />;
    }

    return (
        <section id="public-event-page" className="page">
            <EventDetails event={event} />
            <div id="button-container">
                <button
                    onClick={() => {
                        navigate("/");
                    }}
                >
                    {"<-- Back <--"}
                </button>
                <button>Log In</button>
            </div>
        </section>
    );
}

export default PublicEventPage;
