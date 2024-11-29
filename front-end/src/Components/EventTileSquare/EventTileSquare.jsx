import "./EventTileSquare.css";

function EventTileSquare({ event }) {
    console.log(event.event_thumbnail);
    return (
        <div className="event-tile-square">
            <h2>{event.event_title}</h2>
            <img src={event.event_thumbnail} />
            <p>{event.event_description_short}</p>
        </div>
    );
}

export default EventTileSquare;
