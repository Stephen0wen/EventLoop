import "./LoadMsg.css";

function LoadMsg({ children, message }) {
    return (
        <section id="load-message-container">
            <h2 id="load-message">{message}</h2>
            <div id="indicator" />
            <p id="load-message-small">
                This may take up to a minute if no API requests have been made
                for a while as it is hosted for free...
            </p>
            {children}
        </section>
    );
}

export default LoadMsg;
