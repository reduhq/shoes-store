'use client'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { Installments } from "@/models/installment";

const InstallmentTable = ({installmentData}: {installmentData: Installments[]}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Cuotas</CardTitle>
        <CardDescription>Historial de pagos para este préstamo</CardDescription>
      </CardHeader>
      <CardContent>
        <DataTable data={installmentData} columns={columns} />
      </CardContent>
    </Card>
  );
};

export default InstallmentTable;
