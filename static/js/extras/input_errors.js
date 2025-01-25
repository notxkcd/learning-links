export function showError(containerId, message) {
  const $container = $("#" + containerId);
  $container.find("label").addClass("text-red-500 hover:text-red-400");
  $container
    .find("input")
    .addClass("text-red-500 border-red-500 focus-visible:border-red-500");

  let $errorMessage = $container.find(".error-message");

  if ($errorMessage.length === 0) {
    $errorMessage = $("<p>")
      .addClass("text-red-500 text-xs error-message")
      .appendTo($container);
  }
  $errorMessage.text(message);
}

export function removeError(containerId) {
  const $container = $("#" + containerId);
  $container.find("label").removeClass("text-red-500 hover:text-red-400");
  $container
    .find("input")
    .removeClass("text-red-500 border-red-500 focus-visible:border-red-500");

  $container.find(".error-message").remove();
}

