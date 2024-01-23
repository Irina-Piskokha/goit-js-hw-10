import flatpickr from 'flatpickr';
import iziToast from 'izitoast';

import 'flatpickr/dist/flatpickr.min.css';
import 'izitoast/dist/css/iziToast.min.css';

const refs = {
  dateTimePicker: document.querySelector('#datetime-picker'),
  btnStart: document.querySelector('[data-start]'),
  timer: document.querySelector('.timer'),
};

let intervalId = null;
let userSelectedDate;
refs.btnStart.setAttribute('disabled', '');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const currentDate = new Date();
    const delta = selectedDates[0] - currentDate;
    if (delta <= 0) {
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
        position: 'topRight',
        titleColor: 'white',
        color: '#ef4040',
        messageColor: 'white',
      });
      refs.btnStart.setAttribute('disabled', '');
      return;
    } else {
      refs.btnStart.removeAttribute('disabled');
      userSelectedDate = selectedDates[0];
    }
  },
};

flatpickr(refs.dateTimePicker, options);

refs.btnStart.addEventListener('click', onButtonClick);

function onButtonClick() {
  intervalId = setInterval(() => {
    let currentDate = new Date();
    const ms = userSelectedDate - currentDate;
    if (ms <= 0) {
      clearInterval(intervalId);
      return;
    }

    refs.btnStart.setAttribute('disabled', '');
    refs.dateTimePicker.setAttribute('disabled', '');
    const date = convertMs(ms);
    updateTextContent(date);
  }, 1000);
}

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

function updateTextContent(date) {
  Object.entries(date).forEach(([key, value], index) => {
    refs.timer.children[index].firstElementChild.textContent =
      addLeadingZero(value);
  });
}

function addLeadingZero(value) {
  return String(value).padStart(2, 0);
}
