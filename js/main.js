/* main.js - Controls the flow of the website */

document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const btnStart = document.getElementById('btn-start');
    const btnMemoriesNext = document.getElementById('btn-memories-next');
    const btnYes = document.querySelectorAll('.btn-yes');
    const bgMusic = document.getElementById('bg-music');
    const musicBtn = document.getElementById('music-control');

    // Screens
    const screens = {
        landing: document.getElementById('landing'),
        memories: document.getElementById('memories'),
        buildup: document.getElementById('buildup'),
        question: document.getElementById('question'),
        celebration: document.getElementById('celebration')
    };

    // State
    let isMusicPlaying = false;

    // --- NAVIGATION LOGIC ---

    // 1. Landing -> Memories
    btnStart.addEventListener('click', () => {
        playMusic();

        // Add fade-out scale animation
        screens.landing.style.transform = 'scale(1.1)';
        screens.landing.style.opacity = '0';

        setTimeout(() => {
            switchScreen(screens.landing, screens.memories);
            // Revert transform for potential back navigation (not implemented, but good practice)
            screens.landing.style.transform = 'scale(1)';
        }, 1000);
    });

    // 2. Memories -> Build Up
    btnMemoriesNext.addEventListener('click', () => {
        switchScreen(screens.memories, screens.buildup);

        // Start Typewriter effect after transition
        setTimeout(() => {
            startTypewriter();
        }, 1200);
    });

    // 3. Question -> Celebration (YES Clicked)
    btnYes.forEach(btn => {
        btn.addEventListener('click', () => {
            handleYesClick();
        });
    });

    // --- FUNCTIONS ---

    function switchScreen(current, next) {
        current.classList.remove('active-screen');
        next.classList.add('active-screen');
    }

    // Typewriter Logic
    const typeText = "I’ve been wanting to ask you something...\nSomething important...";
    const typeElement = document.getElementById('typewriter-text');

    function startTypewriter() {
        let i = 0;
        typeElement.innerHTML = ''; // Reset

        function type() {
            if (i < typeText.length) {
                const char = typeText.charAt(i);
                typeElement.innerHTML += char === '\n' ? '<br>' : char;
                i++;
                setTimeout(type, 100); // Typing speed
            } else {
                // Finished typing, wait then show next screen
                setTimeout(() => {
                    switchScreen(screens.buildup, screens.question);
                }, 3000); // 3s pause to read
            }
        }
        type();
    }

    function handleYesClick() {
        switchScreen(screens.question, screens.celebration);

        // Trigger massive effects
        if (typeof intensifyRoses === 'function') intensifyRoses();

        // Fire confetti multiple times for a huge blast
        const fire = () => { if (typeof fireConfetti === 'function') fireConfetti(); };

        fire();
        setTimeout(fire, 500);
        setTimeout(fire, 1000);
        setTimeout(fire, 1500);
        setTimeout(fire, 2500);

        // Change background to celebration mode
        document.body.style.background = 'linear-gradient(-45deg, #ff416c, #ff4b2b, #ff9a9e, #fad0c4)';
        document.body.style.backgroundSize = '400% 400%';
    }

    // --- MUSIC CONTROL ---

    musicBtn.addEventListener('click', () => {
        if (isMusicPlaying) {
            bgMusic.pause();
            musicBtn.innerHTML = '🔇';
        } else {
            bgMusic.play();
            musicBtn.innerHTML = '🎵';
        }
        isMusicPlaying = !isMusicPlaying;
    });

    function playMusic() {
        bgMusic.volume = 0.4;
        const playPromise = bgMusic.play();

        if (playPromise !== undefined) {
            playPromise.then(() => {
                isMusicPlaying = true;
                musicBtn.innerHTML = '🎵';
            }).catch(error => {
                console.log("Auto-play blocked");
                // Fallback: waiting for ANY user interaction
                const enableAudio = () => {
                    if (!isMusicPlaying) {
                        bgMusic.play().then(() => {
                            isMusicPlaying = true;
                            musicBtn.innerHTML = '🎵';
                            // Remove listeners once successful
                            ['click', 'touchstart', 'keydown'].forEach(event =>
                                document.removeEventListener(event, enableAudio)
                            );
                        });
                    }
                };

                ['click', 'touchstart', 'keydown'].forEach(event =>
                    document.addEventListener(event, enableAudio, { once: true })
                );
            });
        }
    }

    // Attempt play on load
    playMusic();
});
