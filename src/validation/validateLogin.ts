import { validateEmail, validatePassword } from "../utils/validators";

type LoginValues = {
  email: string,
  password: string
}

const validateLogin = (values: LoginValues) => {
  const errors: Partial<LoginValues> = {};

  const emailError = validateEmail(values.email);
  if (emailError) {
    errors.email = emailError;
  };

  const passwordError = validatePassword(values.password);
  if (passwordError) {
    errors.password = passwordError;
  }
  return errors;
}

export default validateLogin;