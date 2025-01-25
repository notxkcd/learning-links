import {
  formSubmitValidation,
  validateField,
  validationRules,
} from "./extras/auth_validation.js";
import { errorMessage } from "./extras/toaster.js";


$(document).ready(() => {
  const $form = $("#forgot_password_form");
  const $button = $("#forgot_password_button");
  const $email = $("#email");

  $email.on("input", () => {
    validateField(
      "email_container",
      $email.val(),
      validationRules["email"].regex,
      validationRules["email"].errorMessage
    );
  });

  $form.submit(async (e) => {
    e.preventDefault();

    $button.prop("disabled", true).text("Sending reset link ...");

    let formData = new FormData();
    formData.append("email", $email.val());
    let isValid = await formSubmitValidation(formData);

    try {
      if (isValid) {
        formData.append(
          "csrfmiddlewaretoken",
          $form.find("[name=csrfmiddlewaretoken]").val()
        );

        await $.ajax({
          method: "POST",
          data: formData,
          url: `/auth/forgot-password/`,
          processData: false,
          contentType: false,
          success: (data) => {
            if (data.role && data.role === "superuser") {
              window.location.replace("/auth/sign-in/superuser/");
            } else {
              window.location.replace("/auth/sign-in/user/");
            }
          },
        });
      }
    } catch (error) {
      errorMessage(error);
    }

    $button.prop("disabled", false).text("Send reset link");
  });
});