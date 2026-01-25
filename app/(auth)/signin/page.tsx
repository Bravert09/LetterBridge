'use client'
import { useActionState } from 'react'
import { useRouter } from 'next/navigation'
import {Button} from '@/app/components/ui/button'
import {
  Form,
  FormGroup,
  FormLabel,
  FormInput,
  FormError,
} from '@/app/components/ui/Form'
import toast from 'react-hot-toast'
import Link from 'next/link'
import { signIn, ActionResponse } from "@/app/actions/auth";

const initialState: ActionResponse = {
  success: false,
  message: '',
  errors: undefined,
}

export default function SignInPage() {
  const router = useRouter()
  //formAction → 绑定到 <Form> 的提交处理函数,不能写formData
  const [state, formAction, isPending] = useActionState<
    ActionResponse,
    FormData
  >(async (prevState: ActionResponse, formData: FormData) => {
    try {
      const result = await signIn(formData)

      if (result.success) {
        toast.success('Signed in successfully')
        router.push('/dashboard')
        router.refresh()
      }
      return result
    } catch (err) {
      return {
        success: false,
        message: (err as Error).message || 'An error occurred',
        error: undefined,
      }
    }
  }, initialState)

  return (
    <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gray-50 dark:bg-[#121212]">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h1 className="font-extrabold text-center text-3xl my-4 text-primary">
          LetterBridge
        </h1>
        <h3 className="mt-2 text-center text-2xl font-bold text-gray-900 dark:text-white">
          Sign in to your account
        </h3>
        <Form action={formAction} className="space-y-6">
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
              className={state?.errors?.email ? 'border-red-500' : ''}
            />
            {state?.errors?.email && (
              <p id="email-error" className="text-sm text-red-500">
                {state.errors.email[0]}
              </p>
            )}
          </FormGroup>

          <FormGroup>
            <FormLabel htmlFor="password">Password</FormLabel>
            <FormInput
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              disabled={isPending}
              aria-describedby="password-error"
              className={state?.errors?.password ? 'border-red-500' : ''}
            />
            {state?.errors?.password && (
              <p id="password-error" className="text-sm text-red-500">
                {state.errors.password[0]}
              </p>
            )}
          </FormGroup>

          <div>
            <Button type="submit" className="w-full" isLoading={isPending}>
              Sign in
            </Button>
          </div>
        </Form>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white text-center dark:bg-[#1A1A1A] py-8  px-4 shadow sm:rounded-lg sm:px-10 border border-gray-100 dark:border-dark-border-subtle">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Don't have an account?
            <Link
              href="/signup"
              className="font-medium text-gray-900 hover:text-gray-700 dark:text-gray-300"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
