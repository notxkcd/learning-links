export function toaster(message, type = "error") {
  const $container = $("body");

  if ($container.length === 0) return;

  const $existingToast = $(".message");

  if ($existingToast.length > 0) {
    $existingToast.remove();
  }

  const $toast = $("<div>", {
    class: `toast message ${type}`,
  });

  const $messageParagraph = $("<p>").text(message);
  const $closeButton = $("<button>", {
    class: "btn size-6 rounded-full absolute -top-3 -left-3 ",
  });

  const typeClasses = {
    error: "bg-red-500",
    success: "bg-green-500",
    info: "bg-yellow-500",
  };

  $closeButton.addClass(typeClasses[type]).html(`
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="!size-4">
      <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
    </svg>
  `);

  $toast.append($messageParagraph);
  $toast.append($closeButton);

  $closeButton.on("click", () => {
    $toast.remove();
  });

  $container.append($toast);
}
export function errorMessage(error) {
  if (error?.responseJSON) {
    const errorMessages = Object.values(error?.responseJSON).join(" \n");
    toaster(errorMessages);
  } else {
    toaster("Network Error: Unable to process your request at the moment.");
  }
}
