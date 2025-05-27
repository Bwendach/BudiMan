// Navbar scroll effect
window.addEventListener("scroll", () => {
  const navbar = document.getElementById("navbar");
  if (window.scrollY > 10) {
    navbar.classList.add("bg-background/90", "backdrop-blur-md", "shadow-lg");
    navbar.classList.remove("bg-transparent");
    navbar.classList.add("py-2");
    navbar.classList.remove("py-4");
  } else {
    navbar.classList.remove(
      "bg-background/90",
      "backdrop-blur-md",
      "shadow-lg"
    );
    navbar.classList.add("bg-transparent");
    navbar.classList.remove("py-2");
    navbar.classList.add("py-4");
  }
});

// Mobile menu toggle
document.getElementById("mobile-menu-btn").addEventListener("click", () => {
  const mobileMenu = document.getElementById("mobile-menu");
  mobileMenu.classList.toggle("hidden");
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Hero particles animation
function createHeroParticles() {
  const container = document.getElementById("hero-particles");
  for (let i = 0; i < 30; i++) {
    const particle = document.createElement("div");
    particle.className = "absolute rounded-full bg-time-blue/30 animate-float";
    particle.style.width = `${Math.random() * 20 + 5}px`;
    particle.style.height = particle.style.width;
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.top = `${Math.random() * 100}%`;
    particle.style.animationDelay = `${Math.random() * 5}s`;
    particle.style.animationDuration = `${Math.random() * 10 + 10}s`;
    container.appendChild(particle);
  }
}

// Characters data and functionality
const characters = [
  {
    name: "Budiman",
    actor: "Stankovic",
    description:
      "The powerless protagonist who gains time-stopping abilities during a crucial moment.",
    icon: `<svg class="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12,6 12,12 16,14"></polyline>
              </svg>`,
    color: "text-time-blue",
    bgColor: "bg-time-blue",
    borderColor: "border-time-blue",
    image: "https://placehold.co/600x800/333/fff?text=Budiman",
  },
  {
    name: "Bryan",
    actor: "Bryan",
    description: "Budiman's loyal friend with a ridiculous super-fart ability.",
    icon: `<svg class="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h8m-5-10v2a3 3 0 006 0V4M7 7h10"></path>
              </svg>`,
    color: "text-hero-gold",
    bgColor: "bg-hero-gold",
    borderColor: "border-hero-gold",
    image: "https://placehold.co/600x800/333/fff?text=Bryan",
  },
  {
    name: "Bryan's Mom",
    actor: "Brenda",
    description:
      "Bryan's powerful and influential mother who tries to save his son but struggles with the cost.",
    icon: `<svg class="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                <line x1="8" y1="21" x2="16" y2="21"></line>
                <line x1="12" y1="17" x2="12" y2="21"></line>
              </svg>`,
    color: "text-purple-500",
    bgColor: "bg-purple-500",
    borderColor: "border-purple-500",
    image: "https://placehold.co/600x800/333/fff?text=Mom",
  },
  {
    name: "WW",
    actor: "Willsen",
    description:
      "The shocking villain who manipulates electricity and betrays Budiman.",
    icon: `<svg class="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>`,
    color: "text-electric-blue",
    bgColor: "bg-electric-blue",
    borderColor: "border-electric-blue",
    image: "./assets/willsen.jpg",
  },
  {
    name: "Andrew",
    actor: "Andrew",
    description:
      "A hacker genius who uses his digital powers to uncover secrets and help track down Bryan.",
    icon: `<svg class="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>`,
    color: "text-hero-red",
    bgColor: "bg-hero-red",
    borderColor: "border-hero-red",
    image: "https://placehold.co/600x800/333/fff?text=Andrew",
  },
];

let activeCharacter = 0;

function updateCharacterDisplay() {
  const character = characters[activeCharacter];
  document.getElementById("character-image").src = character.image;
  document.getElementById("character-image").alt = character.name;
  document.getElementById("character-icon").innerHTML = character.icon;
  document.getElementById(
    "character-icon"
  ).className = `w-12 h-12 rounded-full flex items-center justify-center mb-3 ${character.bgColor}`;
  document.getElementById("character-name").textContent = character.name;
  document.getElementById(
    "character-actor"
  ).textContent = `Played by ${character.actor}`;
  document.getElementById("character-description").textContent =
    character.description;
}

function createCharacterCards() {
  const container = document.getElementById("character-cards");
  container.innerHTML = ""; // Clear previous cards

  characters.forEach((character, index) => {
    const card = document.createElement("div");
    card.className = `cursor-pointer transition-all duration-300 hover:shadow-lg rounded-lg border p-6 flex items-start ${
      index === activeCharacter
        ? `bg-black/30 ${character.borderColor} shadow-lg`
        : "bg-black/10 border-border hover:bg-black/20"
    }`;

    card.innerHTML = `
      <div class="w-10 h-10 rounded-full flex items-center justify-center mr-4 shrink-0 ${
        index === activeCharacter ? character.bgColor : "bg-muted"
      }">
        ${character.icon}
      </div>
      <div>
        <h3 class="text-lg font-bold mb-1">${character.name}</h3>
        <p class="text-sm text-muted-foreground">Played by ${
          character.actor
        }</p>
      </div>
    `;

    card.addEventListener("click", () => {
      activeCharacter = index;
      updateCharacterDisplay();
      createCharacterCards(); // Re-render cards to reflect active selection
    });

    container.appendChild(card);
  });
}

// Bloopers carousel
const bloopers = [
  {
    id: 1,
    src: "https://placehold.co/1920x1080/333/fff?text=Behind+the+Scenes",
    alt: "Behind the scenes - Time stop effect fail",
  },
  {
    id: 2,
    src: "https://placehold.co/1920x1080/333/fff?text=Electric+Outtake",
    alt: "Outtake - Electric powers malfunction",
  },
  {
    id: 3,
    src: "https://placehold.co/1920x1080/333/fff?text=Fart+Blooper",
    alt: "Blooper - Super fart scene gone wrong",
  },
  {
    id: 4,
    src: "https://placehold.co/1920x1080/333/fff?text=Cast+Laughing",
    alt: "Cast laughing during serious scene",
  },
  {
    id: 5,
    src: "https://placehold.co/1920x1080/333/fff?text=Director+Poses",
    alt: "Director explaining superhero poses",
  },
];

let currentBlooper = 0;

function createBlooperSlides() {
  const container = document.getElementById("blooper-carousel");
  const indicators = document.getElementById("blooper-indicators");

  container.innerHTML = "";
  indicators.innerHTML = "";

  bloopers.forEach((blooper, index) => {
    // Create slide
    const slide = document.createElement("div");
    slide.className = `absolute inset-0 transition-all duration-500 ease-in-out ${
      index === currentBlooper ? "opacity-100 z-10" : "opacity-0 z-0"
    }`;
    slide.innerHTML = `
            <img src="${blooper.src}" alt="${blooper.alt}" class="w-full h-full object-cover">
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
            <div class="absolute bottom-0 left-0 right-0 p-6">
                <p class="text-white text-lg">${blooper.alt}</p>
            </div>
        `;
    container.appendChild(slide);

    // Create indicator
    const indicator = document.createElement("button");
    indicator.className = `w-2 h-2 rounded-full transition-all ${
      index === currentBlooper ? "bg-hero-red w-4" : "bg-white/50"
    }`;
    indicator.addEventListener("click", () => {
      currentBlooper = index;
      createBlooperSlides();
    });
    indicators.appendChild(indicator);
  });
}

function nextBlooper() {
  currentBlooper = (currentBlooper + 1) % bloopers.length;
  createBlooperSlides();
}

function prevBlooper() {
  currentBlooper = (currentBlooper - 1 + bloopers.length) % bloopers.length;
  createBlooperSlides();
}

// Trailer functionality
// let isPlaying = false;
// let isMuted = false;
// let progress = 0;
// let progressInterval;

// function toggleTrailer() {
//   isPlaying = !isPlaying;
//   const placeholder = document.getElementById("video-placeholder");
//   const controls = document.getElementById("video-controls");
//   const playPause = document.getElementById("play-pause");
//   const progressBar = document.getElementById("progress-bar");

//   if (isPlaying) {
//     placeholder.classList.add("hidden");
//     controls.classList.remove("hidden");
//     playPause.innerHTML = `
//             <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
//                 <path d="./placeholder.mp4"/>
//             </svg>
//         `;

//     // Simulate video progress
//     progressInterval = setInterval(() => {
//       progress += 1;
//       progressBar.style.width = `${Math.min(progress, 100)}%`;
//       if (progress >= 100) {
//         clearInterval(progressInterval);
//         isPlaying = false;
//         progress = 0;
//         toggleTrailer();
//       }
//     }, 100);
//   } else {
//     if (progressInterval) clearInterval(progressInterval);
//     placeholder.classList.remove("hidden");
//     controls.classList.add("hidden");
//     progressBar.style.width = "0%";
//     progress = 0;
//   }
// }
const video = document.getElementById("video-player");
const placeholder = document.getElementById("video-placeholder");
const controls = document.getElementById("video-controls");
const playPauseBtn = document.getElementById("play-pause");
const playPauseIcon = playPauseBtn.querySelector("svg path");
const progressBar = document.getElementById("progress-bar");
const muteBtn = document.getElementById("mute-btn");
const muteIcon = document.getElementById("mute-icon");

let isPlaying = false;

function togglePlayPause() {
  if (video.paused || video.ended) {
    video.play();
  } else {
    video.pause();
  }
}

function updatePlayPauseIcon() {
  if (video.paused) {
    // Show play icon (triangle)
    playPauseBtn.innerHTML = `
      <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M8 5v14l11-7z" />
      </svg>
    `;
  } else {
    // Show pause icon (two bars)
    playPauseBtn.innerHTML = `
      <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M6 5h4v14H6zM14 5h4v14h-4z" />
      </svg>
    `;
  }
}

function updateProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.width = `${percent}%`;
}

function toggleMute() {
  video.muted = !video.muted;
  if (video.muted) {
    muteBtn.innerHTML = `
      <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
        <line x1="19" y1="5" x2="5" y2="19" stroke="currentColor" stroke-width="2" />
      </svg>
    `;
  } else {
    muteBtn.innerHTML = `
      <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
        <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
      </svg>
    `;
  }
}

// When the user clicks the big play button on placeholder
document.getElementById("play-trailer").addEventListener("click", () => {
  placeholder.classList.add("hidden");
  video.classList.remove("hidden");
  controls.classList.remove("hidden");
  video.play();
});

// Play/pause button in controls
playPauseBtn.addEventListener("click", togglePlayPause);

// Update play/pause icon on play/pause
video.addEventListener("play", updatePlayPauseIcon);
video.addEventListener("pause", updatePlayPauseIcon);

// Update progress bar as video plays
video.addEventListener("timeupdate", updateProgress);

// When video ends, reset UI
video.addEventListener("ended", () => {
  placeholder.classList.remove("hidden");
  video.classList.add("hidden");
  controls.classList.add("hidden");
  progressBar.style.width = "0%";
});

// Mute/unmute button
muteBtn.addEventListener("click", toggleMute);

// Initialize UI
updatePlayPauseIcon();

function toggleMute() {
  isMuted = !isMuted;
  const muteBtn = document.getElementById("mute-btn");
  muteBtn.innerHTML = isMuted
    ? `
        <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
            <line x1="23" y1="9" x2="17" y2="15"></line>
            <line x1="17" y1="9" x2="23" y2="15"></line>
        </svg>
    `
    : `
        <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
        </svg>
    `;
}

// Contact form
document.getElementById("contact-form").addEventListener("submit", (e) => {
  e.preventDefault();
  alert("Thank you for your message! We'll get back to you soon.");
  e.target.reset();
});

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.animationPlayState = "running";
    }
  });
}, observerOptions);

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  createHeroParticles();
  updateCharacterDisplay();
  createCharacterCards();
  createBlooperSlides();

  // Add event listeners
  document
    .getElementById("play-trailer")
    .addEventListener("click", toggleTrailer);
  document
    .getElementById("play-pause")
    .addEventListener("click", toggleTrailer);
  document.getElementById("mute-btn").addEventListener("click", toggleMute);
  document
    .getElementById("next-blooper")
    .addEventListener("click", nextBlooper);
  document
    .getElementById("prev-blooper")
    .addEventListener("click", prevBlooper);

  // Observe animated elements
  document
    .querySelectorAll(
      ".animate-fade-in, .animate-slide-in-left, .animate-slide-in-right, .animate-scale-in"
    )
    .forEach((el) => {
      observer.observe(el);
    });
});

function goToMovie() {
  console.log("Go to movie in youtube");
}
