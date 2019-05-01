const app = () => {
    const song = document.querySelector(".song");
    const play = document.querySelector(".play");
    const outline = document.querySelector(".moving-outline circle");
    const video = document.querySelector(".vid-container video");

    //sounds
    const sounds = document.querySelectorAll(".sound-picker button");

    //time-display
    const timeDisplay = document.querySelector(".time-display");

    //getting the time selection buttons;
    const timeSelect = document.querySelectorAll(".time-select button");

    //get the length of the outline.
    const outlineLength = outline.getTotalLength();

    //Duration
    let fakeDuration = 300;

    outline.style.strokeDasharray = outlineLength;
    outline.style.strokeDashoffset = outlineLength;

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
            fakeDuration = this.getAttribute('data-time');
            timeDisplay.textContent = `${Math.floor(fakeDuration/60)} : ${ "0" +  Math.floor(fakeDuration%60)}`;
        });
    });


    //function specific to play and stop soungs;
    const checkPlaying = song => {
        if (song.paused) {
            song.play();
            video.play();
            play.src = "./svg/pause.svg";
        } else {
            song.pause();
            video.pause();
            play.src = "./svg/play.svg";
        }
    }

    // we can animate the circle
    song.ontimeupdate = () => {
        let currentTime = song.currentTime;
        let elapsed = fakeDuration - currentTime;
        let seconds = Math.floor(elapsed % 60);
        let minutes = Math.floor(elapsed / 60);
        if (seconds < 10) {
            seconds = "0" + seconds;
        }
        if (minutes < 10) {
            minutes = "0" + minutes;
        }

        //Animate the Circle
        let progress = outlineLength - ((currentTime / fakeDuration) * outlineLength);
        outline.style.strokeDashoffset = progress;

        //animate the text
        timeDisplay.textContent = `${minutes} : ${seconds}`;

        if (currentTime >= fakeDuration) {
            song.pause();
            song.currentTime = 0;
            play.src = "./svg/play.svg";
            video.pause();
        }
    }
};

app();