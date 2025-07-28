"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
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
import { addOrmasData } from "@/lib/queries/ormas";
import { encrypt } from "@/lib/crypto";

export const FormCard = () => {
  const router = useRouter();

  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [namaOrmas, setNamaOrmas] = useState<string>("");
  const [namaKetuaOrmas, setNamaKetuaOrmas] = useState<string>("");
  const [namaSekretarisOrmas, setNamaSekretarisOrmas] = useState<string>("");
  const [singkatanOrmas, setSingkatanOrmas] = useState<string>("");
  const [alamatOrmas, setAlamatOrmas] = useState<string>("");
  const [noTelpOrmas, setNoTelpOrmas] = useState<string>("");
  const [skBadanHukum, setSkBadanHukum] = useState<string>("");
  const [skKeperguruan, setSkKeperguruan] = useState<string>("");
  const [adArt, setAdArt] = useState<string>("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const hashedPassword = await encrypt("12345678");

    const formData = new FormData();
    const fields = {
      //user data
      username: username,
      email: email,
      password: hashedPassword,
      //ormas data
      namaOrmas: namaOrmas,
      singkatanOrmas: singkatanOrmas,
      namaKetuaOrmas: namaKetuaOrmas,
      namaSekretarisOrmas: namaSekretarisOrmas,
      alamatOrmas: alamatOrmas,
      noTelpOrmas: noTelpOrmas,
      skBadanHukum: skBadanHukum,
      skKeperguruan: skKeperguruan,
      adArt: adArt,
    };

    Object.entries(fields).forEach(([key, value]) => {
      formData.append(key, value);
    });

    try {
      await addOrmasData(formData);
      setUsername("");
      setEmail("");
      setNamaOrmas("");
      setNamaKetuaOrmas("");
      setNamaSekretarisOrmas("");
      setSingkatanOrmas("");
      setAlamatOrmas("");
      setNoTelpOrmas("");
      setSkBadanHukum("");
      setSkKeperguruan("");
      setAdArt("");
      console.log("submit success");
      router.push("/ormas"); // 🔀 redirect
    } catch (error) {
      console.error("Error inserting data:", error);
    }
  };

  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <div className="px-4 lg:px-6">
            <form onSubmit={handleSubmit}>
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
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label className="mb-2" htmlFor="email">
                          Email<span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="Email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
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
                          value={namaOrmas}
                          onChange={(e) => setNamaOrmas(e.target.value)}
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
                          value={singkatanOrmas}
                          onChange={(e) => setSingkatanOrmas(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mb-3 lg:mb-0">
                      <div>
                        <Label className="mb-2" htmlFor="namaKetuaOrmas">
                          Nama Ketua Ormas
                          <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="namaKetuaOrmas"
                          type="text"
                          placeholder="namaKetuaOrmas"
                          value={namaKetuaOrmas}
                          onChange={(e) => setNamaKetuaOrmas(e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label className="mb-2" htmlFor="namaSekretarisOrmas">
                          Nama Sekretaris Ormas
                          <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="namaSekretarisOrmas"
                          type="text"
                          placeholder="namaSekretarisOrmas"
                          value={namaSekretarisOrmas}
                          onChange={(e) =>
                            setNamaSekretarisOrmas(e.target.value)
                          }
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
                          value={alamatOrmas}
                          onChange={(e) => setAlamatOrmas(e.target.value)}
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
                          value={noTelpOrmas}
                          onChange={(e) => setNoTelpOrmas(e.target.value)}
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
                          value={skBadanHukum}
                          onChange={(e) => setSkBadanHukum(e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label className="mb-2" htmlFor="skKeperguruan">
                          SK Badan Keperguruan
                          <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="skKeperguruan"
                          type="text"
                          placeholder="SK Badan Keperguruan"
                          value={skKeperguruan}
                          onChange={(e) => setSkKeperguruan(e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label className="mb-2" htmlFor="adArtadArt">
                          AD/ART
                          <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="adArt"
                          type="text"
                          placeholder="AD/ART"
                          value={adArt}
                          onChange={(e) => setAdArt(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div className="p-6 gap-3 mb-3 ">
                      <Button variant="outline">Tambah</Button>
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
          </div>
        </div>
      </div>
    </div>
  );
};
