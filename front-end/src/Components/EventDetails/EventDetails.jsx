import "./EventDetails.css";

function EventDetails({ event }) {
    return (
        <section aria-label="event-details" id="event-details">
            <h2>{event.event_title}</h2>
            <img src={event.event_image} alt={event.event_image_alt} />
            <p id="description">{event.event_description_long}</p>
            <div id="date-container">
                <p>
                    Date:{" "}
                    <span>
                        {new Date(event.event_start).toLocaleDateString(
                            "en-GB"
                        )}
                    </span>
                </p>
                <p>
                    Time:{" "}
                    <span>
                        {new Date(event.event_start).toLocaleTimeString(
                            "en-US"
                        )}
                    </span>
                </p>
            </div>
        </section>
    );
}

export default EventDetails;
