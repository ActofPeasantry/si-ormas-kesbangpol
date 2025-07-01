"use client";
import { useState } from "react";
import {
  Card,
  CardTitle,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
export const form = () => {
  const [username, setUsername] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [paymentMethod, setPaymentMethod] = useState<string>("");
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData();
    const fields = {
      username: username,
      description: hashedDescription,
      amount: hashedAmount,
      category: category,
      paymentMethod: paymentMethod,
    };

    return console.log("submit");
  };

  return (
    <form action={handleSubmit}>
      <Card className="@container/card">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            Registrasi Organisasi Masyarakat
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <h1>INFORMASI AKUN USER ORGANISASI</h1>
            <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mb-3 lg:mb-0">
              <div>
                <Label className="mb-2" htmlFor="username">
                  Username<span className="text-red-500">*</span>
                </Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Username"
                  required
                />
              </div>
              <div>
                <Label className="mb-2" htmlFor="email">
                  Email<span className="text-red-500">*</span>
                </Label>
                <Input id="email" type="email" placeholder="Email" required />
              </div>
            </div>
          </div>
          <div className="mb-4">
            <h1>INFORMASI ORGANISASI MASYARAKAT</h1>
            <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mb-3 lg:mb-0">
              <div>
                <Label className="mb-2" htmlFor="namaOrmas">
                  Nama Ormas<span className="text-red-500">*</span>
                </Label>
                <Input
                  id="namaOrmas"
                  type="text"
                  placeholder="Nama Ormas"
                  required
                />
              </div>
              <div>
                <Label className="mb-2" htmlFor="singkatanOrmas">
                  Singkatan Ormas
                  <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="singkatanOrmas"
                  type="text"
                  placeholder="Singkatan Ormas"
                  required
                />
              </div>
            </div>
            <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mb-3 lg:mb-0">
              <div>
                <Label className="mb-2" htmlFor="alamatOrmas">
                  Alamat Ormas
                  <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="alamatOrmas"
                  type="text"
                  placeholder="Alamat Ormas"
                  required
                />
              </div>
              <div>
                <Label className="mb-2" htmlFor="noTelpOrmas">
                  Nomor Telepon Ormas
                  <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="noTelpOrmas"
                  type="text"
                  placeholder="Nomor Telepon Ormas"
                  required
                />
              </div>
            </div>
            <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mb-3 lg:mb-0">
              <div>
                <Label className="mb-2" htmlFor="skBadanHukum">
                  SK Badan Hukum
                  <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="skBadanHukum"
                  type="text"
                  placeholder="SK Badan Hukum"
                  required
                />
              </div>
              <div>
                <Label className="mb-2" htmlFor="skBadanKeperguruan">
                  SK Badan Keperguruan
                  <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="skBadanKeperguruan"
                  type="text"
                  placeholder="SK Badan Keperguruan"
                  required
                />
              </div>
              <div>
                <Label className="mb-2" htmlFor="adArtadArt">
                  AD/ART
                  <span className="text-red-500">*</span>
                </Label>
                <Input id="adArt" type="text" placeholder="AD/ART" required />
              </div>
            </div>
            <div className="p-6 gap-3 mb-3 ">
              <Button variant="outline">Submit</Button>
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <p>
            <span className="text-red-500">*</span> : Wajib Diisi
          </p>
        </CardFooter>
      </Card>
    </form>
  );
};
