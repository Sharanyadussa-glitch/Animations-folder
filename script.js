/**
 * The Starlight Gala & Celebration
 * Interactivity & Dynamic Animation Controller
 */

document.addEventListener('DOMContentLoaded', () => {
  const card = document.getElementById('invitationCard');
  const openCardBtn = document.getElementById('openCardBtn');
  const flipBackBtn = document.getElementById('flipBackBtn');
  const flipToggleBtn = document.getElementById('flipToggleBtn');
  const rsvpBtn = document.getElementById('rsvpBtn');
  const confettiTriggerBtn = document.getElementById('confettiTriggerBtn');
  const confettiContainer = document.getElementById('confettiContainer');
  const starsContainer = document.getElementById('starsContainer');
  const rsvpToast = document.getElementById('rsvpToast');

  // 1. Generate Twinkling Background Stars
  function generateStars(count = 70) {
    if (!starsContainer) return;
    starsContainer.innerHTML = '';
    
    for (let i = 0; i < count; i++) {
      const star = document.createElement('div');
      star.className = 'star';
      
      const size = Math.random() * 3 + 1; // 1px to 4px
      const posX = Math.random() * 100;
      const posY = Math.random() * 100;
      const duration = (Math.random() * 3 + 2).toFixed(1); // 2s - 5s
      const delay = (Math.random() * 4).toFixed(1);

      star.style.width = `${size}px`;
      star.style.height = `${size}px`;
      star.style.left = `${posX}%`;
      star.style.top = `${posY}%`;
      star.style.setProperty('--twinkle-duration', `${duration}s`);
      star.style.animationDelay = `${delay}s`;

      starsContainer.appendChild(star);
    }
  }

  // 2. Interactive 3D Card Flip (CSS Transition Trigger)
  function toggleFlip(e) {
    if (e) e.stopPropagation();
    const isFlipped = card.classList.toggle('is-flipped');
    card.setAttribute('aria-expanded', isFlipped);

    // If opening for the first time, celebrate with confetti!
    if (isFlipped) {
      triggerConfetti(35);
    }
  }

  function flipToFront(e) {
    if (e) e.stopPropagation();
    card.classList.remove('is-flipped');
    card.setAttribute('aria-expanded', 'false');
  }

  // Event Listeners for Flip
  if (card) {
    card.addEventListener('click', (e) => {
      // Don't flip if clicking interactive buttons inside the card
      if (e.target.closest('button') || e.target.closest('a')) return;
      toggleFlip(e);
    });

    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleFlip(e);
      }
    });
  }

  if (openCardBtn) {
    openCardBtn.addEventListener('click', (e) => {
      toggleFlip(e);
    });
  }

  if (flipBackBtn) {
    flipBackBtn.addEventListener('click', (e) => {
      flipToFront(e);
    });
  }

  if (flipToggleBtn) {
    flipToggleBtn.addEventListener('click', (e) => {
      toggleFlip(e);
    });
  }

  // 3. Dynamic Confetti Blast (CSS Keyframe Animation: confettiFall)
  const confettiColors = ['#ffd700', '#f72585', '#9d4edd', '#4cc9f0', '#ffffff', '#ffe066'];

  function triggerConfetti(amount = 50) {
    if (!confettiContainer) return;

    for (let i = 0; i < amount; i++) {
      const piece = document.createElement('div');
      piece.className = 'confetti-piece';

      const color = confettiColors[Math.floor(Math.random() * confettiColors.length)];
      const startX = Math.random() * 100;
      const duration = (Math.random() * 2 + 2).toFixed(2); // 2s - 4s
      const delay = (Math.random() * 0.6).toFixed(2);
      const width = Math.random() * 8 + 6;
      const height = Math.random() * 12 + 8;
      const isCircle = Math.random() > 0.6;

      piece.style.backgroundColor = color;
      piece.style.left = `${startX}%`;
      piece.style.width = `${width}px`;
      piece.style.height = `${height}px`;
      piece.style.borderRadius = isCircle ? '50%' : '2px';
      piece.style.animationDuration = `${duration}s`;
      piece.style.animationDelay = `${delay}s`;

      confettiContainer.appendChild(piece);

      // Clean up DOM after animation completes
      setTimeout(() => {
        piece.remove();
      }, (parseFloat(duration) + parseFloat(delay) + 0.5) * 1000);
    }
  }

  if (confettiTriggerBtn) {
    confettiTriggerBtn.addEventListener('click', () => {
      triggerConfetti(60);
      // Trigger dynamic Animate.css tada effect on the button
      confettiTriggerBtn.classList.add('animate__animated', 'animate__tada');
      setTimeout(() => {
        confettiTriggerBtn.classList.remove('animate__animated', 'animate__tada');
      }, 1000);
    });
  }

  // 4. RSVP Button Action & External Library Dynamic Animation
  if (rsvpBtn) {
    rsvpBtn.addEventListener('click', (e) => {
      e.stopPropagation();

      // Dynamically add Animate.css tada animation
      rsvpBtn.classList.add('animate__animated', 'animate__tada');
      triggerConfetti(80);

      // Show toast using CSS transition
      if (rsvpToast) {
        rsvpToast.classList.add('show');
        rsvpBtn.innerHTML = '<span>✅</span> RSVP Confirmed &bull; See You There!';
        rsvpBtn.style.background = 'linear-gradient(135deg, #2ec4b6 0%, #20bf6b 100%)';
        rsvpBtn.style.color = '#ffffff';

        setTimeout(() => {
          rsvpToast.classList.remove('show');
        }, 4000);
      }

      setTimeout(() => {
        rsvpBtn.classList.remove('animate__animated', 'animate__tada');
      }, 1000);
    });
  }

  // Initialize Stars
  generateStars(85);
});

