import { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../../Contexts/UserContext";
import { getPlan, patchEvent } from "../../apiRequests";
import { useNavigate } from "react-router-dom";
import LoadMsg from "../LoadMsg/LoadMsg";
import "./EditEventPage.css";
import EventForm from "../EventForm/EventForm";

function EditEventPage() {
    const [isLoading, setIsLoading] = useState(true);
    const [event, setEvent] = useState({});
    const [newEvent, setNewEvent] = useState({});
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
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const handleSubmit = () => {
        patchEvent(token, user_id, event_id, newEvent).then(() => {
            navigate(`/manage/${event_id}`);
        });
    };

    if (isLoading) {
        return (
            <main>
                <LoadMsg message="Loading Page..." />
            </main>
        );
    }

    return (
        <main>
            <EventForm
                event={event}
                setNewEvent={setNewEvent}
                formTitle="Edit Event"
                buttonText="Update"
                submitFunc={handleSubmit}
            />
        </main>
    );
}

export default EditEventPage;