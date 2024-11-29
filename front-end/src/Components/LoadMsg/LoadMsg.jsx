import "./LoadMsg.css";

function LoadMsg({ message }) {
    return (
        <section id="load-message-container">
            <h3 id="load-message">{message}</h3>
            <div id="indicator" />
            <p id="load-message-small">
                This may take up to a minute if no API requests have been made
                for a while it is hosted for free...
            </p>
        </section>
    );
}

export default LoadMsg;
