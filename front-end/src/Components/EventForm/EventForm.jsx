import "./EventForm.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function EventForm({ event, setNewEvent, submitFunc, formTitle, buttonText }) {
    const navigate = useNavigate();
    const [isValidForm, setIsValidForm] = useState(false);
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
    const [validationErrors, setValidationErrors] = useState({});

    useEffect(() => {
        updateOutput();
        validateForm();
    }, []);

    const updateOutput = () => {
        setNewEvent({
            event_title: title,
            event_start: start,
            event_end: end,
            event_location: location,
            event_thumbnail: thumbnailURL,
            event_thumbnail_alt: thumbnailAlt,
            event_image: imageURL,
            event_image_alt: imageAlt,
            event_description_short: shortDescription,
            event_description_long: longDescription,
        });
    };

    const updateField = (setter, field) => (event) => {
        const value = event.target.value;
        setter(value);
        validateField(field, value, true);
        validateForm();
        updateOutput();
    };

    const validateField = (field, value, displayChanges) => {
        const errors = { ...validationErrors };

        // Validation rules
        if (!value) {
            errors[field] = "Cannot be left blank.";
        } else {
            delete errors[field];
        }

        if (field === "start") {
            const startDate = new Date(value);
            if (Date.parse(startDate) + 3600000 < Date.now()) {
                errors[field] = "Must be at least one hour in the future.";
            } else {
                delete errors[field];
            }
        }

        if (field === "end") {
            const startDate = new Date(start);
            const endDate = new Date(value);
            if (Date.parse(endDate) <= Date.parse(startDate)) {
                errors[field] = "Must be after the start of the event.";
            } else {
                delete errors[field];
            }
        }

        if (field === "thumbnailURL" || field === "imageURL") {
            const urlPattern = /^(https?:\/\/)[^\s/$.?#].[^\s]*$/;
            if (!urlPattern.test(value)) {
                errors[field] = "Please enter a valid URL.";
            } else {
                delete errors[field];
            }
        }

        if (displayChanges) {
            setValidationErrors(errors);
        }

        return Object.keys(errors).length ? false : true;
    };

    const validateForm = () => {
        const fields = [
            title,
            start,
            end,
            location,
            thumbnailURL,
            thumbnailAlt,
            imageURL,
            imageAlt,
            shortDescription,
            longDescription,
        ];

        const isValid = fields.every((field, index) => {
            return validateField(Object.keys(fields)[index], field, false);
        });

        setIsValidForm(isValid);
    };

    return (
        <form id="edit-event-form">
            <h2>{formTitle}</h2>
            <label>
                <p>Title:</p>
                <input
                    id="title"
                    placeholder={event.event_title}
                    onChange={updateField(setTitle, "title")}
                    onBlur={updateField(setTitle, "title")}
                    value={title}
                />
                {validationErrors.title ? (
                    <p className="warning">{validationErrors.title}</p>
                ) : null}
            </label>
            <label>
                <p>Event Start:</p>
                <input
                    id="start"
                    type="datetime-local"
                    placeholder={new Date(start).toJSON().substring(0, 16)}
                    onChange={updateField(setStart, "start")}
                    onBlur={updateField(setStart, "start")}
                    value={new Date(start).toJSON().substring(0, 16)}
                />
                {validationErrors.start ? (
                    <p className="warning">{validationErrors.start}</p>
                ) : null}
            </label>
            <label>
                <p>Event End:</p>
                <input
                    id="end"
                    type="datetime-local"
                    placeholder={new Date(end).toJSON().substring(0, 16)}
                    onChange={updateField(setEnd, "end")}
                    onBlur={updateField(setEnd, "end")}
                    value={new Date(end).toJSON().substring(0, 16)}
                />
                {validationErrors.end ? (
                    <p className="warning">{validationErrors.end}</p>
                ) : null}
            </label>
            <label>
                <p>Location:</p>
                <input
                    id="location"
                    placeholder={event.event_location}
                    onChange={updateField(setLocation, "location")}
                    onBlur={updateField(setLocation, "location")}
                    value={location}
                />
                {validationErrors.location ? (
                    <p className="warning">{validationErrors.location}</p>
                ) : null}
            </label>
            <label>
                <p>Thumbnail URL:</p>
                <input
                    id="thumbnail-url"
                    placeholder={event.event_thumbnail}
                    onChange={updateField(setThumbnailURL, "thumbnailURL")}
                    onBlur={updateField(setThumbnailURL, "thumbnailURL")}
                    value={thumbnailURL}
                />
                {validationErrors.thumbnailURL ? (
                    <p className="warning">{validationErrors.thumbnailURL}</p>
                ) : null}
            </label>
            <label>
                <p>Thumbnail Alt Text:</p>
                <input
                    id="thumbnail-alt"
                    placeholder={event.event_thumbnail_alt}
                    onChange={updateField(setThumbnailAlt, "thumbnailAlt")}
                    onBlur={updateField(setThumbnailAlt, "thumbnailAlt")}
                    value={thumbnailAlt}
                />
                {validationErrors.thumbnailAlt ? (
                    <p className="warning">{validationErrors.thumbnailAlt}</p>
                ) : null}
            </label>
            <label>
                <p>Image URL:</p>
                <input
                    id="image-url"
                    placeholder={event.event_image}
                    onChange={updateField(setImageURL, "imageURL")}
                    onBlur={updateField(setImageURL, "imageURL")}
                    value={imageURL}
                />
                {validationErrors.imageURL ? (
                    <p className="warning">{validationErrors.imageURL}</p>
                ) : null}
            </label>
            <label>
                <p>Image Alt Text:</p>
                <input
                    id="image-alt"
                    placeholder={event.event_image_alt}
                    onChange={updateField(setImageAlt, "imageAlt")}
                    onBlur={updateField(setImageAlt, "imageAlt")}
                    value={imageAlt}
                />
            </label>
            <label>
                <p>Short Description:</p>
                <textarea
                    id="short-description"
                    placeholder={event.event_description_short}
                    onChange={updateField(
                        setShortDescription,
                        "shortDescription"
                    )}
                    onBlur={updateField(
                        setShortDescription,
                        "shortDescription"
                    )}
                    value={shortDescription}
                />
            </label>
            <label>
                <p>Long Description:</p>
                <textarea
                    id="long-description"
                    placeholder={event.event_description_long}
                    onChange={updateField(
                        setLongDescription,
                        "longDescription"
                    )}
                    onBlur={updateField(setLongDescription, "longDescription")}
                    value={longDescription}
                />
            </label>
            <div id="button-container">
                <button
                    type="button"
                    onClick={() => {
                        navigate(-1);
                    }}
                >
                    Back
                </button>
                <button
                    type="button"
                    className={isValidForm ? "" : "disabled"}
                    disabled={!isValidForm}
                    onClick={() => {
                        updateOutput();
                        setTimeout(() => {
                            submitFunc();
                        }, 1000);
                    }}
                >
                    {buttonText}
                </button>
            </div>
        </form>
    );
}

export default EventForm;
