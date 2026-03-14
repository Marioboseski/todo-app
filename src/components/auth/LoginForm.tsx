import { useState } from "react";
import validateLogin from "../../validation/validateLogin";
import FormInput from "../ui/FormInput";

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
  }

  return (
    <div className="flex justify-center items-center w-full p-2">
      <form onSubmit={handleSubmit} className="flex flex-col justify-around items-center gap-2 p-2 border-2 border-gray-400 rounded-lg min-h-[400px] w-full">

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

        <button type="submit" className="border-2 border-gray-400 rounded-md w-full max-w-36">Login</button>
      </form>
    </div>
  );
}

export default LoginForm;