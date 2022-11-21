function formatTime(milisecond) {
    let date = new Date(Number(milisecond));
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let hour = date.getHours();
    let minute = date.getMinutes();
    return `${hour}:${minute} ${day}/${month}/${year}`;
}

export default formatTime;
