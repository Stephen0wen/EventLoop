import "./EventForm.css";
import { useState } from "react";

function EventForm({ event }) {
    const [title, setTitle] = useState(event.event_title);
    const [start, setStart] = useState(event.event_start);
    const [end, setEnd] = useState(event.event_end);
    const [location, setLocation] = useState(event.event_location);
    const [thumbnailURL, setThumbnailURL] = useState(event.event_thumbnail);
    const [thumbnailAlt, setThumbnailAlt] = useState(event.event_thumbnail_alt);
    const [imageURL, setImageURL] = useState(event.event_image);
    const [imageAlt, setImageAlt] = useState(event.event_image_alt);
    const [shortDescription, setShortDescription] = useState(
        event.event_description_short
    );
    const [longDescription, setLongDescription] = useState(
        event.event_description_long
    );

    const updateField = (setter) => (event) => setter(event.target.value);

    return (
        <form id="edit-event-form">
            <h2>Edit Event</h2>
            <label>
                <p>Title:</p>
                <input
                    id="title"
                    placeholder={event.event_title}
                    onChange={updateField(setTitle)}
                    value={title}
                />
            </label>
            <label>
                <p>Event Start:</p>
                <input
                    id="start"
                    type="datetime-local"
                    placeholder={event.event_start}
                    onChange={updateField(setStart)}
                    value={start}
                />
            </label>
            <label>
                <p>Event End:</p>
                <input
                    id="end"
                    type="datetime-local"
                    placeholder={event.event_end}
                    onChange={updateField(setEnd)}
                    value={end}
                />
            </label>
            <label>
                <p>Location:</p>
                <input
                    id="location"
                    placeholder={event.event_location}
                    onChange={updateField(setLocation)}
                    value={location}
                />
            </label>
            <label>
                <p>Thumbnail URL:</p>
                <input
                    id="thumbnail-url"
                    placeholder={event.event_thumbnail}
                    onChange={updateField(setThumbnailURL)}
                    value={thumbnailURL}
                />
            </label>
            <label>
                <p>Thumbnail Alt Text:</p>
                <input
                    id="thumbnail-alt"
                    placeholder={event.event_thumbnail_alt}
                    onChange={updateField(setThumbnailAlt)}
                    value={thumbnailAlt}
                />
            </label>
            <label>
                <p>Image URL:</p>
                <input
                    id="image-url"
                    placeholder={event.event_image}
                    onChange={updateField(setImageURL)}
                    value={imageURL}
                />
            </label>
            <label>
                <p>Image Alt Text:</p>
                <input
                    id="image-alt"
                    placeholder={event.event_image_alt}
                    onChange={updateField(setImageAlt)}
                    value={imageAlt}
                />
            </label>
            <label>
                <p>Short Description:</p>
                <textarea
                    id="short-description"
                    placeholder={event.event_description_short}
                    onChange={updateField(setShortDescription)}
                    value={shortDescription}
                />
            </label>
            <label>
                <p>Long Description:</p>
                <textarea
                    id="long-description"
                    placeholder={event.event_description_long}
                    onChange={updateField(setLongDescription)}
                    value={longDescription}
                />
            </label>
        </form>
    );
}

export default EventForm;
