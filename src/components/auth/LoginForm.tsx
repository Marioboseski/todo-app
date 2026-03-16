import { useState } from "react";
import validateLogin from "../../validation/validateLogin";
import FormInput from "../ui/FormInput";
import { useNavigate } from "react-router-dom";

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
  const [ touched, setTouched ] = useState<Partial<Record<keyof LoginValues, boolean>>>({});
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    const newValues = {
      ...values, [name]: value
    }
    setValues(newValues);

    const validationErrors = validateLogin(newValues);
    setErrors(validationErrors);

  }

  const handleBlur = (e:React.FocusEvent<HTMLInputElement>) => {
    const field = e.target.name as keyof LoginValues;

    setTouched(prev => ({...prev, [field]: true }));
    
    const validationErrors = validateLogin(values);
    setErrors(validationErrors);
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setTouched({
      email: true,
      password: true,
    })

    const validationErrors = validateLogin(values);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;
    navigate("/todo-page");
  }

  return (
    <div className="form-layout">
      <form onSubmit={handleSubmit} className="form-styles">

        <h2 className="text-3xl">Welcome</h2>
        <p className="text-lg">Todo - App </p>
        <FormInput 
        name="email"
        type="email"
        value={values.email}
        placeholder={"Enter email"}
        error={errors.email}
        touched={touched.email}
        onChange={handleChange}
        onBlur={handleBlur} /> 

        <FormInput 
        name="password"
        type="password"
        value={values.password}
        placeholder={"*******"}
        error={errors.password}
        touched={touched.password}
        onChange={handleChange}
        onBlur={handleBlur} />  

        <button type="submit" className="form-buttons">Login</button>
      </form>
    </div>
  );
}

export default LoginForm;