// Create Title
let title = document.createElement('h1');
title.innerText = 'Javascript Alarm Clock';
document.body.prepend(title);

// Create Clock
const hands = ['hour-hand', 'min-hand', 'second-hand'];
const clock_wrap = document.querySelector('.clock-wrap');
let clock = createElement('div', 'clock');
clock.appendChild(createElement('div', 'circle'));
clock_wrap.appendChild(clock);
for (var i = 0; i < hands.length; i++) {
  createHands(i);
}

// Create Current Time
let current_hour = createElement('div', 'current-hour');
let current_min = createElement('div', 'current-min');
let current_meridiem = createElement('div', 'current-meridiem');
let current_time = createElement('div', 'current-time');
current_time.append(current_hour, ':', current_min, current_meridiem);

// Create Timer and Switch
let alarm_wrap = createElement('div', 'alarm-wrap');
let switcher = createElement('label', 'switch');
let input = createElement('input', 'checker');
let slider = createElement('span', 'slider-round');
input.setAttribute('type', 'checkbox');
switcher.append(input, slider);
alarm_wrap.append(buildAlarm(), switcher);

// Add Alarm Wrap and Current Time before Clock Wrap
document.body.insertBefore(current_time, clock_wrap);
document.body.insertBefore(alarm_wrap, current_time);

// Create Elements
function createElement(element, class_name) {
  let create_element = document.createElement(element);
  create_element.className = class_name;
  return create_element;
}

// Create Hands of Clock
function createHands(num) {
  clock.appendChild(createElement('div', 'hand' + ' ' + hands[num]));
}

// Check if Checker is ON
let alarm_time = null;
let alarm_hour = document.querySelector('.timer-hour');
let alarm_minute = document.querySelector('.timer-minute');
let alarm_meridiem = document.querySelector('.timer-meridiem');
console.log(alarm_meridiem.value);
input.addEventListener('change', function() {
  alarm_time = this.checked ? alarm_hour.value + ':' + alarm_minute.value : null;
});

// Onchange in Select Elements
alarm_hour.addEventListener('change', function() {
  alarm_time = input.checked ? alarm_hour.value + ':' + alarm_minute.value : null;
});
alarm_minute.addEventListener('change', function() {
  alarm_time = input.checked ? alarm_hour.value + ':' + alarm_minute.value : null;
});
alarm_meridiem.addEventListener('change', function() {
  alarm_meridiem = input.checked ? alarm_meridiem.value : null;
});

// Get Date, Check Time for the Alarm
function ShowDate() {
  const time = new Date();
  var seconds = time.getSeconds();
  const secondsHand = document.querySelector('.second-hand');
  var minutes = time.getMinutes();
  const minutesHand = document.querySelector('.min-hand');
  var hours = time.getHours();
  const hoursHand = document.querySelector('.hour-hand');

  const secondDegrees = ((seconds * 360) / 60) + 90;
  secondsHand.style.transform = `rotate(${secondDegrees}deg)`;

  const minuteDegrees = ((minutes * 360) / 60) + 90;
  minutesHand.style.transform = `rotate(${minuteDegrees}deg)`;

  const hourDegrees = ((hours * 360) / 12) + 90;
  hoursHand.style.transform = `rotate(${hourDegrees}deg)`;

  var currentTime = ( hours > 12 ? hours - 12 : hours == 0 ? '12' : hours ).toString().padStart(2, "0") + ':' + minutes.toString().padStart(2, "0");
  current_hour.innerText = ( hours > 12 ? hours - 12 : hours == 0 ? '12' : hours ).toString().padStart(2, "0");
  current_min.innerText = minutes < 10 ? `0${minutes}` : minutes;
  current_meridiem.innerText = hours >= 12 ? 'PM' : 'AM';

  // Check Alarm Time
  if (seconds == 0) {
    if (currentTime == alarm_time && current_meridiem.innerText == alarm_meridiem.value) {
      clock_wrap.classList.add('shake');
      let audio = new Audio('rooster.wav');
      let alarm_sound = setInterval(function(){
        audio.play();
      }, 2000 );
      setTimeout(function(){
        clock_wrap.classList.remove('shake');
        clearInterval(alarm_sound);
      }, 10000 );
    }
  }
}

// Return numbers with '0'
function numberToOption(number) {
	const padded = number.toString().padStart(2, "0");
	return `<option value="${padded}">${padded}</option>`;
}

// Create Alarm
function buildAlarm() {
  let timer = createElement('div', 'timer');
	const hourOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(numberToOption);
	const minuteOptions = getMinutes().map(numberToOption);

	timer.innerHTML = `
		<select class="timer-hour">
			${hourOptions.join("")}
		</select>
		<select class="timer-minute">
			${minuteOptions.join("")}
		</select>
		<select class="timer-meridiem">
			<option value="AM">AM</option>
			<option value="PM">PM</option>
		</select>
	`;

  return timer;
}

function getMinutes() {
  var array = [];
  for(var i = 0; i <= 59; i++){
    array.push(i);
  }
  return array;
}

ShowDate();
setInterval(ShowDate, 1000);