import { showError, removeError } from "./input_errors.js";

export function emis_validation($emis) {
  if ($emis.val().length < 3) {
    showError("emis_container", "Not a vald emis ID");
    return false;
  } else {
    removeError("emis_container");
    return true;
  }
}

export function class_name_validation($class_name) {
  $class_name.val($class_name.val().slice(0, 2));
  const value = parseInt($class_name.val(), 10);
  if (!isNaN(value)) {
    $class_name.val(value);
  }

  if (isNaN(value) || value < 1 || value > 12) {
    showError("class_name_container", "Class name must be between 1 and 12.");
    return false;
  } else {
    removeError("class_name_container");
    return true;
  }
}

export function dob_validation($dob) {
  const dobValue = $dob.val();
  if (!dobValue) {
    showError("dob_container", "Not a valid D.O.B");
    return false;
  }
  const today = new Date();
  const dob = new Date(dobValue);

  if (dob.getFullYear() + 4 >= today.getFullYear()) {
    showError("dob_container", "D.O.B should be less than this year");
    return false;
  } else {
    removeError("dob_container");
    return true;
  }
}

export function name_validation($name) {
  $name.val($name.val().trimStart());
  if ($name.val().length < 4 || $name.val().length > 30) {
    showError("name_container", "Please enter student name");
    return false;
  } else {
    removeError("name_container");
    return true;
  }
}

export function year_validation($year) {
  const value = parseInt($year.val(), 10);
  if (!isNaN(value)) $year.val(value);
  if (isNaN(value) || $year.val().length < 4) {
    showError("year_container", "Not a valid year");
    return false;
  } else {
    removeError("year_container");
    return true;
  }
}
