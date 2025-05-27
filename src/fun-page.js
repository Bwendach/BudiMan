let timeStopped = false;
let lightningActive = false;
let powerType = null;
const timeStoppedParticles = [];

// Create floating particles
function createFloatingParticles() {
  const container = document.getElementById("floating-particles");
  for (let i = 0; i < 20; i++) {
    const particle = document.createElement("div");
    particle.className = "absolute rounded-full bg-time-blue/30 animate-float";
    particle.style.width = `${Math.random() * 20 + 5}px`;
    particle.style.height = particle.style.width;
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.top = `${Math.random() * 100}%`;
    particle.style.animationDelay = `${Math.random() * 5}s`;
    particle.style.animationDuration = `${Math.random() * 10 + 10}s`;
    container.appendChild(particle);
    timeStoppedParticles.push(particle);
  }
}

// Time stop functionality
function handleTimeStop() {
  if (timeStopped) return;

  timeStopped = true;
  const timeCard = document.getElementById("time-card");
  const timeIcon = document.getElementById("time-icon");
  const timeBtn = document.getElementById("time-stop-btn");
  const particles = document.getElementById("floating-particles");
  const overlay = document.getElementById("overlay-blocker");

  // Show overlay to block user interaction
  overlay.classList.remove("hidden");

  document.body.style.overflow = "hidden";

  // Update UI initial state
  timeCard.classList.add("bg-time-blue/20");
  timeIcon.classList.remove("bg-time-blue/20", "text-time-blue");
  timeIcon.classList.add("bg-time-blue", "text-white");
  timeBtn.disabled = true;

  // Stop particle animations
  particles.classList.remove("opacity-30");
  particles.classList.add("opacity-100");
  timeStoppedParticles.forEach((particle) => {
    particle.style.animationPlayState = "paused";
  });

  // Countdown logic
  let countdown = 5;
  timeBtn.textContent = `Time Frozen (${countdown}s)`;

  const intervalId = setInterval(() => {
    countdown--;
    if (countdown > 0) {
      timeBtn.textContent = `Time Frozen (${countdown}s)`;
    } else {
      clearInterval(intervalId);

      // Reset UI when countdown finishes
      timeStopped = false;
        document.body.style.overflow = "auto";

      overlay.classList.add("hidden");
      timeCard.classList.remove("bg-time-blue/20");
      timeIcon.classList.add("bg-time-blue/20", "text-time-blue");
      timeIcon.classList.remove("bg-time-blue", "text-white");
      timeBtn.textContent = "Stop Time";
      timeBtn.disabled = false;

      particles.classList.add("opacity-30");
      particles.classList.remove("opacity-100");
      timeStoppedParticles.forEach((particle) => {
        particle.style.animationPlayState = "running";
      });
    }
  }, 1000);
}

// Lightning functionality
function handleLightning() {
  if (lightningActive) return;

  lightningActive = true;
  const lightningCard = document.getElementById("lightning-card");
  const lightningIcon = document.getElementById("lightning-icon");
  const lightningBtn = document.getElementById("lightning-btn");
  const overlay = document.getElementById("lightning-overlay");

  // Update UI
  lightningCard.classList.add("bg-electric-blue/20");
  lightningIcon.classList.remove("bg-electric-blue/20", "text-electric-blue");
  lightningIcon.classList.add("bg-electric-blue", "text-white");
  lightningBtn.disabled = true;

  // Show lightning overlay
  overlay.classList.remove("hidden");

  // Reset after 1 second
  setTimeout(() => {
    lightningActive = false;
    lightningCard.classList.remove("bg-electric-blue/20");
    lightningIcon.classList.add("bg-electric-blue/20", "text-electric-blue");
    lightningIcon.classList.remove("bg-electric-blue", "text-white");
    lightningBtn.disabled = false;
    overlay.classList.add("hidden");
  }, 1000);
}

// Quiz functionality
function initQuiz() {
  const tabs = document.querySelectorAll(".quiz-tab");
  const contents = document.querySelectorAll(".quiz-content");
  const options = document.querySelectorAll(".quiz-option");
  const result = document.getElementById("quiz-result");
  const powerTypeResult = document.getElementById("power-type-result");
  const powerDescription = document.getElementById("power-description");

  // Track answers: {1: "time"/"shock", 2: ..., 3: ...}
  const answers = {
    1: null,
    2: null,
    3: null,
  };

  // Tab switching
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const questionNum = tab.dataset.question;

      tabs.forEach((t) =>
        t.classList.remove(
          "active",
          "bg-background",
          "text-foreground",
          "shadow-sm"
        )
      );
      tab.classList.add(
        "active",
        "bg-background",
        "text-foreground",
        "shadow-sm"
      );

      contents.forEach((content) => content.classList.add("hidden"));
      document
        .getElementById(`question-${questionNum}`)
        .classList.remove("hidden");
    });
  });

  // Option selection
  options.forEach((option) => {
    option.addEventListener("click", () => {
      const questionDiv = option.closest(".quiz-content");
      const questionNum = parseInt(questionDiv.id.split("-")[1]);
      const selectedType = option.dataset.type;

      // Save selected answer
      answers[questionNum] = selectedType;

      // Optional: visually highlight selected option
      questionDiv
        .querySelectorAll(".quiz-option")
        .forEach((opt) => opt.classList.remove("selected"));
      option.classList.add("selected");

      // Check if all questions are answered
      const allAnswered = Object.values(answers).every((ans) => ans !== null);

      if (allAnswered) {
        const counts = { time: 0, shock: 0 };
        Object.values(answers).forEach((ans) => counts[ans]++);
        const finalType = counts.time >= counts.shock ? "time" : "shock";

        result.classList.remove("hidden");

        if (finalType === "time") {
          powerTypeResult.textContent = "TIME CONTROL";
          powerTypeResult.className = "text-time-blue ml-2";
          powerDescription.textContent =
            "Like Budiman, you have the ability to pause and reflect, making you a strategic hero who can change the course of events.";
        } else {
          powerTypeResult.textContent = "ELECTRIC SHOCK";
          powerTypeResult.className = "text-electric-blue ml-2";
          powerDescription.textContent =
            "Like Willsen, you're charged with energy and quick to act, making you a powerful force to be reckoned with.";
        }
      } else {
        // Hide result if quiz is not fully answered
        result.classList.add("hidden");
      }
    });
  });
}

// Mobile menu toggle
document.getElementById("mobile-menu-btn").addEventListener("click", () => {
  // Add mobile menu functionality if needed
  console.log("Mobile menu clicked");
});

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  createFloatingParticles();
  initQuiz();

  // Add event listeners
  document
    .getElementById("time-stop-btn")
    .addEventListener("click", handleTimeStop);
  document
    .getElementById("lightning-btn")
    .addEventListener("click", handleLightning);
});
