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

  // Observe Images for Scroll Animation
  const images = document.querySelectorAll(".memory-card-carousel");
  images.forEach((img) => {
    observer.observe(img);
  });

  // "No" Button Interaction
  const noBtn = document.getElementById("noBtn");
  const yesBtn = document.getElementById("yesBtn");

  // For Desktop (Mouseover)
  noBtn.addEventListener("mouseover", moveButton);

  // For Mobile (Touchstart - make it jump properly)
  noBtn.addEventListener("touchstart", (e) => {
    // We don't preventDefault immediately if we want to allow some interaction, 
    // but for the "run away" effect, preventing default is good to stop the click.
    e.preventDefault(); 
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
