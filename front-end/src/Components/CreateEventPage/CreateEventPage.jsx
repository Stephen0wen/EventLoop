import "./CreateEventPage.css";
import { useState, useContext } from "react";
import { UserContext } from "../../Contexts/UserContext";
import { patchEvent, postEvent } from "../../apiRequests";
import { useNavigate } from "react-router-dom";
import EventForm from "../EventForm/EventForm";

function CreateEventPage() {
    const [newEvent, setNewEvent] = useState({});
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

    const handleSubmit = () => {
        postEvent(token, user_id, newEvent).then(() => {
            navigate("/manage");
        });
    };

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
