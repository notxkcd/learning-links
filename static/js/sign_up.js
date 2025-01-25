import {
  formSubmitValidation,
  validateField,
  validatePasswordMatch,
  validationRules,
} from "./extras/auth_validation.js";
import { errorMessage } from "./extras/toaster.js";

$(document).ready(() => {
  const $form = $("#sign_up_form");
  const $button = $("#sign_up_button");

  $form.find("input").on("input", async (e) => {
    const inputId = e.target.id;

    if (inputId === "confirm_password" || inputId === "password") {
      const confirmPassword = $form.find("input[id='confirm_password']").val();
      const password = $form.find("input[id='password']").val();

      await validateField(
        `password_container`,
        password,
        validationRules["password"].regex,
        validationRules["password"].errorMessage
      );
      await validatePasswordMatch(password, confirmPassword);
    } else {
      validateField(
        `${inputId}_container`,
        e.target.value,
        validationRules[inputId].regex,
        validationRules[inputId].errorMessage
      );
    }
  });

  $form.submit(async (e) => {
    e.preventDefault();
    $button.prop("disabled", true).text("Creating account...");

    let formData = new FormData();
    formData.append(
      "username",
      $form.find("input[id='username']").val().trim()
    );
    formData.append("email", $form.find("input[id='email']").val());
    formData.append("password", $form.find("input[id='password']").val());
    formData.append(
      "confirmPassword",
      $form.find("input[id='confirm_password']").val()
    );

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
          url: "/auth/sign-up/",
          processData: false,
          contentType: false,
          success: () => {
            window.location.replace("/auth/sign-in/user/");
          },
        });
      }
    } catch (error) {
      errorMessage(error);
    }

    $button.prop("disabled", false).text("Create an account");
  });
});
