export default function AppInput({ type, register, title, error }) {
  return (
    <div className="flex flex-col gap-1 items-end ">
      <div className="flex flex-col gap-1 w-full">
        <label className="font-semibold capitalize" htmlFor={title}>
          {title}
        </label>
        <input
          className={`border-2  p-2 rounded-md w-full ${
            error
              ? "focus:border-red-500 border-red-500"
              : "focus:border-background border-grey-200"
          } focus:outline-none`}
          type={type}
          name={title}
          {...register}
        />
      </div>
      <p className="text-red-500">{error}</p>
    </div>
  );
}
