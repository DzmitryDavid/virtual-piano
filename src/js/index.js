
const fullscreenBtn = document.querySelector('.header__fullscreen');
const startButton = document.querySelector('.start-btn');
const inputNotes = document.querySelector('.input');
const inputContainer = document.querySelector('.header__toggle');
const footer = document.querySelector('.footer');

let isNote = true;
startButton.addEventListener('click', init);
fullscreenBtn.addEventListener('click', onFullScreen)

function init() {
    startButton.classList.add('hidden');
    inputNotes.addEventListener('click', () => {
        isNote = !isNote;
        renderKeys()
    })  
renderKeys()
}  


function renderKeys() {
    inputContainer.style.opacity = 1;
    inputContainer.style.visibility = 'visible';
    const pianoContainer = document.createElement('div');

    document.querySelector('.container').innerHTML = '';
    if (isNote) {
        pianoContainer.innerHTML = `
    <div class="piano__key piano__key-white" data="c">c</div>
    <div class="piano__key piano__key-black" data="c♯">c♯</div>
    <div class="piano__key piano__key-white" data="d">d</div>
    <div class="piano__key piano__key-black" data="d♯">d♯</div>
    <div class="piano__key piano__key-white" data="e">e</div>
    <div class="piano__key piano__key-white" data="f">f</div>
    <div class="piano__key piano__key-black" data="f♯">f♯</div>
    <div class="piano__key piano__key-white" data="g">g</div>
    <div class="piano__key piano__key-black" data="g♯">g♯</div>
    <div class="piano__key piano__key-white" data="a">a</div>
    <div class="piano__key piano__key-black" data="a♯">a♯</div>
    <div class="piano__key piano__key-white" data="b">b</div>
    `;
    } else {
        pianoContainer.innerHTML = `
    <div class="piano__key piano__key-white" data="c">Z</div>
    <div class="piano__key piano__key-black" data="c♯">s</div>
    <div class="piano__key piano__key-white" data="d">X</div>
    <div class="piano__key piano__key-black" data="d♯">d</div>
    <div class="piano__key piano__key-white" data="e">C</div>
    <div class="piano__key piano__key-white" data="f">V</div>
    <div class="piano__key piano__key-black" data="f♯">h</div>
    <div class="piano__key piano__key-white" data="g">B</div>
    <div class="piano__key piano__key-black" data="g♯">j</div>
    <div class="piano__key piano__key-white" data="a">N</div>
    <div class="piano__key piano__key-black" data="a♯">k</div>
    <div class="piano__key piano__key-white" data="b">M</div>
    `;
    }
    
    pianoContainer.classList.add('piano__container')
    document.querySelector('.container').append(pianoContainer);
    addListeners(pianoContainer);
    setTimeout(() => {
        pianoContainer.classList.add('show')
    }, 100);
}

function addListeners(pianoContainer) {
    pianoContainer.addEventListener('mousedown', getNote);
    pianoContainer.addEventListener('mouseup', removeClass);
    pianoContainer.addEventListener('mouseout', removeClass);
    pianoContainer.addEventListener('mouseup' ,() => {
        pianoContainer.removeEventListener('mouseover', mouseOver)
    })
    window.addEventListener('keydown', getKey);
    window.addEventListener('keyup', removeClass);
}

function mouseOver(e) {
    let currentElem = null;
    if (currentElem) return;
    let target = e.target.closest('.piano__key');
    if (!target) return
    currentElem = target;
    const note = currentElem.getAttribute('data');
    addClass(e)
    audioPlay(note);
    
}   
function addClass(e) {
    e.target.classList.add('active');
}

function removeClass(e) {
    const allKeys = document.querySelectorAll('.piano__key');
    allKeys.forEach(key => key.classList.remove('active'));
    e.target.classList.remove('active');
}

function getNote (e) {
    const event = e.target;
    if (event === event.closest('.piano__container')) return
    const note = event.getAttribute('data');
    const  container = document.querySelector('.piano__container');
    container.addEventListener('mouseover', mouseOver)
    addClass(e)
    audioPlay(note);
}

function getKeyboardKey (key) {
    key.classList.add('active')
    const note = key.getAttribute('data');
    audioPlay(note);
}

function audioPlay(note) {
    const audio = new Audio(`assets/audio/${note}.mp3`);
    audio.currentTime = 0;
    audio.play();
}

function getKey(e) {
    if (e.repeat) return
    const allWhiteKeys = document.querySelectorAll('.piano__key-white');
    const allBlackKeys = document.querySelectorAll('.piano__key-black');
    const whiteKeys = ['KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM']
    const blackKeys = ['KeyS', 'KeyD', 'KeyH', 'KeyJ', 'KeyK'];
    const whiteKeysIndex = whiteKeys.indexOf(e.code)
    const blackKeysIndex = blackKeys.indexOf(e.code)

    if(whiteKeysIndex > -1) getKeyboardKey(allWhiteKeys[whiteKeysIndex]);
    if(blackKeysIndex > -1) getKeyboardKey(allBlackKeys[blackKeysIndex]);
}

function onFullScreen() {
    if (!document.fullscreenElement)  {
        document.documentElement.requestFullscreen();
    } else {
        if (document.fullscreenEnabled) document.exitFullscreen();
    }
}

