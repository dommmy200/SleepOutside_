document.addEventListener("DOMContentLoaded", function () {
  // Check if user has already seen the modal
  const hasSeenModal = localStorage.getItem("hasSeenModal");

  // If not, show the modal
  if (!hasSeenModal) {
    const modal = document.getElementById("registrationModal");
    const closeBtn = document.querySelector(".modal .close");

    modal.style.display = "block"; // Show the modal

    // Close the modal funtion
    closeBtn.onclick = function () {
      modal.style.display = "none";
      // Mark that the user has seen the modal
      localStorage.setItem("hasSeenModal", "true");
    };

    // Close the modal if the user clicks outside of the modal content implemented
    window.onclick = function (event) {
      if (event.target === modal) {
        modal.style.display = "none";
        localStorage.setItem("hasSeenModal", "true");
      }
    };
  }
});
