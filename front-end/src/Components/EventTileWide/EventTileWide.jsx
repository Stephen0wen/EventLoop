import "./EventTileWide.css";
import { Link } from "react-router-dom";

function EventTileWide({ destination, event }) {
    return (
        <Link
            to={`/${destination}/${event.event_id}`}
            className="event-tile-wide"
        >
            <img src={event.event_thumbnail} alt={event.event_thumbnail_alt} />
            <div className="event-text-container">
                <h2>{event.event_title}</h2>
                <div className="date-time-container">
                    <p>
                        {new Date(event.event_start).toLocaleDateString(
                            "en-GB"
                        )}
                    </p>
                    <p>
                        {new Date(event.event_start)
                            .toLocaleTimeString("en-GB")
                            .substring(0, 5)}
                    </p>
                </div>
            </div>
        </Link>
    );
}

export default EventTileWide;
