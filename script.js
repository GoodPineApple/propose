document.addEventListener("DOMContentLoaded", () => {
  // Scroll Animation Observer
  const sections = document.querySelectorAll("section");
  const observerOptions = {
    threshold: 0.2,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, observerOptions);

  sections.forEach((section) => {
    observer.observe(section);
  });

  // "No" Button Interaction
  const noBtn = document.getElementById("noBtn");
  const yesBtn = document.getElementById("yesBtn");

  // For Desktop (Mouseover)
  noBtn.addEventListener("mouseover", moveButton);

  // For Mobile (Touchstart - make it jump before click if possible, or just on touch)
  noBtn.addEventListener("touchstart", (e) => {
    e.preventDefault(); // Prevent click
    moveButton();
  });

  noBtn.addEventListener("click", (e) => {
    e.preventDefault();
    moveButton();
  });

  function moveButton() {
    const container = document.querySelector(".buttons");
    const containerRect = container.getBoundingClientRect();
    const btnRect = noBtn.getBoundingClientRect();

    // Calculate new position within the viewport safely, but let's just make it jump around loosely
    // Simple approach: random translate
    const x = (Math.random() - 0.5) * 300;
    const y = (Math.random() - 0.5) * 300;

    noBtn.style.transform = `translate(${x}px, ${y}px)`;
  }

  // "Yes" Button Interaction
  const celebration = document.getElementById("celebration");

  yesBtn.addEventListener("click", () => {
    // Trigger Confetti
    fireConfetti();

    // Show Overlay
    celebration.classList.add("active");

    // Continuous confetti
    setInterval(fireConfetti, 2000);
  });

  function fireConfetti() {
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#eebbcc", "#d4af37", "#ffffff"],
    });
  }
});
