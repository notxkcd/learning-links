import { errorMessage,toaster } from "./extras/toaster.js";

$(document).ready(() => {
  const $button = $("#verify_otp_button");
  const $resendButton = $("#resend_otp_button");

  $resendButton.on("click", async () => {
    $button.prop("disabled", true);
    $resendButton.prop("disabled", true).text("Resending...");
    var currentUrl = window.location.pathname;
    var uid = currentUrl.split("/")[3];
    var token = currentUrl.split("/")[4];

    try {
      await $.ajax({
        method: "GET",
        url: `/auth/resend-otp/${uid}/${token}/`,
        success: () => {
          $resendButton.remove();
          toaster(
            "OTP successfully resent. Please check your email.",
            "success"
          );
        },
      });
    } catch (error) {
      $resendButton.prop("disabled", false).text("Resend OTP");
      if (error.status === 404) {
        window.location.replace("/auth/sign-in/user/");
      } else {
        errorMessage(error);
      }
    }
    $button.prop("disabled", false);
  });
});