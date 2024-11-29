import { useEffect, useState } from "react";
import "./PublicEventPage.css";
import { useParams } from "react-router-dom";
import { getEvent } from "../../apiRequests";
import LoadMsg from "../LoadMsg/LoadMsg";
import EventDetails from "../EventDetails/EventDetails";

function PublicEventPage() {
    const [isLoading, setIsLoading] = useState(true);
    const [event, setEvent] = useState({});
    const { event_id } = useParams();

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
        return <LoadMsg msg="Loading Event.." />;
    }

    return (
        <section id="public-event-page" className="page">
            <EventDetails event={event} />
        </section>
    );
}

export default PublicEventPage;
