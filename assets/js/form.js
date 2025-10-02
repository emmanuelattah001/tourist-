// Get query string (?pass=...)
const params = new URLSearchParams(window.location.search);
const pass = params.get("pass");

if (pass) {
  const passSelect = document.getElementById("pass-type");
  if (passSelect) {
    passSelect.value = pass; // Pre-select the chosen pass
  }
}

// Visa support logic
const visaSelect = document.getElementById("visa-support");
const passportUpload = document.getElementById("passport-upload");
const passportLabel = document.getElementById("passport-label");

visaSelect.addEventListener("change", function () {
  if (this.value === "yes") {
    passportUpload.style.display = "block";
    passportLabel.style.display = "block";
    passportUpload.required = true; // make required if yes
  } else {
    passportUpload.style.display = "none";
    passportLabel.style.display = "none";
    passportUpload.required = false;
    passportUpload.value = ""; // reset if hidden
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("ticket-form");
  const visaSelect = document.getElementById("visa-support");
  const passportContainer = document.getElementById(
    "passport-upload-container"
  );
  const passportInput = document.getElementById("passport-upload");
  const passSelect = document.getElementById("pass-type");
  const ticketInput = document.getElementById("ticket");

  // Show/hide passport upload
  visaSelect.addEventListener("change", function () {
    if (this.value === "yes") {
      passportContainer.style.display = "block";
      passportInput.required = true;
    } else {
      passportContainer.style.display = "none";
      passportInput.required = false;
      passportInput.value = "";
    }
  });

  // Form validation + redirect to checkout
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Simple validation
    const fullname = document.getElementById("fullname").value.trim();
    const email = document.getElementById("email").value.trim();
    const nationality = document.getElementById("nationality").value.trim();
    const country = document.getElementById("country").value.trim();
    const address = document.getElementById("address").value.trim();

    if (!fullname || !email || !nationality || !country || !address) {
      alert("⚠️ Please fill in all required fields.");
      return;
    }

    if (visaSelect.value === "yes" && !passportInput.files.length) {
      alert("⚠️ Please upload your international passport.");
      return;
    }

    if (!passSelect.value) {
      alert("⚠️ Please select a pass type.");
      return;
    }

    // Calculate total
    const passPrice = parseInt(passSelect.selectedOptions[0].dataset.price);
    const tickets = parseInt(ticketInput.value) || 1;
    const total = passPrice * tickets;

    // Redirect to checkout with query string
    const query = `?pass=${encodeURIComponent(
      passSelect.value
    )}&qty=${tickets}&total=${total}`;
    window.location.href = "checkout.html" + query;
  });
});
