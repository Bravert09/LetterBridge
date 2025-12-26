"use client";
//next/router 👉 只适用于 Pages Router（pages/）
//在 App Router 中，这个 Router 根本不会被挂载, 要改为'next/navigation'

import { useActionState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/app/components/ui/button";
import {
  Form,
  FormGroup,
  FormLabel,
  FormInput,
  FormError,
} from "@/app/components/ui/Form";
import toast from "react-hot-toast";
import Link from "next/link";
import { signUp, ActionResponse } from "@/app/(auth)/actions/auth";
import { errors } from "jose";
const initialState: ActionResponse = {
  success: false,
  message: "",
  errors: undefined,
};

export default function SignUpPage() {
  const router = useRouter();
  console.log("here from the browser");
  //Use useActionState hook for the form submission action
  const [state, formAction, isPending] = useActionState<
    ActionResponse,
    FormData
  >(async (prevState: ActionResponse, formData: FormData) => {
    try {
      //忘了在异步函数前面加await
      const result = await signUp(formData);

      //Handle successful submission
      if (result.success) {
        toast.success("Account created successfully");
        router.push("/dashboard");
      }
      return result;
    } catch (err) {
      return {
        success: false,
        message: (err as Error).message || "An error occured",
        errors: undefined,
      };
    }
  }, initialState);

  return (
    <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 dark:bg-[#121212]">
      <div className="sm:mx-auto  sm:w-full sm:max-w-md">
        <h1 className="font-extrabold text-center text-3xl my-4 text-primary">
          LetterBridge
        </h1>

        <h2 className="mt-2 text-center text-2xl font-bold text-secondary-foreground dark:text-white">
          Create a new account
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <Form action={formAction} className="space-y-6 mb-8">
          {state?.message && !state.success && (
            <FormError>{state.message}</FormError>
          )}
          <FormGroup>
            <FormLabel htmlFor="email">Email</FormLabel>
            <FormInput
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              disabled={isPending}
              aria-describedby="email-error"
              className={state?.errors?.email ? "border-red-500" : ""}
            />
            {state?.errors?.email && <p>{state.errors.email[0]}</p>}
          </FormGroup>

          <FormGroup>
            <FormLabel htmlFor="password">Password</FormLabel>
            <FormInput
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              disabled={isPending}
              aria-describedby="password-error"
              className={state?.errors?.password ? "border-red-500" : ""}
            />
            {state?.errors?.password && (
              <p id="password-error" className="text-sm text-red-500">
                {state.errors.password[0]}
              </p>
            )}
          </FormGroup>

          <FormGroup>
            <FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
            <FormInput
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              autoComplete="new-password"
              required
              disabled={isPending}
              aria-describedby="confirmPassword-error"
              className={state?.errors?.confirmPassword ? "border-red-500" : ""}
            />
            {state?.errors?.confirmPassword && (
              <p id="confirmPassword-error" className="text-sm text-red-500">
                {state.errors.confirmPassword[0]}
              </p>
            )}
          </FormGroup>
          <div>
            <Button type="submit" className="w-full" isLoading={isPending}>
              Sign up
            </Button>
          </div>
        </Form>

        <div className="bg-white dark:bg-[#1A1A1A] py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-gray-100 dark:border-dark-border-subtle">
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Already have an account?
              <Link
                href="/signin"
                className="font-medium text-gray-900 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-100"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
