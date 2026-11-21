document.addEventListener('DOMContentLoaded', () => {
  /* =========================================================
     1. CINEMATIC ENTRY TRANSITION
     ========================================================= */
  const entryScreen = document.getElementById('entry-screen');
  const enterBtn = document.getElementById('enterBtn');
  const mainExperience = document.getElementById('main-experience');

  enterBtn.addEventListener('click', () => {
    entryScreen.classList.add('fade-out');
    mainExperience.classList.remove('hidden');

    // Trigger initial viewport checks after unveiling main content
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'instant' });
      handleScrollAnimations();
    }, 150);
  });

  /* =========================================================
     2. SCROLL PROGRESS BAR & REVEAL OBSERVER
     ========================================================= */
  const scrollProgress = document.getElementById('scrollProgress');
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  const promiseContainer = document.getElementById('promiseContainer');
  const promiseCards = document.querySelectorAll('.promise-card');
  let promisesTriggered = false;

  function updateScrollProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (docHeight > 0) {
      const percent = (scrollTop / docHeight) * 100;
      scrollProgress.style.width = `${percent}%`;
    }
  }

  function handleScrollAnimations() {
    const triggerBottom = window.innerHeight * 0.86;

    revealElements.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < triggerBottom) {
        el.classList.add('is-visible');
      }
    });

    // Sequential reveal for Section 7 — Friendship Promise
    if (!promisesTriggered && promiseContainer) {
      const promiseRect = promiseContainer.getBoundingClientRect();
      if (promiseRect.top < window.innerHeight * 0.85) {
        promisesTriggered = true;
        promiseCards.forEach((card, index) => {
          setTimeout(() => {
            card.classList.add('show-promise');
          }, index * 550);
        });
      }
    }
  }

  window.addEventListener('scroll', () => {
    updateScrollProgress();
    handleScrollAnimations();
  }, { passive: true });

  /* =========================================================
     3. INTERACTIVE LUXURY ENVELOPE & TYPING LETTER
     ========================================================= */
  const luxuryEnvelope = document.getElementById('luxuryEnvelope');
  const letterSheet = document.getElementById('letterSheet');
  const typedLetterBody = document.getElementById('typedLetterBody');
  const letterCursor = document.getElementById('letterCursor');
  const closeLetterBtn = document.getElementById('closeLetterBtn');

  const letterText = `Dear Nasha,

Tumhe shayad pata bhi nahi hoga ki tumhari personality kitni interesting hai.

Tumhari baaton mein ek alag charm hai, tumhare nature mein ek alag sweetness hai aur tumhari vibe mein kuch aisa hai jo easily explain nahi kiya ja sakta.

Tumse baat karna ek normal conversation nahi, kabhi-kabhi ek beautiful memory ban jaata hai.

Bas aisi hi rehna. Thodi crazy, thodi cute, thodi unpredictable aur completely ORIGINAL.

You are one of a kind, Juhu. ❤️`;

  let typingTimer = null;
  let isTyping = false;
  let letterOpenedOnce = false;

  function startTypingLetter() {
    if (isTyping) return;
    isTyping = true;
    typedLetterBody.textContent = '';
    letterCursor.style.display = 'inline-block';

    let charIndex = 0;
    const speed = 28; // Smooth luxury typing cadence

    function typeNextChar() {
      if (charIndex < letterText.length) {
        typedLetterBody.textContent += letterText.charAt(charIndex);
        charIndex++;
        typingTimer = setTimeout(typeNextChar, speed);
      } else {
        isTyping = false;
        letterOpenedOnce = true;
      }
    }

    typeNextChar();
  }

  function openEnvelope() {
    luxuryEnvelope.classList.add('opened');
    setTimeout(() => {
      letterSheet.classList.remove('hidden');
      letterSheet.scrollIntoView({ behavior: 'smooth', block: 'center' });
      if (!letterOpenedOnce && !isTyping) {
        startTypingLetter();
      }
    }, 380);
  }

  luxuryEnvelope.addEventListener('click', openEnvelope);
  luxuryEnvelope.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openEnvelope();
    }
  });

  closeLetterBtn.addEventListener('click', () => {
    letterSheet.classList.add('hidden');
    luxuryEnvelope.classList.remove('opened');
  });

  /* =========================================================
     4. INTERACTIVE SECRET SURPRISE
     ========================================================= */
  const unlockSecretBtn = document.getElementById('unlockSecretBtn');
  const secretBtnLabel = document.getElementById('secretBtnLabel');
  const secretRevealBox = document.getElementById('secretRevealBox');

  unlockSecretBtn.addEventListener('click', () => {
    const isHidden = secretRevealBox.classList.contains('hidden');
    if (isHidden) {
      secretRevealBox.classList.remove('hidden');
      secretBtnLabel.textContent = 'SECRET UNLOCKED 🔓';
    } else {
      secretRevealBox.classList.add('hidden');
      secretBtnLabel.textContent = 'UNLOCK A SECRET 🔐';
    }
  });
});
