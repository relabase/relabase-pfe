export function hideContent(content, noContentSelectedMessage) {
  // Hide the content and show the "no content selected" message
  content.classList.add('hide-content');
  noContentSelectedMessage.classList.remove('hide-content');
}

export function remove(id, list, hideContentFunction, noContentSelectedMessage, textIfEmpty, textIfNotEmpty) {
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
  checkEmptyList(list, noContentSelectedMessage, textIfEmpty, textIfNotEmpty);
}

export function checkEmptyList(list, noContentSelectedMessage, textIfEmpty, textIfNotEmpty) {
  // Check if the list is empty
  if (list.children.length === 0) {
    // If it's empty, display the "no content" message and hide the list
    noContentSelectedMessage.textContent = textIfEmpty;
    noContentSelectedMessage.style.flexGrow = '1';
    list.style.display = 'none';
  } else {
    // If it's not empty, display the default message
    noContentSelectedMessage.textContent = textIfNotEmpty;
  }
}
