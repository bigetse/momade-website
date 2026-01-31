'use strict';

//Navbar toggle
const navToggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".header__nav");
const navLinks = document.querySelectorAll(".nav__list a");

navToggle.addEventListener("click", () => {
  nav.classList.toggle("is-open");
  navToggle.classList.toggle("is-open");

  const expanded =
    navToggle.getAttribute("aria-expanded") === "true" || false;

  navToggle.setAttribute("aria-expanded", !expanded);
});

// Close menu when clicking a link
navLinks.forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("is-open");
    navToggle.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", false);
  });
});


//Hero typing animation
const textElement = document.getElementById("hero-typing");

const words = ["Hello", "你好"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

const typingSpeed = 150;
const deletingSpeed = 120;
const pauseAfterTyping = 1200;
const pauseAfterDeleting = 400;

function typeLoop() {
  const currentWord = words[wordIndex];

  if (!isDeleting) {
    // Typing
    textElement.textContent = currentWord.slice(0, charIndex + 1);
    charIndex++;

    if (charIndex === currentWord.length) {
      setTimeout(() => (isDeleting = true), pauseAfterTyping);
    }
  } else {
    // Deleting
    textElement.textContent = currentWord.slice(0, charIndex - 1);
    charIndex--;

    if (charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      setTimeout(() => {}, pauseAfterDeleting);
    }
  }

  const speed = isDeleting ? deletingSpeed : typingSpeed;
  setTimeout(typeLoop, speed);
}

typeLoop();

// Dynamic time display

function updateTimes() {
  const now = new Date();
  const timeElements = document.querySelectorAll(".time");

  timeElements.forEach((el) => {
    const timezone = el.getAttribute("data-timezone");

    const formatter = new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
      timeZone: timezone,
    });

    el.textContent = formatter.format(now);
  });
}

updateTimes();
setInterval(updateTimes, 60 * 1000);


//Contact form
const form = document.querySelector(".contact-form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(form);

  try {
    const response = await fetch(
      "https://script.google.com/macros/s/AKfycbx4cPaDsKrwfjqr31N0rDYlV986-nW8ec7O7iufnNc3u9t6-Z0CmJDvUYrtL5Sblxn2/exec",
      {
        method: "POST",
        body: formData, // ⬅ no headers
      }
    );

    if (response.ok) {
      alert("Thank you for reaching out to Momade. We will get back to you within 2 working days.");
      form.reset();
    } else {
      alert("Something went wrong.");
    }
  } catch (err) {
    alert("Network error.");
  }
});


// Footer current year
document.getElementById("current-year").textContent =
    new Date().getFullYear();
