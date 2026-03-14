import RegisterForm from "../components/auth/RegisterForm";
import LoginForm from "../components/auth/LoginForm";
import { useState } from "react";

const Auth = () => {

  const [ isLogin, setIsLogin ] = useState(true);
  const toggleForm = () => {
    setIsLogin(prev => !prev);
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-dvh">
      {isLogin ? <LoginForm /> : <RegisterForm />}
      <button onClick={toggleForm}>{isLogin ? "Don't have an account? Register"
      : "Already have an account? Login"}</button>
    </div>
  );
}

export default Auth;