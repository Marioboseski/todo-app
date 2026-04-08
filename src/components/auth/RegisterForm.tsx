import { useState } from "react";
import validateRegister from "../../validation/validateRegister";
import FormInput from "../ui/FormInput";
import { useNavigate } from "react-router-dom";

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
  const [ touched, setTouched ] = useState<Partial<Record<keyof RegisterValues,boolean>>>({});
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    const newValues = {
      ...values, [name]: value
    }

    setValues(newValues);

    const validationErrors = validateRegister(newValues);
    setErrors(validationErrors);
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const field = e.target.name as keyof RegisterValues;

    setTouched(prev => ({ ...prev, [field]: true }));

    const validationErrors = validateRegister(values);
    setErrors(validationErrors);
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setTouched({
      name: true,
      lastname: true,
      email: true,
      password: true,
      location: true,
      phoneNumber: true,
    })

    const validationErrors = validateRegister(values);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;
    navigate("/todo-page");
  }

  return (
    <div className="form-layout">
      <form onSubmit={handleSubmit} className="form-styles min-h-[650px]">

        <h2 className="text-3xl">Register</h2>
        <p className="text-lg">Create Todo - App account</p>
        <FormInput
          name="name"
          type="text"
          value={values.name}
          placeholder="Enter name"
          error={errors.name}
          touched={touched.name}
          onChange={handleChange}
          onBlur={handleBlur} />

          <FormInput
          name="lastname"
          type="text"
          value={values.lastname}
          placeholder="Enter lastname"
          error={errors.lastname}
          touched={touched.lastname}
          onChange={handleChange}
          onBlur={handleBlur} />

          <FormInput
          name="email"
          type="email"
          value={values.email}
          placeholder="Enter email"
          error={errors.email}
          touched={touched.email}
          onChange={handleChange}
          onBlur={handleBlur} />

          <FormInput
          name="password"
          type="password"
          value={values.password}
          placeholder="*******"
          error={errors.password}
          touched={touched.password}
          onChange={handleChange}
          onBlur={handleBlur} />

          <FormInput
          name="location"
          type="text"
          value={values.location}
          placeholder="Enter location"
          error={errors.location}
          touched={touched.location}
          onChange={handleChange}
          onBlur={handleBlur} />

          <FormInput
          name="phoneNumber"
          type="text"
          value={values.phoneNumber}
          placeholder="Phone Number"
          error={errors.phoneNumber}
          touched={touched.phoneNumber}
          onChange={handleChange}
          onBlur={handleBlur} />

        <button type="submit" className="form-buttons">Register</button>
      </form>
    </div>
  );
}

export default RegisterForm;