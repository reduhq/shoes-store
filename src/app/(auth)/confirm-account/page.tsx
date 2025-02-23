"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const ConfirmAccount = () => {
  const [paramsObject, setParamsObject] = useState<{ [k: string]: string; }>({})
  useEffect(() => {
    const hash = window.location.hash.substring(1);
    setParamsObject(Object.fromEntries(new URLSearchParams(hash)))
  }, []);

  if (paramsObject.error) {
    return (
      <div className="flex flex-col gap-[.5rem]">
        <p className="text-white font-bold text-center text-[1.5rem] bg-red-600">
          El link del Email es inválido o ha expirado
        </p>
        <p className="text-center"></p>
        <div className="flex justify-center">
          <Link href={process.env.NEXT_PUBLIC_HOST_URL as string}>
            <Button>Ir al home</Button>
          </Link>
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-[.5rem]">
      <p className="text-white font-bold text-center text-[1.5rem] bg-green-600">
        Cuenta confirmada exitosamente.
      </p>
      <p className="text-center">Inicia sesión para continuar</p>
      <div className="flex justify-center">
        <Link href={`${process.env.NEXT_PUBLIC_HOST_URL}/login`}>
          <Button>Inicia Sesión</Button>
        </Link>
      </div>
    </div>
  );
};

export default ConfirmAccount;
