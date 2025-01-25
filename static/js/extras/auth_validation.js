import { removeError, showError } from "./input_errors.js";

export const validationRules = {
  username: {
    regex: /^(?=.*[a-zA-Z])[a-zA-Z .]{4,30}$/,
    errorMessage:
      "Username must be 4-30 characters long and contain only alphanumeric characters.",
  },
  email: {
    regex: /^[a-zA-Z0-9._%+-]{3,}@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    errorMessage: "Please enter a valid email address.",
  },
  password: {
    regex:
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z0-9!@#$%^&*()_+=\-[\]{}|\\:;"'<>,.?/~]{8,30}$/,
    errorMessage:
      "Password must be 8-30 characters long and include at least one lowercase letter, one uppercase letter, and one number.",
  },
  otp: {
    regex: /^\d{6}$/,
    errorMessage: "Please provide a valid 6-digit OTP.",
  },
};
export function validateField(containerId, value, regex, errorMessage) {
  if (!regex.test(value)) {
    showError(containerId, errorMessage);
    return false;
  }
  removeError(containerId);
  return true;
}

export function validatePasswordMatch(password, confirmPassword) {
  if (confirmPassword.length < 1) {
    showError(
      "confirm_password_container",
      "Password confirmation cannot be empty."
    );
    return false;
  }
  if (
    !validateField(
      "confirm_password_container",
      confirmPassword,
      validationRules["password"].regex,
      "Please Provide valid passwords"
    )
  ) {
    return false;
  }
  if (password !== confirmPassword) {
    showError("confirm_password_container", "Passwords do not match.");
    return false;
  }

  removeError("confirm_password_container");
  return true;
}

export async function formSubmitValidation(formData) {
  let isValid = true;

  for (const [inputId, value] of formData.entries()) {
    const fieldConfig = validationRules[inputId];
    if (inputId !== "confirmPassword") {
      const fieldValid = await validateField(
        `${inputId}_container`,
        value,
        fieldConfig.regex,
        fieldConfig.errorMessage
      );
      isValid = isValid && fieldValid;
    } else {
      const fieldValid = await validatePasswordMatch(
        formData.get("password"),
        formData.get("confirmPassword")
      );
      isValid = isValid && fieldValid;
    }
  }

  return isValid;
}
