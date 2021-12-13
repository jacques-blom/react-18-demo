import { InputHTMLAttributes } from "react";

type HTMLInputProps = InputHTMLAttributes<HTMLInputElement>;

type TextInputProps = HTMLInputProps & {
  error: string | undefined | false;
};

export const TextInput = ({ error, ...inputProps }: TextInputProps) => {
  return (
    <div className="flex-1">
      <input
        className="text-black h-12 px-4 font-normal text-base w-full placeholder-black placeholder-opacity-80 bg-transparent outline-none rounded-md"
        {...inputProps}
      />
      {error && (
        <div className="text-sm text-red-500 mt-1" role="alert">
          {error}
        </div>
      )}
    </div>
  );
};
