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
import { resetPassword } from "@/lib/auth/action";
import { useFormStatus } from "react-dom";

interface ResetPasswordPageProps {
  searchParams?: { token?: string };
}

export default function ResetPasswordPage({
  searchParams,
}: ResetPasswordPageProps) {
  const token = searchParams?.token;

  if (!token) {
    return <p>Invalid or missing token</p>;
  }

  async function handleSubmit(formData: FormData) {
    const password = formData.get("password") as string;
    if (token) await resetPassword(token, password);
  }

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Reset Password</CardTitle>
              <CardDescription>
                Silahkan masukkan password baru anda
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form action={handleSubmit}>
                <div className="flex flex-col gap-6">
                  <div className="grid gap-3">
                    <Label htmlFor="password">Email</Label>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      placeholder="password baru"
                    />
                  </div>

                  <div className="flex flex-col gap-3">
                    <SubmitButton />
                  </div>
                </div>
              </form>
              <div className="mt-4 text-center text-sm">
                Don&apos;t have an account?{" "}
                <a href="/login" className="underline underline-offset-4">
                  Kembali ke Login
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
