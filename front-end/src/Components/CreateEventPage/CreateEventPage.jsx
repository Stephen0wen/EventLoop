import "./CreateEventPage.css";
import { useState, useContext, useEffect } from "react";
import { UserContext } from "../../Contexts/UserContext";
import { postEvent } from "../../apiRequests";
import { useNavigate } from "react-router-dom";
import EventForm from "../EventForm/EventForm";
import { ErrorContext } from "../../Contexts/ErrorContext";
import LoadMsg from "../LoadMsg/LoadMsg";

function CreateEventPage() {
    const [newEvent, setNewEvent] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const { setError } = useContext(ErrorContext);
    const navigate = useNavigate();
    const { token, user_id, user_is_staff } = useContext(UserContext);
    const [event, setEvent] = useState({
        event_title: "",
        event_start: new Date(Date.now()).toUTCString(),
        event_end: new Date(Date.now()).toUTCString(),
        event_location: "",
        event_thumbnail: "",
        event_thumbnail_alt: "",
        event_image: "",
        event_image_alt: "",
        event_description_short: "",
        event_description_long: "",
    });

    useEffect(() => {
        setIsLoading(true);
        if (token && user_id && !user_is_staff) {
            navigate("/");
        }
        if (token && user_id) {
            setIsLoading(false);
        }
    }, [token, user_id]);

    const handleSubmit = () => {
        postEvent(token, user_id, newEvent)
            .then(() => {
                navigate("/manage");
            })
            .catch((apiError) => {
                setError(apiError);
            });
    };

    if (isLoading) {
        return <LoadMsg message="Loading Page..." />;
    }

    return (
        <main>
            <EventForm
                event={event}
                setNewEvent={setNewEvent}
                formTitle={"Create Event"}
                buttonText={"Create"}
                submitFunc={handleSubmit}
            />
        </main>
    );
}

export default CreateEventPage;
