export const validatePassword = (password: string, iconValidation = false) => {
  const minLength = /^.{8,}$/;
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/;
  const hasDigit = /\d/;
  const isValid =
    minLength.test(password) &&
    hasSpecialChar.test(password) &&
    hasDigit.test(password);
  return isValid;
};
