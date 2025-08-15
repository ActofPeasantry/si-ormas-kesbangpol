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
import { requestPasswordReset } from "@/lib/auth/action";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";

export default function Page() {
  const [state, resetAction] = useActionState(requestPasswordReset, undefined);
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Lupa Password</CardTitle>
              <CardDescription>
                Masukkan email anda untuk mendapatkan link reset password
              </CardDescription>
              {state?.errors?.email && <p>{state.errors.email}</p>}
            </CardHeader>
            <CardContent>
              <form action={resetAction}>
                <div className="flex flex-col gap-6">
                  <div className="grid gap-3">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="contoh@email.com"
                    />
                  </div>

                  <div className="flex flex-col gap-3">
                    <SubmitButton />
                    <Button variant="outline" className="w-full">
                      Kembali ke Login
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
      Kirim link
    </Button>
  );
}
