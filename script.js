// Juhu — The Nasha Effect
const $ = (selector) => document.querySelector(selector);

// Smoothly move into the main experience.
$("#enterBtn").addEventListener("click", () => {
  $("#world").scrollIntoView({ behavior: "smooth" });
});

// Reveal sections as they enter the viewport.
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach((item) => revealObserver.observe(item));

// Create subtle CSS-only floating particles (no images or audio).
const particleLayer = $("#particles");
for (let i = 0; i < 28; i++) {
  const particle = document.createElement("span");
  particle.className = "particle";
  particle.style.left = `${Math.random() * 100}%`;
  particle.style.top = `${Math.random() * 100}%`;
  particle.style.animationDuration = `${12 + Math.random() * 18}s`;
  particle.style.animationDelay = `${Math.random() * -25}s`;
  particle.style.transform = `scale(${0.5 + Math.random() * 1.5})`;
  particleLayer.appendChild(particle);
}

// Open the letter once, then type it out.
const letterText = `Dear Nasha,

Tumhe shayad pata bhi nahi hoga ki tumhari personality kitni interesting hai.

Tumhari baaton mein ek alag charm hai, tumhare nature mein ek alag sweetness hai aur tumhari vibe mein kuch aisa hai jo easily explain nahi kiya ja sakta.

Tumse baat karna ek normal conversation nahi, kabhi-kabhi ek beautiful memory ban jaata hai.

Bas aisi hi rehna. Thodi crazy, thodi cute, thodi unpredictable aur completely ORIGINAL.

You are one of a kind, Juhu. ❤️`;

let letterOpened = false;
$("#envelopeBtn").addEventListener("click", () => {
  if (letterOpened) return;
  letterOpened = true;
  $("#envelopeBtn").classList.add("open");
  $("#letterPaper").classList.add("show");
  $("#envelopeBtn").setAttribute("aria-label", "Letter opened");
  const output = $("#typedLetter");
  let index = 0;
  const typeNext = () => {
    if (index < letterText.length) {
      output.textContent += letterText.charAt(index);
      index++;
      setTimeout(typeNext, letterText.charAt(index - 1) === "\n" ? 180 : 24);
    }
  };
  setTimeout(typeNext, 450);
});

// Reveal the secret surprise.
$("#secretBtn").addEventListener("click", () => {
  const reveal = $("#secretReveal");
  reveal.classList.add("show");
  $("#secretBtn").textContent = "SECRET UNLOCKED ✦";
  $("#secretBtn").disabled = true;
  $("#secretBtn").style.opacity = ".65";
});

// Return to the top.
$("#backTop").addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
