export const requred = (value: string, field: string) => {
  if(!value.trim()) {
    return `${field} is requred`;
  }
  return "";
}

export const validateEmail = (email: string) => {
  if(!email) return "Email is requred";

  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if(!regex.test(email)) {
    return "invalid email";
  }
  return "";
}

export const validatePassword = (password: string) => {
  if(!password) {
    return "Password is requred";
  } else if(password.length < 6) {
    return "Password must be atleast 6 characters";
  } else if (!/[A-Z]/.test(password) || (!/[!@#$%^&*(),.?":{}|<>]/.test(password))) {
    return "Atleast one upper case and one special character";
  }
  return "";
}



