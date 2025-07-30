"use client";
import { z } from "zod";
import {
  Card,
  CardDescription,
  CardTitle,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { FaCheckCircle } from "react-icons/fa";
import { LiaEdit } from "react-icons/lia";
import { Button } from "@/components/ui/button";

export const UserSchema = z.object({
  id: z.number(),
  email: z.string(),
  username: z.string(),
  role: z.string(),
});
type User = z.infer<typeof UserSchema>;

export const FormCard = ({ user }: { user: User }) => {
  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <div className="px-4 lg:px-6">
            <Card className="@container/card">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                  Profil User
                </CardTitle>
                <CardDescription>
                  <span className="font-semibold">
                    {user.role.toUpperCase()}
                  </span>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="p-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-1 lg:mb-0">
                  <div className="flex flex-col gap-1">
                    <span className="font-semibold">
                      Username
                      <Button variant="ghost" size="sm">
                        <LiaEdit />
                      </Button>
                    </span>
                    <span>{user.username}</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="font-semibold">
                      Email
                      <Button variant="ghost" size="sm">
                        <LiaEdit />
                      </Button>
                    </span>
                    <span>{user.email}</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="font-semibold">Password</span>
                    <a
                      href="/lupa-password"
                      className="mt-3 inline-block text-sm underline-offset-4 hover:underline"
                    >
                      <span className="font-semibold">Lupa password?</span>
                    </a>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex-col items-start gap-1.5 text-sm"></CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
