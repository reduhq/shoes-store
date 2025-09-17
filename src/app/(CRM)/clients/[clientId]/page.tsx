import { getClientById } from "@/api/clients.server";
import React from "react";
import Header from "../../_components/header";
import { Client } from "@/models/client";
import LoansDataTable from "./_components/loans-data-table";
import ClientProfileCard from "./_components/client-profile-card";
import ClientStatisticsCards from "./_components/client-statistics-cards";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import OverviewTab from "./_components/overview-tab";

interface IParams {
  params: Promise<{ clientId: string }>;
}

export default async function Page({ params }: IParams) {
  const { clientId } = await params;
  const { data }: { data: Client } = await getClientById(clientId);


  return (
    <>
      <Header title="Clientes" />
      {/* Client Header */}
      <div className="space-y-4 mx-4">
        <div className="grid grid-cols-1 md:grid-cols-12 lg:grid-cols-12 xl:grid-cols-12 2xl:grid-cols-16 gap-4 sm:gap-5 md:gap-6 lg:gap-7 xl:gap-8 mb-6 sm:mb-7 md:mb-8">
          <ClientProfileCard client={data} />
          <ClientStatisticsCards />
        </div>

        {/* tabs */}
        <Tabs defaultValue="loans" className="mb-6">
          <TabsList>
            <TabsTrigger value="loans">Préstamos</TabsTrigger>
            <TabsTrigger value="overview">Resumen</TabsTrigger>
            <TabsTrigger value="payments">Pagos</TabsTrigger>
          </TabsList>
          {/* Prestamos */}
          <TabsContent value="loans" className="space-y-4">
            <LoansDataTable clientId={data.id} />
          </TabsContent>

          {/* Resumen - Graficas */}
          <TabsContent value="overview" className="space-y-4">
            <OverviewTab/>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
