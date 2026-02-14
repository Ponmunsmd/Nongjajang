document.addEventListener('DOMContentLoaded', () => {
    const audio = new Audio('assets/music.mp3'); // Ensure you have this file
    audio.volume = 0.1;
    const playBtn = document.getElementById('play-btn');
    const progressBar = document.getElementById('progress');


    let isPlaying = false;



    // Play/Pause Functionality
    function togglePlay() {
        if (isPlaying) {
            audio.pause();
            playBtn.classList.remove('fa-pause');
            playBtn.classList.add('fa-play');
        } else {
            audio.play().catch(e => console.log("Audio play failed (user interaction needed):", e));
            playBtn.classList.remove('fa-play');
            playBtn.classList.add('fa-pause');
        }
        isPlaying = !isPlaying;
    }

    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');

    playBtn.addEventListener('click', togglePlay);

    // Skip functionality
    prevBtn.addEventListener('click', () => {
        audio.currentTime -= 10; // Rewind 10s
    });

    nextBtn.addEventListener('click', () => {
        audio.currentTime += 10; // Forward 10s
    });

    // Initial click to play (browser policy often blocks auto-play)
    document.body.addEventListener('click', () => {
        if (!isPlaying) {
            // togglePlay(); // Optional: Auto-play on first click anywhere
        }
    }, { once: true });

    const currTimeEl = document.querySelector('.curr-time');
    const totalTimeEl = document.querySelector('.total-time');

    // Format time helper (MM:SS)
    function formatTime(seconds) {
        const min = Math.floor(seconds / 60);
        const sec = Math.floor(seconds % 60);
        return `${min}:${sec < 10 ? '0' : ''}${sec}`;
    }

    // Update Progress & Time
    audio.addEventListener('timeupdate', () => {
        if (audio.duration) {
            const percent = (audio.currentTime / audio.duration) * 100;
            progressBar.style.width = percent + '%';
            currTimeEl.innerText = formatTime(audio.currentTime);
        }
    });

    // Set Total Duration when metadata loads
    audio.addEventListener('loadedmetadata', () => {
        totalTimeEl.innerText = formatTime(audio.duration);
    });

    // Close footer claim
    document.querySelector('.close-claim').addEventListener('click', () => {
        document.querySelector('.floating-claim').style.display = 'none';
    });
});
