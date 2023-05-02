import { Button1 } from "@/components/shared";
import { User } from "@/lib/users";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

export default function SignIn() {
  const router = useRouter();

  const submitLoginForm = async (data: Omit<User, "id">) => {
    const res = await signIn("signin", {
      redirect: false,
      callbackUrl: process.env.NEXT_PUBLIC_AUTH_URL,
      ...data,
    });

    if (res?.ok) {
      router.push("/");
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Omit<User, "id">>();

  const onSubmit = handleSubmit((data) => submitLoginForm(data));

  return (
    <div
      className={`flex-grow flex flex-col justify-center items-center align-middle`}
    >
      <form className="flex flex-col gap-4" onSubmit={onSubmit}>
        <h1>Sign in</h1>

        <div className="mb-6">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Email address
          </label>
          <input
            {...register("email")}
            type="email"
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500
             focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
             dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="domain@gmail.com"
            required
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Password
          </label>
          <input
            {...register("password")}
            type="password"
            id="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
            focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 
            dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 
            dark:focus:border-blue-500"
            placeholder="•••••••••"
            required
          />
        </div>

        <Button1 type="submit">Submit</Button1>
      </form>
    </div>
  );
}
