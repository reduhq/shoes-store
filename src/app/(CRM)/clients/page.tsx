import React from "react";
import Header from "../_components/header";
import CreateNewClientButton from "./_components/create-new-client-button";
import { DataTable } from "./_components/data-table";
import { columns } from "./_components/columns";
import { getClientsByUser } from "@/api/clients.server";
import { ClientDataTableObject } from "@/models/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Page = async () => {
  const response = await getClientsByUser();
  return (
    <div>
      <Header title="Clientes" />
      <div className="space-y-4 mx-4">
        <CreateNewClientButton />

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Clientes</CardTitle>
              <CardDescription>
                Clientes Registrados
              </CardDescription>
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
