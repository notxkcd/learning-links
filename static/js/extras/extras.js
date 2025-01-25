export function openModalFunction($modal, $name) {
  $modal.removeClass("hidden");
  document.body.style.overflow = "hidden";
  $name.focus();
}

export function preventArrowKeys(event) {
  if (event.key === "ArrowUp" || event.key === "ArrowDown") {
    event.preventDefault();
  }
}
