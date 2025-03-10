import React from "react";
import Header from "../_components/header";
import CreateNewClientButton from "./_components/create-new-client-button";
import { DataTable } from "./_components/data-table";
import { columns } from "./_components/columns";
import { getClientsByUser } from "@/api/clients.server";
import { Client } from "@/models/client";

const Page = async() => {
  const response = await getClientsByUser()
  return (
    <div>
      <Header title="Clientes" />
      <div>
        <CreateNewClientButton/>
        <DataTable columns={columns} data={response.data as Client[]} redirectTo="/clients"/>
      </div>
    </div>
  );
};

export default Page;
