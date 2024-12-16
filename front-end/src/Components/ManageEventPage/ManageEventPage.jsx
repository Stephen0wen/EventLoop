import "./ManageEventPage.css";
import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../../Contexts/UserContext";
import LoadMsg from "../LoadMsg/LoadMsg";
import EventDetails from "../EventDetails/EventDetails";
import ConfirmationPopup from "../ConfirmationPopup/ConfirmationPopup";
import { useNavigate } from "react-router-dom";
import { deleteEvent, getPlan } from "../../apiRequests";
import { ErrorContext } from "../../Contexts/ErrorContext";

function ManageEventPage() {
    const [isLoading, setIsLoading] = useState(true);
    const [event, setEvent] = useState({});
    const [hideCancelEventPopup, setHideCancelEventPopup] = useState(true);
    const { event_id } = useParams();
    const { token, user_id } = useContext(UserContext);
    const { setError } = useContext(ErrorContext);
    const navigate = useNavigate();

    useEffect(() => {
        setIsLoading(true);
        if (token && user_id) {
            getPlan(token, user_id, event_id)
                .then((apiEvent) => {
                    if (apiEvent.event_created_by === user_id)
                        setEvent(apiEvent);
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

    const cancelEvent = () => {
        deleteEvent(token, user_id, event_id)
            .then(() => {
                navigate("/manage");
            })
            .catch((error) => {
                setError(error);
            });
    };

    if (isLoading) {
        return (
            <main>
                <LoadMsg message="Loading your event.." />
            </main>
        );
    }

    return (
        <main id="manage-event-page">
            <EventDetails event={event} />
            <section
                aria-label="Event Management Options"
                id="button-container"
            >
                <button
                    onClick={() => {
                        navigate("/manage");
                    }}
                >
                    Back
                </button>
                <button
                    className="danger"
                    onClick={() => {
                        setHideCancelEventPopup(false);
                    }}
                >
                    Cancel Event
                </button>
                <button
                    onClick={() => {
                        navigate(`/manage/${event_id}/edit`);
                    }}
                >
                    Edit Event
                </button>
            </section>
            <ConfirmationPopup
                message={`Are you sure you want to cancel this event? It will be permenantly deleted along with all associated attendance data!`}
                isHidden={hideCancelEventPopup}
                setIsHidden={setHideCancelEventPopup}
                func={cancelEvent}
                args={[token, user_id, event_id]}
            />
        </main>
    );
}

export default ManageEventPage;
