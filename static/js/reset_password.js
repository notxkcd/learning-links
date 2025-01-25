import {
  formSubmitValidation,
  validateField,
  validatePasswordMatch,
  validationRules,
} from "./extras/auth_validation.js";
import { errorMessage } from "./extras/toaster.js";

$(document).ready(() => {
  const $form = $("#reset_password_form");
  const $button = $("#reset_password_button");

  const $password = $("#password");
  $password.focus();
  const $confirmPassword = $("#confirm_password");

  $form.find("input").on("input", async () => {
    await validateField(
      "password_container",
      $password.val(),
      validationRules["password"].regex,
      validationRules["password"].errorMessage
    );
    await validatePasswordMatch($password.val(), $confirmPassword.val());
  });

  $form.submit(async (e) => {
    e.preventDefault();
    $button.prop("disabled", true).text("Changing password ...");

    let formData = new FormData();
    formData.append("password", $password.val());
    formData.append("confirmPassword", $confirmPassword.val());
    let isValid = await formSubmitValidation(formData);

    try {
      if (isValid) {
        formData.append(
          "csrfmiddlewaretoken",
          $form.find("[name=csrfmiddlewaretoken]").val()
        );
        var currentUrl = window.location.pathname;
        var uid = currentUrl.split("/")[3];
        var token = currentUrl.split("/")[4];

        await $.ajax({
          method: "POST",
          data: formData,
          url: `/auth/reset-password/${uid}/${token}/`,
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
      if (error.status === 404) {
        window.location.replace("/auth/forgot-password/");
      } else {
        errorMessage(error);
      }
    }

    $button.prop("disabled", false).text("Change password");
  });
});
