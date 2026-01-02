

"use client";



import InputFieldError from "@/components/Shared/InputFieldError";
import { Button } from "@/components/ui/button";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { loginUser } from "@/services/Auth/loginUser";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";







const LoginForm = ({redirect} : {redirect?:string | undefined}) => {
  const [state, formAction, isPending] = useActionState(loginUser, null);

  useEffect(() => {
if (state && !state.success && state.message) {
      toast.error("login failed");
      console.log(state.error);
    }
  }, [state]);
  return (
    <form action={formAction}>

      {redirect && <input type="hidden" name="redirect" value={redirect}/>}
      <FieldGroup>
        <div className="grid grid-cols-1 gap-4">
          {/* Email */}
          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="m@example.com"

            />

      <InputFieldError field="email" state={state} />
          </Field>

          {/* Password */}
          <Field>
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
    
            />
      <InputFieldError field="password" state={state} />
          </Field>
        </div>
        <FieldGroup className="mt-4">
          <Field>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Logging in..." : "Login"}
            </Button>

            <FieldDescription className="px-6 text-center">
              Don&apos;t have an account?{" "}
              <a href="/register" className="text-blue-600 hover:underline">
                Sign up
              </a>
            </FieldDescription>
          </Field>
        </FieldGroup>
      </FieldGroup>
    </form>
  );
};

export default LoginForm;