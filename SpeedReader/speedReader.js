document.getElementById("menuButton").onclick = () => {
  console.log("ok");
  let navUL = document.querySelector(".pagesList");
  if (navUL.classList.contains("showNav"))
    navUL.classList.remove("showNav")
  else
    navUL.classList.add("showNav")
}

let intervalId;

function startDisplayingWords()
{
  clearInterval(intervalId);
  let wordsPerMinute = Number(document.getElementById("WPM").value);
  let numberOfWords = Number(document.getElementById("WOD").value);

  let word = 0;
  let text = document.getElementById("textInput").value.split(/\s+/).filter((word) => word.length > 0);
  let wordCount = text.length;
  if (numberOfWords > wordCount)
    numberOfWords = 1;
  let textToBeRendered = "";

  let initialPrint = false;
  intervalId = setInterval(() => {

    if (!initialPrint)
    {
      document.getElementById("readingWords").innerText = "\n";
      initialPrint = true;
    }
    else
    {
      textToBeRendered = "";
      for (let i = word; word - i < numberOfWords && word < wordCount;) {
        textToBeRendered = textToBeRendered.concat(text[word] + ' ');
        word++;
      }
      document.getElementById("readingWords").innerText = textToBeRendered;
      if (word >= wordCount) {
        clearInterval(intervalId);
        initialPrint = false;
      }
    }
  }, 1000.0 * 60 / wordsPerMinute * numberOfWords);
}

document.getElementById("readButton").onclick = () => {

  window.scrollTo(0, document.body.scrollHeight);
  initialPrint = false;
  startDisplayingWords();

};

document.getElementById("resetButton").onclick = startDisplayingWords;
