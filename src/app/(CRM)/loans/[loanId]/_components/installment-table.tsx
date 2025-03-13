'use client'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { InstallmentDataTable } from "./installment-data-table";
import { Installments } from "@/models/installment";

const InstallmentTable = ({installmentData}: {installmentData: Installments[]}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Cuotas</CardTitle>
        <CardDescription>Historial de pagos para este préstamo</CardDescription>
      </CardHeader>
      <CardContent>
        <InstallmentDataTable installmentData={installmentData} />
      </CardContent>
    </Card>
  );
};

export default InstallmentTable;
