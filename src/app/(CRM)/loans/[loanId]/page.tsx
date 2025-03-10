import React from "react";
import InstallmentTable from "./_components/installment-table";
import Header from "../../_components/header";
import { Badge } from "@/components/ui/badge";
import { getLoanById } from "@/api/loans";
import { Calendar, CreditCard, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Loan } from "@/models/loan";
import { getClientById } from "@/api/clients.server";
import { Client } from "@/models/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface IParams {
  params: Promise<{ loanId: string }>;
}

const Page = async ({ params }: IParams) => {
  const { loanId } = await params;
  const loan: Loan = await getLoanById(loanId);
  const client: { data: Client } = await getClientById(loan.cliente_id);

  const formatDate = (dateString: string) => {
    if (dateString === "-") return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <>
      <Header title="Detalle del préstamo" />
      {/* Client Header */}
      <div className="space-y-4 mx-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="space-y-3">
            <div className="flex flex-row items-center gap-4">
              <h1 className="text-3xl font-bold">${loan.monto}</h1>
              <Badge
                variant={loan.estado === "pagado" ? "success" : "secondary"}
                className="text-sm h-6 px-3 py-1"
              >
                {loan.estado}
              </Badge>
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-muted-foreground">
                <CreditCard className="h-4 w-4" />
                <span>
                  Préstamo para{" "}
                  {client.data.nombre + " " + client.data.apellido}
                </span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>
                  Iniciado el {formatDate(loan.fecha_inicio.toString())}
                </span>
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                ID: {loan.id}
              </div>
            </div>
          </div>
          {loan.estado === "pendiente" && (
            <Button className="w-full md:w-auto">
              <DollarSign className="mr-2 h-4 w-4" /> Pagar Cuota
            </Button>
          )}
        </div>

        {/* Loan Details */}
        <Card>
          <CardHeader>
            <CardTitle>Detalles del Préstamo</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Monto Total</p>
                <p className="text-lg font-medium">
                  ${loan.monto.toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">N. cuotas</p>
                <p className="text-lg font-medium">{loan.cuotas}</p>
              </div>
              {/* <div>
                <p className="text-sm text-muted-foreground">Cuota Mensual</p>
                <p className="text-lg font-medium">${loan.installmentAmount.toLocaleString()}</p>
              </div> */}
              {/* <div>
                <p className="text-sm text-muted-foreground">Monto Restante</p>
                <p className="text-lg font-medium">${loan.remainingAmount.toLocaleString()}</p>
              </div> */}
              {/* <div>
                <p className="text-sm text-muted-foreground">Próximo Pago</p>
                <p className="text-lg font-medium">
                  {loan.nextPayment !== "-" ? formatDate(loan.nextPayment) : "Completado"}
                </p>
              </div> */}
              {/* <div>
                <p className="text-sm text-muted-foreground">Pagos Realizados</p>
                <p className="text-lg font-medium">{loan.payments.length}</p>
              </div> */}
              <div>
                <p className="text-sm text-muted-foreground">Tasa aplicada</p>
                <p className="text-lg font-medium">
                  {loan.tasa_aplicada.toFixed(2)}%
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        {/* installments data table */}
        <InstallmentTable loanId={loanId} />
      </div>
    </>
  );
};

export default Page;
