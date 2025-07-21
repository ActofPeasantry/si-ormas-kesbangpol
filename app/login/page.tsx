"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { login } from "@/app/login/action";
import { IconBrandGoogleFilled } from "@tabler/icons-react";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";

export default function Page() {
  const [state, loginAction] = useActionState(login, undefined);

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Login to your account</CardTitle>
              <CardDescription>
                Enter your email below to login to your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form action={loginAction}>
                <div className="flex flex-col gap-6">
                  <div className="grid gap-3">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="m@example.com"
                    />
                  </div>
                  {state?.errors?.email && (
                    <p className="text-red-500">{state.errors.email}</p>
                  )}
                  <div className="grid gap-3">
                    <div className="flex items-center">
                      <Label htmlFor="password">Password</Label>
                      <a
                        href="#"
                        className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                      >
                        Forgot your password?
                      </a>
                    </div>
                    <Input id="password" name="password" type="password" />
                    {state?.errors.password && (
                      <p className="text-red-500">{state.errors.password}</p>
                    )}
                  </div>
                  <div className="flex flex-col gap-3">
                    <SubmitButton />
                    <Button variant="outline" className="w-full">
                      <IconBrandGoogleFilled /> Login with Google
                    </Button>
                  </div>
                </div>
              </form>
              <div className="mt-4 text-center text-sm">
                Don&apos;t have an account?{" "}
                <a href="#" className="underline underline-offset-4">
                  Sign up
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button disabled={pending} type="submit" className="w-full">
      Login
    </Button>
  );
}
