
function startDisplayingWords()
{
  let wordsPerMinute = Number(document.getElementById("WPM").value);
  let numberOfWords = Number(document.getElementById("NW").value);

  let text = document.getElementById("textInput").value.split(" ");
  let wordCount = text.length;
  if (numberOfWords > wordCount)
    numberOfWords = 1;
  let word = 0;
  let textToBeRendered = "";

  let intervalId = setInterval(() => {

    textToBeRendered = "";
    for (let i = word; word - i < numberOfWords && word < wordCount;) {
      textToBeRendered = textToBeRendered.concat(text[word] + ' ');
      word++;
    }
    document.getElementById("readingWords").innerText = textToBeRendered;
    if (word >= wordCount) clearInterval(intervalId);
  }, 1000.0 * 60 / wordsPerMinute * numberOfWords);
}

document.getElementById("submitButton").onclick = () => {

  window.scrollTo(0, window.innerHeight);
  startDisplayingWords();

};

document.getElementById("resetButton").onclick = startDisplayingWords;
