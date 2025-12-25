document.addEventListener("DOMContentLoaded", () => {
    // "No" Button Interaction
    const noBtn = document.getElementById("noBtn");
    const yesBtn = document.getElementById("yesBtn");

    if (noBtn) {
        // For Desktop (Mouseover)
        noBtn.addEventListener("mouseover", moveButton);
        
        // For Mobile (Touchstart)
        noBtn.addEventListener("touchstart", (e) => {
            e.preventDefault(); 
            moveButton();
        });

        noBtn.addEventListener("click", (e) => {
            e.preventDefault();
            moveButton();
        });
    }

    function moveButton() {
        // Calculate new position within the viewport
        const x = (Math.random() - 0.5) * 300;
        const y = (Math.random() - 0.5) * 300;
        noBtn.style.transform = `translate(${x}px, ${y}px)`;
    }

    // "Yes" Button Interaction
    const celebration = document.getElementById("celebration");

    if (yesBtn) {
        yesBtn.addEventListener("click", () => {
            // Trigger Confetti
            fireConfetti();
            // Show Overlay
            if (celebration) celebration.classList.add("active");
            // Continuous confetti
            setInterval(fireConfetti, 2000);
        });
    }

    function fireConfetti() {
        if (typeof confetti === 'function') {
            confetti({
                particleCount: 150,
                spread: 70,
                origin: { y: 0.6 },
                colors: ["#eebbcc", "#d4af37", "#ffffff"],
            });
        }
    }
});
