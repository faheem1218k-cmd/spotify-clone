console.log("Faheem Music Player Started");

// Audio object
const audio = new Audio();

// All music data
const playlist = [
    { name: "Faheem song", src: "song1.mp3", cover: "img/image1.jpg" },
    { name: "Faheem song", src: "song2.mp3", cover: "img/image2.jpg" },
    { name: "Faheem song", src: "song3.mp3", cover: "img/image3.jpg" },
    { name: "Faheem song", src: "song4.mp3", cover: "img/image4.jpg" },
    { name: "Faheem song", src: "song5.mp3", cover: "img/image5.jpg" },
    { name: "Faheem song", src: "song6.mp3", cover: "img/image6.jpg" },
    { name: "Faheem song", src: "song7.mp3", cover: "img/image7.jpg" }
];

// Current playing song
let songNumber = 0;

// HTML elements
const playerButton = document.querySelector("#play");
const songDetails = document.querySelector(".songinfo");
const songDuration = document.querySelector(".songtime");
const progressCircle = document.querySelector(".circle");
const songCards = document.querySelector(".cardContainer");
const library = document.querySelector(".songList ul");

// Time format
const formatTime = (time) => {
    if (!Number.isFinite(time)) return "00:00";

    const min = Math.floor(time / 60);
    const sec = Math.floor(time % 60);

    return `${String(min).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
};

// Play selected song
function selectSong(number, paused = false) {

    songNumber = number;

    const selected = playlist[songNumber];

    audio.src = "songs/" + selected.src;

    songDetails.textContent = selected.name;

    songDuration.textContent = "00:00 / 00:00";

    progressCircle.style.left = "0%";

    if (paused) {
        playerButton.src = "img/play.svg";
    } else {
        startMusic();
    }
}

// Start music
function startMusic() {
    audio.play();
    playerButton.src = "img/pause.svg";
}

// Pause music
function stopMusic() {
    audio.pause();
    playerButton.src = "img/play.svg";
}

// Create music cards
playlist.forEach((track, position) => {

    songCards.innerHTML += `
        <div class="card" data-number="${position}">

            <div class="play">
                <svg width="16" height="16" viewBox="0 0 24 24"
                fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 20V4L19 12L5 20Z"
                    stroke="#141B34" fill="#000"
                    stroke-width="1.5"
                    stroke-linejoin="round"/>
                </svg>
            </div>

            <img src="${track.cover}" alt="Faheem song">

            <h2>Faheem song</h2>

            <p>Song ${position + 1}</p>

        </div>
    `;

});

// Card click events
document.querySelectorAll(".card").forEach(card => {

    card.onclick = () => {
        selectSong(Number(card.dataset.number));
    };

});

// Create library songs
playlist.forEach((track, position) => {

    library.innerHTML += `
        <li data-number="${position}">

            <img class="invert" width="34"
            src="img/music.svg" alt="">

            <div class="info">
                <div>Faheem song ${position + 1}</div>
                <div>Faheem</div>
            </div>

            <div class="playnow">
                <span>Play Now</span>
                <img class="invert" src="img/play.svg" alt="">
            </div>

        </li>
    `;

});

// Library click
document.querySelectorAll(".songList li").forEach(item => {

    item.onclick = () => {
        selectSong(Number(item.dataset.number));
    };

});

// Main play button
playerButton.onclick = () => {

    if (audio.paused) {
        startMusic();
    } else {
        stopMusic();
    }

};

// Update song time
audio.ontimeupdate = () => {

    songDuration.textContent =
        formatTime(audio.currentTime) + " / " +
        formatTime(audio.duration);

    if (audio.duration) {
        progressCircle.style.left =
            (audio.currentTime / audio.duration) * 100 + "%";
    }

};

// Seekbar click
document.querySelector(".seekbar").onclick = (event) => {

    if (!audio.duration) return;

    const bar = event.currentTarget;
    const position = event.clientX - bar.getBoundingClientRect().left;

    const percentage = position / bar.clientWidth;

    audio.currentTime = percentage * audio.duration;

};

// Previous song
document.querySelector("#previous").onclick = () => {

    if (songNumber > 0) {
        selectSong(songNumber - 1);
    }

};

// Next song
document.querySelector("#next").onclick = () => {

    if (songNumber < playlist.length - 1) {
        selectSong(songNumber + 1);
    }

};

// Mobile menu
const sidebar = document.querySelector(".left");

document.querySelector(".hamburger").onclick = () => {
    sidebar.style.left = "0";
};

document.querySelector(".close").onclick = () => {
    sidebar.style.left = "-120%";
};

// Volume slider
const volumeSlider = document.querySelector("#volume");

if (volumeSlider) {

    volumeSlider.oninput = () => {
        audio.volume = Number(volumeSlider.value) / 100;
    };

}

// Mute and unmute
const volumeIcon = document.querySelector(".volume>img");

volumeIcon.onclick = () => {

    if (audio.volume > 0) {

        audio.volume = 0;
        volumeIcon.src = "img/mute.svg";
        if (volumeSlider) volumeSlider.value = 0;

    } else {

        audio.volume = 0.5;
        volumeIcon.src = "img/volume.svg";
        if (volumeSlider) volumeSlider.value = 50;

    }

};

// Default volume
audio.volume = 0.5;

// First song selected
selectSong(0, true);

console.log("Faheem Music Player Ready!");