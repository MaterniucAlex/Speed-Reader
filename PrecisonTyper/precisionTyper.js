let header = document.getElementById("whatToType")
let streakShower = document.getElementById("streak")
let timeAverageShower = document.getElementById("averageTime")
let inputField = document.getElementById("input");
let focusedElement = document.activeElement;

let Letters = document.getElementById("Letters");
let Words = document.getElementById("Words");
let Sentences = document.getElementById("Sentences");

let modes = ["Letters", "Words", "Sentences"]
let chosenMode = modes[0];

let currentStreak = 0;
let timeSumMS = 0;
let timeAverage = 0;

let firstInputDone = false;
let intervalId;
let waitBufferTime = 8
let waitBuffer = 0;

document.getElementById("menuButton").onclick = () => {
  console.log("ok");
  let navUL = document.querySelector(".pagesList");
  if (navUL.classList.contains("showNav"))
    navUL.classList.remove("showNav")
  else
    navUL.classList.add("showNav")
}

let characters = "abcdefghijklmnopqrstuvwxyz"

Letters.onclick = () => {
  chosenMode = modes[0];
  resumeChecks();
}
Words.onclick = () => {
  chosenMode = modes[1];
  resumeChecks();
}
Sentences.onclick = () => {
  chosenMode = modes[2];
  resumeChecks();
}

function blurButtons()
{
  header.classList.remove("blur");
  header.style.pointerEvents = "auto";
  streakShower.classList.remove("blur");
  streakShower.style.pointerEvents = "auto";
  timeAverageShower.classList.remove("blur");
  timeAverageShower.style.pointerEvents = "auto";

  Letters.classList.add("blur");
  Letters.style.pointerEvents = "none";
  Words.classList.add("blur");
  Words.style.pointerEvents = "none";
  Sentences.classList.add("blur");
  Sentences.style.pointerEvents = "none";
}

function unblurButtons()
{
  header.classList.add("blur");
  header.style.pointerEvents = "none";
  streakShower.classList.add("blur");
  streakShower.style.pointerEvents = "none";
  timeAverageShower.classList.add("blur");
  timeAverageShower.style.pointerEvents = "none";

  Letters.classList.remove("blur");
  Letters.style.pointerEvents = "auto";
  Words.classList.remove("blur");
  Words.style.pointerEvents = "auto";
  Sentences.classList.remove("blur");
  Sentences.style.pointerEvents = "auto";
}

let timerInterval = setInterval(() => {
  timeSumMS += 10;
}, 10);

function resumeChecks()
{

  inputField.value = "";
  inputField.focus();
  firstInputDone = false;
  timeSumMS = 0;
  streak = 0;

  header.innerText = ""
  waitBuffer = 0;

  blurButtons();

  intervalId = setInterval(() => {

    focusedElement = document.activeElement;

    if (focusedElement == inputField)
    {

      switch(chosenMode)
      {
        default:
        case modes[0]:

          if (waitBuffer > 0)
          {
            waitBuffer -= 1;
            break;
          }

          if (waitBuffer == 0)
          {
            header.style.color = "white";
            chosenLetter = characters[Math.floor(Math.random() * characters.length)]
            header.innerText = chosenLetter;
            waitBuffer = -1;
          }

          if (input.value != "" && waitBuffer <= 0) // input detected
          {

            if (!firstInputDone)
            {
              timeSumMS = 0;
              currentStreak = 0;
              firstInputDone = true;
            }

            let buffersTimeSum = waitBufferTime * (1000 / 60) * currentStreak;
            timeAverage = (timeSumMS - buffersTimeSum) / Math.max(currentStreak, 1) / 1000;

            waitBuffer = waitBufferTime;

            streakShower.innerText = "Streak: " + currentStreak;
            timeAverageShower.innerText = "Average: " + timeAverage.toFixed(2) + 's';

            if (input.value == header.innerText) //good input
            {
              header.style.color = "lime"
              currentStreak++;
            }
            else // bad input
            {
              header.style.color = "red"
              currentStreak = 0;
              timeSumMS = 0;
            }
            input.value = "";
          }

          break;
        case modes[1]:
          break;
        case modes[2]:
          break;
      }
    }
    else
    {
      unblurButtons();
      clearInterval(intervalId);
    }
  }, 1000 / 60); //ms
}

inputField.focus();
resumeChecks();
