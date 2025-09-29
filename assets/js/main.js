const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("show");
  menuToggle.classList.toggle("open"); // animate hamburger
});

// function for slider
const slides = document.querySelectorAll(".slide");
let current = 0;

function showSlide(index) {
  slides.forEach((s, i) => {
    s.classList.toggle("active", i === index);
  });
}

function nextSlide() {
  current = (current + 1) % slides.length;
  showSlide(current);
}

setInterval(nextSlide, 4000); // change every 4s

// Section toggle logic
const nav_Links = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("main > section, #visa-support");

nav_Links.forEach((link) => {
  link.addEventListener("click", (e) => {
    const targetId = link.getAttribute("data-target");
    if (targetId) {
      e.preventDefault();

      // Hide all sections
      sections.forEach((sec) => sec.classList.add("hidden"));

      // Show the selected one
      const target = document.getElementById(targetId);
      if (target) target.classList.remove("hidden");

      // Scroll into view
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});
