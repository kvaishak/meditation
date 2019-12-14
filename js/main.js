const app = () => {
    const song = document.querySelector(".song");
    const play = document.querySelector(".play-pause");
    const video = document.querySelector(".video");

    //sounds
    const sounds = document.querySelectorAll('.song-select button')

    //time-display
    const timeDisplay = document.querySelector(".time-display");

    //getting the time selection buttons;
    const timeSelect = document.querySelectorAll(".time-select button");

    //getting the progress bar
    const progressBar = document.querySelector(".progress-bar")

    //Duration
    let setDuration = 300;

    //pick different sound
    sounds.forEach(sound => {
        sound.addEventListener('click', function() {
            song.src = this.getAttribute('data-sound');
            video.src = this.getAttribute('data-video');
            checkPlaying(song);
        });
    });

    //Play Sound
    play.addEventListener('click', () => {
        checkPlaying(song);
    });

    //Select Time
    timeSelect.forEach(option => {
        option.addEventListener('click', function() {
            setDuration = this.getAttribute('data-time');
            timeDisplay.textContent = `${Math.floor(setDuration/60)} : ${ "0" +  Math.floor(setDuration%60)}`;
        });
    });

    //function specific to play and stop soungs;
    const checkPlaying = song => {
        if (song.paused) {
            song.play();
            video.play();
            play.src = "./icons/pause.svg";
        } else {
            song.pause();
            video.pause();
            play.src = "./icons/play.svg";
        }
    }

    // we can animate the circle
    song.ontimeupdate = () => {
        let currentTime = song.currentTime;
        let elapsed = setDuration - currentTime;
        let seconds = Math.floor(elapsed % 60);
        let minutes = Math.floor(elapsed / 60);
        if (seconds < 10) {
            seconds = "0" + seconds;
        }
        if (minutes < 10) {
            minutes = "0" + minutes;
        }

        //Animate the Progressbar
        let progressPercentage = (currentTime / setDuration) * 100;
        progressBar.style.width = progressPercentage + "%";

        //animate the text
        timeDisplay.textContent = `${minutes} : ${seconds}`;

        if (currentTime >= setDuration) {
            song.pause();
            song.currentTime = 0;
            play.src = "./icons/play.svg";
            video.pause();
        }
    }

};
app();