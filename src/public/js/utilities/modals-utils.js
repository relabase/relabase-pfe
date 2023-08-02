document.addEventListener('DOMContentLoaded', (event) => {
  closeModalWhenClickedOutside('modal');
  closeModalWhenCloseClicked('close-modal-button', 'modal');
});

// Close the modal when anywhere outside the modal content is clicked
function closeModalWhenClickedOutside(modalId) {
  var modal = document.getElementById(modalId);
  if (modal) {
      modal.addEventListener('click', function(event) {
          if (event.target == this) {
              this.style.display = "none";
          }
      });
  } else {
      console.error(`No element found with id "${modalId}"`);
  }
}

// Close the modal when the close button is clicked
function closeModalWhenCloseClicked(closeButtonId, modalId) {
  var closeButton = document.getElementById(closeButtonId);
  if (closeButton) {
      closeButton.addEventListener('click', function() {
          var modal = document.getElementById(modalId);
          if (modal) {
              modal.style.display = "none";
          } else {
              console.error(`No element found with id "${modalId}"`);
          }
      });
  } else {
      console.error(`No element found with id "${closeButtonId}"`);
  }
}