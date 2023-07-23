export function hideContent(contentElement, noContentSelectedMessageElement) {
  // Hide the content and show the "no content selected" message
  contentElement.classList.add('hide-content');
  noContentSelectedMessageElement.classList.remove('hide-content');
}

export function removeElement(id, listElement, hideContentFunction, noContentSelectedMessage, textIfEmpty, textIfNotEmpty) {
  let element = document.getElementById(id);
  let nextElement = element.nextElementSibling || element.previousElementSibling;
  element.remove();

  // If there is a next element, click on it to show its content
  // Otherwise, hide the content
  if (nextElement) {
    nextElement.click();
  } else {
    hideContentFunction();
  }

  // Check if the list is empty and update the "no content selected" message accordingly
  updateEmptyListMessage(listElement, noContentSelectedMessage, textIfEmpty, textIfNotEmpty);
}

export function updateEmptyListMessage(listElement, noContentSelectedMessage, textIfEmpty, textIfNotEmpty) {
  // Check if the list is empty
  if (listElement.children.length === 0) {
    // If it's empty, display the "no content" message and hide the list
    noContentSelectedMessage.textContent = textIfEmpty;
    noContentSelectedMessage.style.flexGrow = '1';
    listElement.style.display = 'none';
  } else {
    // If it's not empty, display the default message
    noContentSelectedMessage.textContent = textIfNotEmpty;
  }
}
