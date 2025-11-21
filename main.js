// Form handling following class methods
console.log("Loading form script...");

// DOM element references
const form = document.querySelector("#webform");
const summarySection = document.querySelector("#form-summary article");
const nameOutput = document.querySelector("#nameOutput");
const emailOutput = document.querySelector("#emailOutput");
const descriptionOutput = document.querySelector("#descriptionOutput");

// Form data variables
let formData = new FormData();

// Event listeners
document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM loaded, setting up form...");

  if (form) {
    form.addEventListener("submit", handleSubmit);
  }
});

function handleSubmit(event) {
  event.preventDefault();
  console.log("Form submitted");

  // Get form data
  const formData = new FormData(form);

  // Validate form
  if (!validateForm(formData)) {
    return;
  }

  // Display summary
  displaySummary(formData);

  // Show success message
  showSuccessMessage();
}

function validateForm(formData) {
  console.log("Validating form...");

  // Clear previous errors
  clearErrors();

  let isValid = true;

  // Check name field
  const name = formData.get("name");
  if (!name || name.trim() === "") {
    showError("name", "Navn er påkrævet");
    isValid = false;
  }

  // Check email field
  const email = formData.get("email");
  if (!email || email.trim() === "") {
    showError("email", "Email er påkrævet");
    isValid = false;
  } else if (!isValidEmail(email)) {
    showError("email", "Indtast venligst en gyldig email-adresse");
    isValid = false;
  }

  // Check location field
  const location = formData.get("location");
  if (!location || location.trim() === "") {
    showError("location", "Lokation er påkrævet");
    isValid = false;
  }

  // Check incident type
  const incidentType = formData.get("incident-type");
  if (!incidentType || incidentType === "") {
    showError("incident-type", "Vælg venligst en hændelsestype");
    isValid = false;
  }

  // Check description
  const description = formData.get("description");
  if (!description || description.trim() === "") {
    showError("description", "Beskrivelse er påkrævet");
    isValid = false;
  }

  // Check severity
  const severity = formData.get("severity");
  if (!severity || severity === "") {
    showError("severity", "Vælg venligst alvorlighedsgrad");
    isValid = false;
  }

  return isValid;
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function showError(fieldName, message) {
  const field = document.querySelector("#" + fieldName);
  if (field) {
    field.classList.add("error");

    // Remove existing error message
    const existingError = field.parentNode.querySelector(".error-message");
    if (existingError) {
      existingError.remove();
    }

    // Create new error message
    const errorDiv = document.createElement("div");
    errorDiv.className = "error-message";
    errorDiv.textContent = message;
    field.parentNode.appendChild(errorDiv);
  }
}

function clearErrors() {
  const errorFields = document.querySelectorAll(".error");
  const errorMessages = document.querySelectorAll(".error-message");

  for (let i = 0; i < errorFields.length; i++) {
    errorFields[i].classList.remove("error");
  }

  for (let i = 0; i < errorMessages.length; i++) {
    errorMessages[i].remove();
  }
}

function displaySummary(formData) {
  console.log("Displaying summary...");

  // Get form values
  const name = formData.get("name");
  const email = formData.get("email");
  const phone = formData.get("phone");
  const location = formData.get("location");
  const incidentType = formData.get("incident-type");
  const description = formData.get("description");
  const severity = formData.get("severity");
  const incidentDate = formData.get("incident-date");
  const incidentTime = formData.get("incident-time");
  const anonymous = formData.get("anonymous");

  // Create summary HTML
  let summaryHTML = "<h3>Indberetning Modtaget</h3>";

  summaryHTML += '<div class="summary-item">';
  summaryHTML += "<strong>Navn:</strong> ";
  summaryHTML += anonymous ? "Anonymt" : name;
  summaryHTML += "</div>";

  summaryHTML += '<div class="summary-item">';
  summaryHTML += "<strong>Email:</strong> ";
  summaryHTML += anonymous ? "Skjult" : email;
  summaryHTML += "</div>";

  if (phone) {
    summaryHTML += '<div class="summary-item">';
    summaryHTML += "<strong>Telefon:</strong> " + phone;
    summaryHTML += "</div>";
  }

  summaryHTML += '<div class="summary-item">';
  summaryHTML += "<strong>Lokation:</strong> " + location;
  summaryHTML += "</div>";

  summaryHTML += '<div class="summary-item">';
  summaryHTML += "<strong>Type:</strong> " + getIncidentTypeText(incidentType);
  summaryHTML += "</div>";

  summaryHTML += '<div class="summary-item">';
  summaryHTML +=
    "<strong>Alvorlighedsgrad:</strong> " + getSeverityText(severity);
  summaryHTML += "</div>";

  summaryHTML += '<div class="summary-item">';
  summaryHTML += "<strong>Beskrivelse:</strong> " + description;
  summaryHTML += "</div>";

  if (incidentDate) {
    summaryHTML += '<div class="summary-item">';
    summaryHTML += "<strong>Dato:</strong> " + formatDate(incidentDate);
    if (incidentTime) {
      summaryHTML += " kl. " + incidentTime;
    }
    summaryHTML += "</div>";
  }

  summaryHTML += '<div class="summary-item">';
  summaryHTML += "<strong>Indberettet:</strong> " + getCurrentDateTime();
  summaryHTML += "</div>";

  // Display in summary section
  summarySection.innerHTML = summaryHTML;
}

function getIncidentTypeText(type) {
  if (type === "ai-malfunction") {
    return "AI Fejlfunktion";
  } else if (type === "suspicious-behavior") {
    return "Mistænkelig AI Adfærd";
  } else if (type === "unauthorized-access") {
    return "Uautoriseret Adgang";
  } else if (type === "data-breach") {
    return "Databrud";
  } else if (type === "other") {
    return "Andet";
  } else {
    return type;
  }
}

function getSeverityText(severity) {
  if (severity === "low") {
    return "Lav";
  } else if (severity === "medium") {
    return "Middel";
  } else if (severity === "high") {
    return "Høj";
  } else if (severity === "critical") {
    return "Kritisk";
  } else {
    return severity;
  }
}

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("da-DK");
}

function formatDateTime(dateTimeString) {
  const date = new Date(dateTimeString);
  return date.toLocaleString("da-DK");
}

function getCurrentDateTime() {
  const now = new Date();
  return now.toLocaleString("da-DK");
}

function showSuccessMessage() {
  console.log("Showing success message...");

  // Create success message element
  const successMessage = document.createElement("div");
  successMessage.className = "success-message";

  const successContent = document.createElement("div");
  successContent.className = "success-content";

  const heading = document.createElement("h3");
  heading.textContent = "✓ Indberetning Sendt";

  const text = document.createElement("p");
  text.textContent =
    "Tak for din indberetning. Vi vil gennemgå den hurtigst muligt.";

  successContent.appendChild(heading);
  successContent.appendChild(text);
  successMessage.appendChild(successContent);

  // Add to page
  document.body.appendChild(successMessage);

  // Remove after 5 seconds
  setTimeout(function () {
    successMessage.remove();
  }, 5000);

  // Scroll to summary
  summarySection.scrollIntoView({ behavior: "smooth" });
}

// Interactive SVG Functionality
document.addEventListener("DOMContentLoaded", function () {
  console.log("Setting up interactive SVG...");

  // Get all hotspots and popups
  const hotspots = document.querySelectorAll(".hotspot");
  const popups = document.querySelectorAll(".popup-modal");
  const closeButtons = document.querySelectorAll(".close-popup");

  // Add click events to hotspots
  for (let i = 0; i < hotspots.length; i++) {
    hotspots[i].addEventListener("click", function () {
      const hotspotId = this.id;
      const popupId = hotspotId.replace("hotspot", "popup");
      const popup = document.querySelector("#" + popupId);

      console.log("Hotspot clicked:", hotspotId);

      if (popup) {
        showPopup(popup);
      }
    });

    // Add hover effects with sound feedback
    hotspots[i].addEventListener("mouseenter", function () {
      this.style.transform = "scale(1.3)";
      this.style.filter = "drop-shadow(0 0 10px var(--color-accent))";
    });

    hotspots[i].addEventListener("mouseleave", function () {
      this.style.transform = "scale(1)";
      this.style.filter = "none";
    });
  }

  // Add click events to close buttons
  for (let i = 0; i < closeButtons.length; i++) {
    closeButtons[i].addEventListener("click", function () {
      const targetId = this.getAttribute("data-target");
      const popup = document.querySelector("#" + targetId);

      if (popup) {
        hidePopup(popup);
      }
    });
  }

  // Close popup when clicking outside the content
  for (let i = 0; i < popups.length; i++) {
    popups[i].addEventListener("click", function (event) {
      if (event.target === this) {
        hidePopup(this);
      }
    });
  }

  // Close popup with Escape key
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      const activePopup = document.querySelector(".popup-modal.active");
      if (activePopup) {
        hidePopup(activePopup);
      }
    }
  });
});

function showPopup(popup) {
  console.log("Showing popup:", popup.id);

  // Hide all other popups first
  const allPopups = document.querySelectorAll(".popup-modal");
  for (let i = 0; i < allPopups.length; i++) {
    allPopups[i].classList.remove("active");
  }

  // Show the selected popup
  popup.classList.add("active");

  // Prevent body scrolling
  document.body.style.overflow = "hidden";

  // Focus on the popup for accessibility
  const closeButton = popup.querySelector(".close-popup");
  if (closeButton) {
    closeButton.focus();
  }
}

function hidePopup(popup) {
  console.log("Hiding popup:", popup.id);

  popup.classList.remove("active");

  // Restore body scrolling
  document.body.style.overflow = "";

  // Return focus to the corresponding hotspot
  const popupId = popup.id;
  const hotspotId = popupId.replace("popup", "hotspot");
  const hotspot = document.querySelector("#" + hotspotId);

  if (hotspot) {
    hotspot.focus();
  }
}

// Add keyboard navigation for hotspots
document.addEventListener("keydown", function (event) {
  const focusedElement = document.activeElement;

  if (focusedElement && focusedElement.classList.contains("hotspot")) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      focusedElement.click();
    }
  }
});

// Make hotspots focusable for accessibility
document.addEventListener("DOMContentLoaded", function () {
  const hotspots = document.querySelectorAll(".hotspot");

  for (let i = 0; i < hotspots.length; i++) {
    hotspots[i].setAttribute("tabindex", "0");
    hotspots[i].setAttribute("role", "button");
    hotspots[i].setAttribute("aria-label", "Interactive hotspot " + (i + 1));
  }
});
