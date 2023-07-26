function formatDate(date) {
    if (!date) return 'N/A';

    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    const dateStringFormatted = date.toISOString().split('T')[0].replace(/-/g, '/');

    const hour = date.getHours();
    const minute = date.getMinutes();
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
    const timeString = `${formattedHour}:${minute.toString().padStart(2, '0')} ${ampm}`;

    return `${dateStringFormatted} - ${timeString}`;
};

module.exports = { formatDate };
