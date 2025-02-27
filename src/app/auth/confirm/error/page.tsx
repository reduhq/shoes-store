import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import React from "react";

const Page = () => {
  return (
    <div className="h-dvh w-dvw flex justify-center items-center">
      <Card className="">
        <CardHeader>
          <CardTitle className="text-[#f00]">Error</CardTitle>
          <CardDescription>Ha ocurrido un error</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-2">
          <p>El link del Email es inválido o ha expirado</p>
          <Link href={'/auth/login'} className="block w-full">
            <Button className="w-full">Inicia sesión</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
};

export default Page;
