// Particle System
const initParticles = () => {
    const container = document.getElementById('particles');
    if (!container) return;

    for (let i = 0; i < 50; i++) {
        const p = document.createElement('div');
        p.className = 'particle';
        const size = Math.random() * 5 + 2;
        p.style.width = p.style.height = `${size}px`;
        p.style.left = `${Math.random() * 100}%`;
        p.style.top = `${Math.random() * 100}%`;
        p.style.animationDelay = `${Math.random() * 20}s`;
        p.style.animationDuration = `${Math.random() * 10 + 10}s`;
        container.appendChild(p);
    }
};

// Rain System
const initRain = () => {
    const container = document.getElementById('rain');
    if (!container) return;

    for (let i = 0; i < 100; i++) {
        const drop = document.createElement('div');
        drop.className = 'drop';
        drop.style.left = `${Math.random() * 100}%`;
        drop.style.animationDuration = `${Math.random() * 0.5 + 0.5}s`;
        drop.style.animationDelay = `${Math.random() * 2}s`;
        drop.style.opacity = Math.random() * 0.3;
        container.appendChild(drop);
    }
};

// Reveal on Scroll
const initScrollReveal = () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.memory-item, .letter-section, .quote-card, .last-words-content p, .final-heartbreak, .final-quote').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 1s cubic-bezier(0.4, 0, 0.2, 1)';
        observer.observe(el);
    });
};

// Parallax Hero
window.addEventListener('scroll', () => {
    const title = document.querySelector('.hero h1');
    if (title) {
        const val = window.scrollY;
        title.style.transform = `translateY(${val * 0.4}px)`;
        title.style.opacity = 1 - (val / 600);
    }
});


// Music Control with Playlist & Auto-Play
const initMusic = () => {
    const btn = document.getElementById('musicToggle');
    const audio = document.getElementById('bgMusic');
    if (!btn || !audio) return;

    const playlist = [
        "Waves_of_Life_GMA_OST_Music_Video__Through_The_Rain_-_Nasser__FULL_SONG_(48k).mp3",
        "MY_VALENTINE___TAGALOG_VERSION_WITH_LYRICS_by_Roselle_Nava(48k).mp3",
        "The_Third_Way_of_Love_OST___강미진_Yoari__Kang_Mi_Jin__-_Angel_Eyes(48k).mp3",
        "Ikaw_Lang_Ang_Mamahalin_-_KZ_Tandingan___La_Luna_Sangre__Lyrics_(48k).mp3",
        "Destiny_-_Jim_Brickman__Official_Lyrics_Video_(48k).mp3",
        "Erik_Santos_-_Magpahanggang_Wakas__Lyrics____Erik_Santos(48k).mp3",
        "Ito_ang_Pangako_ko_with_lyrics_by_Nyoy_Volante__Perfect_Match__created_by_lucelle____.wmv(48k).mp3",
        "Karmine_-_Kahit_Na_Malayo_Ka__Unofficial_Lyric_Video__#karmineph__#musicvideo_#opmsong(48k).mp3"
    
    ];
    let currentTrack = 0;

    const loadTrack = (index) => {
        audio.src = playlist[index];
        audio.load();
    };


    const startPlaying = () => {
        audio.play().then(() => {
            const rawName = playlist[currentTrack].split('.')[0];
            const cleanName = rawName.replace(/[_-]/g, ' ').replace(/\(.*\)/g, '').trim();
            btn.innerHTML = `<span>⏸️</span> Now Playing: ${cleanName}`;
            btn.classList.add('playing');
        }).catch(e => {
            console.log("Autoplay blocked. Waiting for activation...");
        });
    };

    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (audio.paused) {
            startPlaying();
        } else {
            audio.pause();
            btn.innerHTML = `<span>🎵</span> Music Paused`;
            btn.classList.remove('playing');
        }
    });

    audio.addEventListener('ended', () => {
        currentTrack = (currentTrack + 1) % playlist.length;
        loadTrack(currentTrack);
        startPlaying();
    });



    const autoPlayHandler = () => {
        if (audio.paused) startPlaying();
        ['click', 'scroll', 'touchstart', 'mousemove'].forEach(evt => 
            document.removeEventListener(evt, autoPlayHandler)
        );
    };

    ['click', 'scroll', 'touchstart', 'mousemove'].forEach(evt => 
        document.addEventListener(evt, autoPlayHandler)
    );


    // Splash Screen Handler
    const splash = document.getElementById('splash');
    if (splash) {
        splash.addEventListener('click', () => {
            splash.classList.add('hidden');
            startPlaying();
        });
    }

    // Initialize first track
    loadTrack(currentTrack);
};

document.addEventListener('DOMContentLoaded', () => {
    initParticles();
    initRain();
    initScrollReveal();
    initMusic();
});
