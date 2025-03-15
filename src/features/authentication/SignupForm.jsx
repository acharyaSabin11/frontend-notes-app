import { useState } from "react";
import AuthForm from "./AuthForm";
import useSignup from "./useSignup";

export default function SignupForm() {
  const [isSettled, setIsSettled] = useState(false);
  const { isSigningUp, signup } = useSignup();
  const submitHandler = (data) => {
    setIsSettled(false);
    signup(data, {
      onSettled: () => {
        setIsSettled(true);
      },
    });
  };

  return (
    <div>
      <AuthForm
        submitHandler={submitHandler}
        isProcessing={isSigningUp}
        buttonText="Signup"
        titleText="Signup to Notes App"
        isSettled={isSettled}
      />
    </div>
  );
}
