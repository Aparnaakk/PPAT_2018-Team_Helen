/*
 *  Event Handlers
 */
$(function onDocReady() {
    const eventInfo = Cookies.getJSON('eventInfo');

    // setup a simple lookup for day and month
    const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];

    // transform duration and date to be more readable
    const duration = eventInfo.duration ? `${eventInfo.duration} minutes` : '';
    const date = new Date(eventInfo.date);
    const dateFormatted = `${days[date.getDay()]}, ${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`
    
    // populate the event information
    $("#eventName").html(eventInfo.eventName);
    $("#date").html(dateFormatted);
    $("#time").html(eventInfo.startTime);
    $("#location").html(eventInfo.location);
    $("#category").html(eventInfo.category);
    $("#duration").html(duration);
});