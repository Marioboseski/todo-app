import { requred, validateEmail, validatePassword } from "../utils/validators";

type RegisterValues = {
  name: string,
  lastname: string,
  email: string,
  password: string,
  location: string,
  phoneNumber: string
}

const validateRegister = (values: RegisterValues) => {

  const errors: Partial<RegisterValues> = {};

  const nameError = requred(values.name, "Name");
  if (nameError) {
    errors.name = nameError;
  }

  const lastnameError = requred(values.lastname, "Lastname");
  if (lastnameError) {
    errors.lastname = lastnameError;
  }

  const emailError = validateEmail(values.email);
  if (emailError) {
    errors.email = emailError;
  }

  const passwordError = validatePassword(values.password);
  if (passwordError) {
    errors.password = passwordError;
  }

  const locationError = requred(values.location, "Location");
  if (locationError) {
    errors.location = locationError;
  }

  const phoneNumberError = requred(values.phoneNumber, "Phone number");
  if (phoneNumberError) {
    errors.phoneNumber = phoneNumberError;
  }
  return errors;
}

export default validateRegister;