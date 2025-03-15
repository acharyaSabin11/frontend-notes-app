import { useForm } from "react-hook-form";
import AppInput from "../../components/AppInput";
import AppButton from "../../components/AppButton";
import useLogin from "./useLogin";

export default function LoginForm() {
  const { register, handleSubmit, formState, reset } = useForm();
  const { errors } = formState;
  const { isLoggingIn, login } = useLogin();

  function submitHandler(data) {
    login(data, {
      onSettled: () => {
        reset();
      },
    });
  }
  return (
    <div className="max-w-400 min-w-100 flex flex-col gap-10 items-center">
      <h2 className="text-2xl font-semibold">Login to Notes App</h2>
      <form
        onSubmit={handleSubmit(submitHandler)}
        className="max-w-400 min-w-100 flex flex-col gap-6"
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
        <AppButton disabled={isLoggingIn}>Login</AppButton>
      </form>
    </div>
  );
}
