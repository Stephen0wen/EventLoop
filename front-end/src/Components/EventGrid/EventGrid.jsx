import EventTileSquare from "../EventTileSquare/EventTileSquare";
import "./EventGrid.css";

function EventGrid({ events }) {
    return (
        <div id="event-grid">
            {events.map((event) => {
                return <EventTileSquare key={event.event_id} event={event} />;
            })}
        </div>
    );
}

export default EventGrid;
