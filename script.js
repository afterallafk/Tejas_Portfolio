// Select all cards for animation
const cards = document.querySelectorAll('.card');

// Intersection Observer for fade-in effect for cards
const cardsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible'); // Add visible class for fade-in
        cardsObserver.unobserve(entry.target); // Stop observing once visible
      }
    });
  },
  { threshold: 0.1 } // Trigger when 10% of the element is visible
);

// Attach observer to each card
cards.forEach((card) => cardsObserver.observe(card));

// Ensure dynamic resizing of card content
window.addEventListener('resize', () => {
  cards.forEach(card => {
    card.style.height = 'auto'; // Reset height to adjust content
    card.style.height = card.scrollHeight + 'px'; // Adjust to content
  });
});

// Smooth Scroll for CTA button
document.querySelector('.cta-btn')?.addEventListener('click', function (e) {
  e.preventDefault();

  document.querySelector('#projects').scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  });
});

// Function to display birthday wish with animations
function showBirthdayWish() {
  const body = document.body;

  // Create a modal container
  const modal = document.createElement('div');
  modal.classList.add('modal'); // Add modal class for animation

  // Create the wish content
  const wishContent = document.createElement('div');
  wishContent.classList.add('wish-content'); // Add wish-content class for animation
  wishContent.innerHTML = `
    <h1>🎉 Happy Birthday, Brother! 🎉</h1>
    <p>Wishing you a fantastic day filled with love, joy, and everything you deserve!</p>
    <button id="closeWish">Close</button>
  `;

  modal.appendChild(wishContent);
  body.appendChild(modal);

  // Close the modal when the button is clicked
  document.getElementById('closeWish').addEventListener('click', () => {
    modal.remove();
  });

  // Optionally, play a birthday tune
  const audio = new Audio('birthday-tune.mp3'); // Replace with your audio file URL
  audio.play();
}

// Function to check the date and play the wish
function checkBirthday(testDate = null) {
  const today = testDate || new Date(); // Use the test date if provided, else the system date
  const isBirthday = today.getDate() === 2 && today.getMonth() === 11; // December is month 11
  const hasPlayed = localStorage.getItem('birthdayWishPlayed');

  if (isBirthday && !hasPlayed) {
    showBirthdayWish();
    localStorage.setItem('birthdayWishPlayed', 'true'); // Set flag to prevent repeat on reload
  }
}

// Reset the birthday flag daily
function resetBirthdayFlag() {
  const lastReset = localStorage.getItem('lastReset');
  const today = new Date().toISOString().split('T')[0];

  if (lastReset !== today) {
    localStorage.removeItem('birthdayWishPlayed'); // Reset the flag
    localStorage.setItem('lastReset', today); // Update reset date
  }
}

// Run the logic for production
resetBirthdayFlag();
checkBirthday();