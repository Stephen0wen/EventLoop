import "./OpenCalendarPopup.css";

export default function OpenCalendarPopup({
    isHidden,
    setIsHidden,
    calendarLink,
}) {
    return (
        <main id="grey-zone" className={isHidden ? "hidden" : ""}>
            <section id="open-calendar-popup">
                <p id="open-calendar-message">
                    {" "}
                    {
                        "This event has been added to your Google Calendar. Would you like to view this event in your Calendar now? (Opens new tab)"
                    }
                </p>
                <div id="open-calendar-button-container">
                    <button
                        onClick={() => {
                            setIsHidden(true);
                        }}
                    >
                        No
                    </button>
                    <button
                        onClick={() => {
                            window.open(calendarLink, "_blank");
                            setIsHidden(true);
                        }}
                    >
                        Yes
                    </button>
                </div>
            </section>
        </main>
    );
}
