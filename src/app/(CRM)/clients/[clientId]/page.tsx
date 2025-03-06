import { getClientById } from "@/api/clients.server";
import React from "react";
import Header from "../../_components/header";
import { Client } from "@/models/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";


interface IParams{
  params: Promise<{ clientId: string }>;
}

export default async function Page({ params }: IParams) {
  const {clientId} = await params
  const { data }: { data: Client } = await getClientById(clientId);

  return (
    <div>
      <Header title="Clientes" />
      <div className="bg-secondary p-2 rounded-lg mx-2 sm:flex sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <h1 className="font-bold text-[2rem]">
            {data.nombre + " " + data.apellido}
          </h1>
          <div>
            <Badge className="flex items-center gap-1 bg-green-600">
              <Star size={15} />
              <span>5.0</span>
            </Badge>
          </div>
        </div>
        <Button className="w-full sm:w-auto">+ Nuevo Prestamo</Button>
      </div>
    </div>
  );
}
