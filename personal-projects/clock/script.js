const timeContainer = document.querySelector('time-container');
const days = document.querySelector('#days');
const hours = document.querySelector('#hours');
const minutes = document.querySelector('#minutes');
const seconds = document.querySelector('#seconds');
const date = new Date('12/25/2022');

function formatTime(time){
    const timeFormated = Math.floor(time);
    return time < 10 ? `0${timeFormated}` : timeFormated;
}


function getTime() {
    const time = new Date();
    const dateToCompare = new Date(date);
    const timeInMilliseconds = Math.abs(time - dateToCompare);
    const timeSeconds = timeInMilliseconds / 1000 % 60;
    const timeMinutes = timeInMilliseconds / 1000 / 60 % 60;
    const timeHours = timeInMilliseconds / 1000 / 60 / 60 % 24;
    const timeDays = timeInMilliseconds / 1000 / 60 / 60 / 24 % 365;
    seconds.textContent = formatTime(timeSeconds);
    minutes.textContent = formatTime(timeMinutes);
    hours.textContent = formatTime(timeHours);
    days.textContent = formatTime(timeDays);
}

getTime();

setInterval(getTime,1000);