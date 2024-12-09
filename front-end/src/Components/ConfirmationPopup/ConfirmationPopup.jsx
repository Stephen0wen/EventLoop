import "./ConfirmationPopup.css";

export default function ConfirmationPopup({
    isHidden,
    setIsHidden,
    message,
    func,
    args,
}) {
    return (
        <main id="grey-zone" className={isHidden ? "hidden" : ""}>
            <section id="confirmation-popup">
                <p id="confirmation-message">{message}</p>
                <div id="confirmation-button-container">
                    <button
                        onClick={() => {
                            setIsHidden(true);
                        }}
                    >
                        Back
                    </button>
                    <button
                        className="danger"
                        onClick={() => {
                            func(...args);
                        }}
                    >
                        Continue
                    </button>
                </div>
            </section>
        </main>
    );
}
