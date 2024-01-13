const url = ` https://api.dictionaryapi.dev/api/v2/entries/en/`;

const searchInput = document.getElementById('search-input');
const searchButton = document.getElementsByClassName('search-button')[0];
const wordLabel = document.getElementsByClassName('word')[0];
const wordInfo = document.getElementsByClassName('word-info')[0];
const definitionLabel = document.getElementsByClassName('definition')[0];
const exampleLabel = document.getElementsByClassName('example')[0];
const volumeButton = document.getElementsByClassName('volume-button')[0];
const sound = document.getElementById('sound');

const volumeStatus = document.getElementsByClassName('volume-status')[0];
let wordAvailable = true;

function fetchApi() { 
  fetch(`${url}${searchInput.value}`)
  .then((response) => response.json())
  .then(
    (data) => {
      try {

        console.log(data)
        wordLabel.textContent = data[0].word;
        wordInfo.textContent = `${data[0].meanings[0].partOfSpeech}  /${data[0].phonetic}/`;
        definitionLabel.textContent = data[0].meanings[0].definitions[0].definition;
        exampleLabel.textContent = data[0].meanings[0].definitions[0].example || 'No examples available for this word';

        sound.setAttribute('src', `${data[0].phonetics[0].audio}`);

      } catch(error) {
        wordAvailable = false;
        wordLabel.textContent = 'Unavailable';
      }
    })
}

searchButton.addEventListener('click', function() {
  fetchApi();
})

volumeButton.addEventListener('click', function() {
  if (sound.getAttribute('src') !== '') {
    sound.play();
  }
})

searchInput.addEventListener('keyup', function(event) {
  event.preventDefault();
  if (event.keyCode === 13) {
    fetchApi();
  }
})

volumeButton.addEventListener('mouseover', function() {
  volumeStatus.style.width = '15vh';
  if (wordAvailable & sound.getAttribute('src') !== '') {volumeStatus.textContent = 'Hear the pronounciation';} 
  else {volumeStatus.textContent = 'Unavailable for this word'}

})

volumeButton.addEventListener('mouseout', function() {
  volumeStatus.style.width = 0;
  volumeStatus.textContent = '';
})