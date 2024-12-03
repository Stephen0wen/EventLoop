import "./EventTileSquare.css";
import { Link } from "react-router-dom";

function EventTileSquare({ event }) {
    return (
        <Link to={`/events/${event.event_id}`} className="event-tile-square">
            <h2>{event.event_title}</h2>
            <img src={event.event_thumbnail} alt={event.event_thumbnail_alt} />
            <p>{event.event_description_short}</p>
        </Link>
    );
}

export default EventTileSquare;
