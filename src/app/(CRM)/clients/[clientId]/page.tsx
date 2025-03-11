import { getClientById } from "@/api/clients.server";
import React from "react";
import Header from "../../_components/header";
import { Client } from "@/models/client";
import { Mail, MapPin, Phone, Star } from "lucide-react";
import LoansDataTable from "./_components/loans-data-table";

interface IParams {
  params: Promise<{ clientId: string }>;
}

export default async function Page({ params }: IParams) {
  const { clientId } = await params;
  const { data }: { data: Client } = await getClientById(clientId);

  // Render stars for rating
  const renderRating = (rating: number) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <Star
          key={i}
          className={`h-5 w-5 ${
            i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
          }`}
        />
      ));
  };

  return (
    <>
      <Header title="Clientes" />
      {/* Client Header */}
      <div className="space-y-4 mx-4">
        <h1 className="text-3xl font-bold">{`${data.nombre} ${data.apellido}`}</h1>
        <div className="flex items-center gap-1">
          {renderRating(data.calificacion_cliente ?? 5)}
          <span className="ml-2 text-sm text-muted-foreground">
            {data.calificacion_cliente ?? 5}/5
          </span>
        </div>
        {data.email ||
          (data.telefono && (
            <div className="flex flex-col sm:flex-row gap-4 mt-2">
              {data.email && (
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>{data.email}</span>
                </div>
              )}
              {data.telefono && (
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{data.telefono}</span>
                </div>
              )}
            </div>
          ))}
        {data.direccion && (
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-muted-foreground self-start mt-1" />
            <div className="flex flex-col">
              {data.direccion.split("\n").map((value, i) => (
                <p className="max-w-[20rem]" key={i}>
                  {value}
                </p>
              ))}
            </div>
          </div>
        )}
        {/* Informacion de prestamos */}
        <LoansDataTable clientId={data.id} />
      </div>
    </>
  );
}
