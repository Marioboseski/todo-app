import { useState } from "react";
import validateLogin from "../../validation/validateLogin";

type LoginValues = {
  email: string,
  password: string
}

const LoginForm = () => {

  const [values, setValues] = useState<LoginValues>({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<Partial<LoginValues>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setValues(prev => ({
      ...prev, [name]: value
    }));
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validateLogin(values);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text"
          placeholder="Enter name" />

        <input type="email"
          name="email"
          value={values.email}
          onChange={handleChange}
          placeholder="Enter Lastname" />
        {errors.email && <p>{errors.email}</p>}

        <input type="password"
          name="password"
          value={values.password}
          onChange={handleChange}
          placeholder="*****" />
        {errors.password && <p>{errors.password}</p>}

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginForm;