import "./EventTileWide.css";
import { Link } from "react-router-dom";

function EventTileWide({ event }) {
    return (
        <Link to={`/plans/${event.event_id}`} className="event-tile-wide">
            <img src={event.event_thumbnail} alt={event.event_thumbnail_alt} />
            <div className="event-text-container">
                <h2>{event.event_title}</h2>
                <div className="date-time-container">
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
            </div>
        </Link>
    );
}

export default EventTileWide;
