import { useRouter } from "next/router";
import React, { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { classNames, supabase } from "../../utils";
import { TextInput } from "../form";

const LoginForm: FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  const handleLogin = async () => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.signInWithPassword({
        email: getValues("email"),
        password: getValues("password"),
      });
      if (error) {
        toast.error(error.message);
        return;
      }

      toast.success("Successfully logged in!");
      await router.push("/dashboard");
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="flex w-full max-w-md flex-col items-center px-5 py-32">
      <div className={"flex w-full flex-col items-start text-left text-white"}>
        <h3 className="mt-3 text-2xl font-bold uppercase">Welcome back!</h3>
        <p>Log back in to your account</p>
      </div>
      <form
        onSubmit={handleSubmit(handleLogin)}
        className="mt-5 flex w-full flex-col items-center"
      >
        <TextInput
          name="email"
          placeholder="Email"
          type="text"
          register={register}
          validationSchema={{
            required: {
              value: true,
              message: "Email is required",
            },
            type: {
              value: "email",
              message: "Invalid email address",
            },
          }}
          error={errors.email?.message}
          disabled={isLoading}
        />
        <TextInput
          name="password"
          placeholder="Password"
          type="password"
          register={register}
          validationSchema={{
            required: {
              value: true,
              message: "Password is required",
            },
          }}
          error={errors.password?.message}
          disabled={isLoading}
        />
        <button
          type="submit"
          className={classNames(
            isLoading ? "loading" : "",
            "btn-info btn-block btn transition duration-200 ease-in-out hover:-translate-y-1"
          )}
        >
          {isLoading ? "Loading" : "Login"}
        </button>
      </form>
    </div>
  );
};

export { LoginForm };
