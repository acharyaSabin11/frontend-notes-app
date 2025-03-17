import { useEffect } from "react";
import { useForm } from "react-hook-form";
import AppInput from "../../components/AppInput";
import AppButton from "../../components/AppButton";

export default function AuthForm({
  submitHandler,
  isProcessing,
  buttonText,
  isSettled,
  titleText,
}) {
  const { register, handleSubmit, formState, reset } = useForm();
  const { errors } = formState;

  useEffect(() => {
    if (isSettled) {
      reset();
    }
  }, [isSettled, reset]);

  return (
    <div className="max-w-120 lg:max-w-140 min-w-72 flex flex-col gap-10 items-center w-full">
      <h2 className="text-2xl font-semibold">{titleText}</h2>
      <form
        onSubmit={handleSubmit(submitHandler)}
        className="max-w-400 w-full flex flex-col gap-6"
      >
        <AppInput
          type="text"
          title="username"
          error={errors.username?.message}
          register={register("username", {
            required: "This field is required",
            validate: (value) =>
              value.length > 4 ||
              "Username should be at least 4 characters long",
          })}
        />
        <AppInput
          type="text"
          title="password"
          error={errors.password?.message}
          register={register("password", {
            required: "This field is required",
            validate: (value) =>
              value.length >= 8 ||
              "Password should be at least 8 characters long",
          })}
        />
        <AppButton disabled={isProcessing}>{buttonText}</AppButton>
      </form>
    </div>
  );
}
