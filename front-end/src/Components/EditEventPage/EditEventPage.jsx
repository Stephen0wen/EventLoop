import { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../../Contexts/UserContext";
import { getPlan } from "../../apiRequests";
import { useNavigate } from "react-router-dom";
import LoadMsg from "../LoadMsg/LoadMsg";
import "./EditEventPage.css";
import EventForm from "../EventForm/EventForm";

function EditEventForm() {
    const [isLoading, setIsLoading] = useState(true);
    const [event, setEvent] = useState({});
    const { event_id } = useParams();
    const navigate = useNavigate();
    const { token, user_id, user_is_staff } = useContext(UserContext);

    useEffect(() => {
        setIsLoading(true);
        getPlan(token, user_id, event_id)
            .then((apiEvent) => {
                if (apiEvent.event_created_by === user_id) setEvent(apiEvent);
                else navigate(`/events/${event_id}`);
            })
            .then(() => {
                setIsLoading(false);
            });
    }, []);

    if (isLoading) {
        return (
            <main>
                <LoadMsg message="Loading Page..." />
            </main>
        );
    }

    return (
        <main>
            <EventForm event={event} />
        </main>
    );
}

export default EditEventForm;
