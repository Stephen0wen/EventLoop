import EventTileWide from "../EventTileWide/EventTileWide";
import "./EventList.css";

function EventList({ events }) {
    return (
        <div id="event-list">
            {events.map((event) => {
                return <EventTileWide key={event.event_id} event={event} />;
            })}
        </div>
    );
}

export default EventList;
