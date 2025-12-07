

"use client";



import InputFieldError from "@/components/Shared/InputFieldError";
import { Button } from "@/components/ui/button";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { registerUser } from "@/services/Auth/registerUser";
import Link from "next/link";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";






const RegisterForm = () => {
  const [state, formAction, isPending] = useActionState(registerUser, null);

  useEffect(() => {

    if (state && state.success) {
      toast.success("Logged in successfully");
    }
    else if (state && !state.success && state.message) {
      toast.error(state.message);
    }
  }, [state]);
  return (
    <form action={formAction}>
      <FieldGroup>


        <Field>
          <FieldLabel htmlFor="name">Name</FieldLabel>
          <Input id="name" name="name" type="text" placeholder="John Doe" />
          <InputFieldError field="name" state={state} />
        </Field>


        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="your@email.com"
          />

          <InputFieldError field="email" state={state} />
        </Field>

        <Field>
          <FieldLabel htmlFor="password">Password</FieldLabel>
          <Input id="password" name="password" type="password" placeholder="Enter your password" />

          <InputFieldError field="password" state={state} />
        </Field>

        <Field className="md:col-span-2">
          <FieldLabel htmlFor="confirmPassword">Confirm Password</FieldLabel>
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            placeholder="Re-enter your password"
          />

          <InputFieldError field="confirmPassword" state={state} />
        </Field>

        <FieldGroup className="mt-4">
          <Field>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Creating Account..." : "Create Account"}
            </Button>

            <FieldDescription className="px-6 text-center">
              Already have an account?{" "}
              <Link href="/login" className="text-teal-600 hover:underline">
                Sign in
              </Link>
              <span className="px-1">or go to{" "}</span>
              <Link href="/" className="text-teal-600 hover:underline">
                home
              </Link>
            </FieldDescription>
          </Field>
        </FieldGroup>
      </FieldGroup>
    </form>
  );
};

export default RegisterForm;