import { preventArrowKeys } from "./extras/extras.js";
import {
  formSubmitValidation,
  validateField,
  validationRules,
} from "./extras/auth_validation.js";
import { errorMessage } from "./extras/toaster.js";

$(document).ready(() => {
  const $otp = $("#otp");
  $otp.on("keydown", preventArrowKeys);

  $otp.on("input", async (e) => {
    const inputValue = e.target.value.slice(0, 6);
    e.target.value = inputValue;
    await validateField(
      "otp_container",
      inputValue,
      validationRules["otp"].regex,
      validationRules["otp"].errorMessage
    );
  });

  const $form = $("#verify_otp_form");
  const $button = $("#verify_otp_button");
  const $resendButton = $("#resend_otp_button");

  $form.submit(async (e) => {
    e.preventDefault();

    $button.prop("disabled", true).text("Verifying OTP...");
    $resendButton.prop("disabled", true);

    let formData = new FormData();
    formData.append("otp", $otp.val());
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
          url: `/auth/verify-otp/${uid}/${token}/`,
          processData: false,
          contentType: false,
          success: () => {
            window.location.replace("/");
          },
        });
      }
    } catch (error) {
      if (error.status === 404) {
        window.location.replace("/auth/sign-in/user/");
      } else {
        errorMessage(error);
      }
    }

    $button.prop("disabled", false).text("Verify OTP");
    $resendButton.prop("disabled", false);
  });
});
