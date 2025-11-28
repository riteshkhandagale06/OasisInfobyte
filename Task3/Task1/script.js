// --- 1. RIG DATA WITH LOCAL MP4 VIDEO ---
const rigData = {
    enforcer: {
        game: "Car Racing Demo",
        videoUrl: "videos/CAR.MP4",
        stats: { fps: 75, gpu: 85, temp: 78 }
    },
    
    vanguard: {
        game: "Car Racing Demo",
        videoUrl: "videos/CAR.MP4",
        stats: { fps: 90, gpu: 90, temp: 72 }
    },

    harbinger: {
        game: "Car Racing Demo",
        videoUrl: "videos/CAR.MP4",
        stats: { fps: 120, gpu: 95, temp: 65 }
    }
};

const cardElements = document.querySelectorAll('.laptop-card');
const videoElement = document.getElementById('game-video');
const videoContainer = document.getElementById('video-container');
const gameNameElement = document.getElementById('game-name');
const fpsCounterElement = document.getElementById('fps-counter');
const detailsBtn = document.getElementById('view-details-btn');

let currentFPSAnimation;

// --- 2. STAT ANIMATION ---
function loadPerformanceData(rigId) {
    const data = rigData[rigId];

    gameNameElement.textContent = data.game;
    detailsBtn.classList.add('active');
    detailsBtn.href = `#details-${rigId}`;

    if (currentFPSAnimation) currentFPSAnimation.kill();

    const fpsObj = { value: 0 };
    currentFPSAnimation = gsap.to(fpsObj, {
        value: data.stats.fps,
        duration: 1.5,
        onUpdate: () => {
            fpsCounterElement.textContent = `${Math.round(fpsObj.value)} FPS`;
        }
    });

    const gpuBar = document.querySelector('.stat-bar[data-stat="gpu"] .bar-fill');
    const gpuValue = document.querySelector('.stat-bar[data-stat="gpu"] .stat-value');
    gsap.to(gpuBar, { width: `${data.stats.gpu}%`, duration: 1 });
    gsap.to({ value: 0 }, {
        value: data.stats.gpu,
        duration: 1,
        onUpdate() { gpuValue.textContent = `${Math.round(this.targets()[0].value)}%`; }
    });

    const tempBar = document.querySelector('.stat-bar[data-stat="temp"] .bar-fill');
    const tempValue = document.querySelector('.stat-bar[data-stat="temp"] .stat-value');
    gsap.to(tempBar, { width: `${data.stats.temp}%`, duration: 1 });
    gsap.to({ value: 0 }, {
        value: data.stats.temp,
        duration: 1,
        onUpdate() { tempValue.textContent = `${Math.round(this.targets()[0].value)}°C`; }
    });
}

// --- 3. LOAD LOCAL MP4 VIDEO ---
function loadVideo(rigId) {
    const data = rigData[rigId];

    const placeholder = document.querySelector('.video-placeholder');
    if (placeholder) placeholder.remove();

    videoElement.src = data.videoUrl;
    videoElement.style.display = "block";
    videoElement.play();
}

// --- 4. EVENT LISTENERS ---
cardElements.forEach(card => {
    const rigId = card.getAttribute('data-rig');

    card.addEventListener('mouseenter', () => {
        loadVideo(rigId);
        loadPerformanceData(rigId);
    });
});

// --- 5. INITIAL RESET ---
gameNameElement.textContent = 'Select a Rig...';
fpsCounterElement.textContent = '0 FPS';
detailsBtn.classList.remove('active');

gsap.set(document.querySelectorAll('.bar-fill'), { width: '0%' });
gsap.set(document.querySelectorAll('.stat-value'), { textContent: '0%' });