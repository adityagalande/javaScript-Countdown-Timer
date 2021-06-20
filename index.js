let countdown;
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');


function timer(sec){
  clearInterval(countdown);
  const now = Date.now();
  const then = now + sec * 1000;
  displayTimeLeft(sec);
  displayEndTime(then);

  countdown = setInterval(() => {
    const secLeft = Math.round((then - Date.now()) / 1000);
    if(secLeft < 0){
      return;
      clearInterval(countdown);
    }
    displayTimeLeft(secLeft);
  }, 1000);
}

function displayTimeLeft(seconds) {
  const minute = Math.floor(seconds / 60);
  const remainderSeconds = seconds % 60;
  const display = `${minute}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
  document.title = display;
  timerDisplay.textContent = display;
}

function displayEndTime(timeStamp) {
  const end = new Date(timeStamp);
  const hour = end.getHours();
  const mins = end.getMinutes();

  endTime.textContent = `Be Back At ${hour > 12 ? hour - 12 : hour}:${mins < 10 ? '0' : ''}${mins}`;
}


function startTimer(){
  const seconds = parseInt(this.dataset.time);
  timer(seconds);
}

buttons.forEach(button => button.addEventListener('click', startTimer));

document.customForm.addEventListener('submit', function(e){
  e.preventDefault();
  const mins = this.minutes.value;
  console.log(mins);
  timer(mins * 60);
  this.reset();
});
