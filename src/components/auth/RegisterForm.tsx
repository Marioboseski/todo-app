import { useState } from "react";
import validateRegister from "../../validation/validateRegister";

type RegisterValues = {
  name: string,
  lastname: string,
  email: string,
  password: string,
  location: string,
  phoneNumber: string,
}

const RegisterForm = () => {

  const [values, setValues] = useState<RegisterValues>({
    name: "",
    lastname: "",
    email: "",
    password: "",
    location: "",
    phoneNumber: "",
  })

  const [errors, setErrors] = useState<Partial<RegisterValues>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues(prev => ({
      ...prev, [name]: value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validateRegister(values);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text"
          name="name"
          value={values.name}
          onChange={handleChange}
          placeholder="Name" />
          {errors.name && <p>{errors.name}</p>}

        <input type="text"
          name="lastname"
          value={values.lastname}
          onChange={handleChange}
          placeholder="Lastname" />
          {errors.lastname && <p>{errors.lastname}</p>}

        <input type="email"
          name="email"
          value={values.email}
          onChange={handleChange}
          placeholder="Email" />
          {errors.email && <p>{errors.email}</p>}

        <input type="password"
          name="password"
          value={values.password}
          onChange={handleChange}
          placeholder="*****" />
          {errors.password && <p>{errors.password}</p>}

        <input type="text"
          name="location"
          value={values.location}
          onChange={handleChange}
          placeholder="Location" />
          {errors.location && <p>{errors.location}</p>}

        <input type="text"
          name="phoneNumber"
          value={values.phoneNumber}
          onChange={handleChange}
          placeholder="Phone Number" />
          {errors.phoneNumber && <p>{errors.phoneNumber}</p>}

        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default RegisterForm;