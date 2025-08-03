import React from "react";
import Header from "../_components/header";
import CreateNewClientButton from "./_components/create-new-client-button";
import { DataTable } from "./_components/data-table";
import { columns } from "./_components/columns";
import { getClientsByUser } from "@/api/clients.server";
import { ClientDataTableObject } from "@/models/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const Page = async () => {
  const response = await getClientsByUser();
  return (
    <div>
      <Header title="Clientes" />

      <div className="space-y-4 mx-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold">Clientes</h1>
            <p className="text-muted-foreground">
              Gestiona tu cartera de clientes y sus préstamos
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <CreateNewClientButton />
          </div>
        </div>

        {/* Client Statistics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          <Card className="shadow-sm border-muted">
            <CardContent className="p-4">
              <div className="flex flex-row items-center justify-between space-y-0 pb-1">
                <p className="text-sm font-medium">Total de Clientes</p>
              </div>
              <div className="flex items-center">
                <div className="text-2xl font-bold">15</div>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-sm border-muted">
            <CardContent className="p-4">
              <div className="flex flex-row items-center justify-between space-y-0 pb-1">
                <p className="text-sm font-medium">Clientes Activos</p>
              </div>
              <div className="flex items-center">
                <div className="text-2xl font-bold">6</div>
                <p className="text-xs text-muted-foreground ml-2">
                  {/* ({Math.round((activeClients / totalClients) * 100)}%) */}
                  (65%)
                </p>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-sm border-muted">
            <CardContent className="p-4">
              <div className="flex flex-row items-center justify-between space-y-0 pb-1">
                <p className="text-sm font-medium">Con Préstamos</p>
              </div>
              <div className="flex items-center">
                <div className="text-2xl font-bold">6</div>
                <p className="text-xs text-muted-foreground ml-2">
                  {/* ({Math.round((clientsWithLoans / totalClients) * 100)}%) */}
                  (60%)
                </p>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-sm border-muted">
            <CardContent className="p-4">
              <div className="flex flex-row items-center justify-between space-y-0 pb-1">
                <p className="text-sm font-medium">Préstamos Activos</p>
              </div>
              <div className="flex items-center">
                <div className="text-2xl font-bold">9</div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Clientes</CardTitle>
              <CardDescription>Clientes Registrados</CardDescription>
            </div>
            {/* <LoansCreateBtn cliente_id={clientId} /> */}
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <DataTable
                columns={columns}
                data={response.data as ClientDataTableObject[]}
                redirectTo="/clients"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Page;
