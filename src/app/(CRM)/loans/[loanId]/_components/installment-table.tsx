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
import { useEffect, useState } from "react";
import { getInstallmentsByLoanId } from "@/api/installments";
import { Installments } from "@/models/installment";

const InstallmentTable = ({loanId}: {loanId: string}) => {
  const [installment, setInstallment] = useState<Installments[]>([])
  useEffect(()=>{
    const data = async()=>{
      const data =  await getInstallmentsByLoanId(loanId)
      setInstallment(data as Installments[])
    }
    data()
  }, [loanId])
  return (
    <Card>
      <CardHeader>
        <CardTitle>Cuotas</CardTitle>
        <CardDescription>Historial de pagos para este préstamo</CardDescription>
      </CardHeader>
      <CardContent>
        <DataTable data={installment} columns={columns} />
      </CardContent>
    </Card>
  );
};

export default InstallmentTable;
