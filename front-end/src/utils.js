export function getEventURL(event) {
    let URL = "https://calendar.google.com/calendar/u/0/r/eventedit";

    URL += `?text=${encodeURIComponent(event.event_title)}`;

    const getDateStr = (date) => {
        const forceTwoDigits = (number) => {
            if (number < 10) {
                return `0${number}`;
            } else {
                return `${number}`;
            }
        };
        const month = forceTwoDigits(date.getUTCMonth() + 1);
        const day = forceTwoDigits(date.getUTCDate());
        const hour = forceTwoDigits(date.getUTCHours());
        const minute = forceTwoDigits(date.getUTCMinutes());

        return `${date.getUTCFullYear()}${month}${day}T${hour}${minute}00Z`;
    };

    const startDate = new Date(event.event_start);
    const startStr = getDateStr(startDate);

    const endDate = new Date(event.event_end);
    const endStr = getDateStr(endDate);

    URL += `&dates=${startStr}/${endStr}`;

    URL += `&details=${encodeURIComponent(event.event_description_long)}`;

    URL += `&location=${encodeURIComponent(event.event_location)}`;

    return URL;
}
