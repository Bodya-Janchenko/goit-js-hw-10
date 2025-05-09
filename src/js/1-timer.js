import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const inputEl = document.querySelector('#datetime-picker');
const buttonEl = document.querySelector('button');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');

buttonEl.setAttribute('disabled', true);

let userSelectedDate = null;
let timerId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
    console.log('Обрана дата:', userSelectedDate);

    if (userSelectedDate <= new Date()) {
      window.alert('Please choose a date in the future');
      buttonEl.setAttribute('disabled', true);
    } else {
      buttonEl.removeAttribute('disabled');
    }
  },
};

flatpickr(inputEl, options);

buttonEl.addEventListener('click', () => {
  buttonEl.setAttribute('disabled', true);
  inputEl.setAttribute('disabled', true);
  function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
  }

  function zeroWriter(value) {
    return String(value).padStart(2, '0');
  }

  timerId = setInterval(() => {
    let needWaitTime = userSelectedDate - Date.now();

    if (needWaitTime <= 0) {
      clearInterval(timerId);
      inputEl.removeAttribute('disabled');
    }
    convertMs(needWaitTime);
    const { days, hours, minutes, seconds } = convertMs(needWaitTime);
    daysEl.textContent = zeroWriter(days);
    hoursEl.textContent = zeroWriter(hours);
    minutesEl.textContent = zeroWriter(minutes);
    secondsEl.textContent = zeroWriter(seconds);
  }, 1000);
});
