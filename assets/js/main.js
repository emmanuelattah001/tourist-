// === SLIDER ===
let current = 0;
function showSlide(index) {
  const slides = document.querySelectorAll(".slide");
  slides.forEach((s, i) => {
    s.classList.toggle("active", i === index);
  });
}
function nextSlide() {
  const slides = document.querySelectorAll(".slide");
  if (slides.length === 0) return;
  current = (current + 1) % slides.length;
  showSlide(current);
}
setInterval(nextSlide, 4000);

// === LOAD NAV ===
fetch("nav.html")
  .then((res) => res.text())
  .then((data) => {
    document.getElementById("nav").innerHTML = data;

    // reattach hamburger after nav loads
    const toggle = document.getElementById("menu-toggle");
    const navLinks = document.getElementById("nav-links");
    if (toggle && navLinks) {
      toggle.addEventListener("click", () => {
        navLinks.classList.toggle("show");
        toggle.classList.toggle("open");
      });
    }
  });

// === LOAD FOOTER ===
fetch("footer.html")
  .then((res) => res.text())
  .then((data) => {
    document.getElementById("footer").innerHTML = data;
  });

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
