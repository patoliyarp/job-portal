import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

const schema = yup.object().shape({
  username: yup
    .string()
    .required("Username is required")
    .min(2, "Minimum 2 characters")
    .max(15, "Maximum 15 characters"),
  email: yup.string().email("Invalid email").required("Email is required"),
});

interface ILoginForm {
  username: string;
  email: string;
}

function Login() {
  const { setUserEmail } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginForm>({ resolver: yupResolver(schema) });

  const onSubmit = (data: ILoginForm) => {
    setUserEmail(data.email);
    toast.success("Logged in successfully!");
    navigate("/");
  };

  return (
    <div className="min-h-[80vh] flex justify-center items-center px-6">
      <div className="w-full max-w-sm">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6 text-center">
          Log in
        </h1>
        <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                Username
              </label>
              <input
                type="text"
                {...register("username")}
                className="w-full px-3 py-2.5  pr-3 rounded-xl border dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white text-sm placeholder-zinc-400 dark:placeholder-zinc-500 outline-none focus:border-emerald-500"
                placeholder="Enter username"
              />
              {errors.username && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.username.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                Email
              </label>
              <input
                type="email"
                {...register("email")}
                className="w-full px-3 py-2.5  pr-3 rounded-xl border dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white text-sm placeholder-zinc-400 dark:placeholder-zinc-500 outline-none focus:border-emerald-500"
                placeholder="Enter email"
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>
            <button
              type="submit"
              className="w-full bg-emerald-500 hover:bg-emerald-400 text-white dark:text-zinc-950 font-semibold py-2.5 rounded-xl transition-colors text-sm mt-2"
            >
              Log in
            </button>
          </form>
          <p className="text-center text-sm text-zinc-500 dark:text-zinc-400 mt-4">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-emerald-600 dark:text-emerald-400 font-medium hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
