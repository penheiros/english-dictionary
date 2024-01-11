const url = ` https://api.dictionaryapi.dev/api/v2/entries/en/`;

const searchInput = document.getElementById('search-input');
const searchButton = document.getElementsByClassName('search-button')[0];
const wordLabel = document.getElementsByClassName('word')[0];
const wordInfo = document.getElementsByClassName('word-info')[0];
const definitionLabel = document.getElementsByClassName('definition')[0];
const exampleLabel = document.getElementsByClassName('example')[0];
const volumeButton = document.getElementsByClassName('volume-button')[0];
const sound = document.getElementById('sound');


function fetchApi() { 
  fetch(`${url}${searchInput.value}`)
  .then((response) => response.json())
  .then(
    (data) => {
      console.log(data)
      wordLabel.innerHTML = data[0].word;
      wordInfo.innerHTML = `${data[0].meanings[0].partOfSpeech}  /${data[0].phonetic}/`;
      definitionLabel.innerHTML = data[0].meanings[0].definitions[0].definition;
      exampleLabel.innerHTML = data[0].meanings[0].definitions[0].example || 'No examples available for this word';

      sound.setAttribute('src', `${data[0].phonetics[0].audio}`);
      console.log(sound)
    })
}

searchButton.addEventListener('click', function() {
  fetchApi();
})

volumeButton.addEventListener('click', function() {
  try {
    sound.play();
  }
  catch {
    alert("This word does not have an available audio")
  }
})

searchInput.addEventListener('keyup', function(event) {
  event.preventDefault();
  if (event.keyCode === 13) {
    fetchApi();
  }
})