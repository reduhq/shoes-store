"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Installments } from "@/models/installment";
import { Badge } from "@/components/ui/badge";
import { Payment } from "@/models/payment";
import React, { useEffect, useState } from "react";
import { getPaymentsByInstallmentId } from "@/api/payment";

export function InstallmentDataTable({
  installmentData,
}: {
  installmentData: Installments[];
}) {
  const [expandedPayments, setExpandedPayments] = useState<
    Record<string, { expanded: boolean; paymentData: Payment[] }>
  >({});
  useEffect(() => {
      Object.keys(expandedPayments).forEach( async (installmentId) => {
        const sum = expandedPayments[installmentId].paymentData.reduce(
          (acum, item) => acum + item.monto,
          0
        );
        const updatedInstallment = installmentData.find(
          (installment) => installment.id === installmentId
        );
        if (sum !== updatedInstallment?.monto_pagado) {
          // fetching the actual data
          
          const {data, error} = await getPaymentsByInstallmentId(installmentId)
          if(error) return
          setExpandedPayments(prev =>({
            ...prev,
            [installmentId]: {
              expanded: prev[installmentId].expanded,
              paymentData: data
            }
          }))
        }
      });
    // console.log(installmentData)
  }, [installmentData, expandedPayments]);
  const togglePaymentExpanded = async (installmentId: string) => {
    if (!expandedPayments[installmentId]) {
      // Fetch the paymentData
      const { data, error } = await getPaymentsByInstallmentId(installmentId);
      if (error) {
        return;
      }
      setExpandedPayments((prev) => ({
        ...prev,
        [installmentId]: {
          expanded: true,
          paymentData: data,
        },
      }));
      return;
    }
    // setting the updated data
    setExpandedPayments((prev) => ({
      ...prev,
      [installmentId]: {
        expanded: !prev[installmentId].expanded,
        paymentData: prev[installmentId].paymentData,
      },
    }));
  };
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>#</TableHead>
          <TableHead>Monto</TableHead>
          <TableHead>Pagado</TableHead>
          <TableHead>Estado</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {installmentData.map((payment: Installments) => (
          <React.Fragment key={payment.id}>
            <TableRow
              key={payment.id}
              className={`cursor-pointer hover:bg-muted/50 ${
                expandedPayments[payment.id] &&
                expandedPayments[payment.id].expanded &&
                expandedPayments[payment.id].paymentData.length > 0 &&
                "shadow-md"
              }`}
              onClick={() => togglePaymentExpanded(payment.id)}
            >
              <TableCell
                className={`${
                  expandedPayments[payment.id] &&
                  expandedPayments[payment.id].expanded &&
                  expandedPayments[payment.id].paymentData.length > 0 &&
                  "border-l-4 border-l-primary"
                }`}
              >
                {payment.numero_cuota}
              </TableCell>
              <TableCell>{payment.monto_cuota.toLocaleString()}</TableCell>
              <TableCell>{payment.monto_pagado.toFixed(2)}</TableCell>
              <TableCell>
                <Badge variant={payment.pagada ? "success" : "secondary"}>
                  {payment.pagada ? "Pagada" : "Pendiente"}
                </Badge>
              </TableCell>
            </TableRow>
            {/* Payment info */}
            {expandedPayments[payment.id] &&
              expandedPayments[payment.id].expanded &&
              expandedPayments[payment.id].paymentData.length > 0 && (
                <TableRow className="bg-muted/30">
                  <TableCell colSpan={5} className="p-0">
                    <div className="px-4 py-3 border-t border-b">
                      <div className="grid gap-4">
                        {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <p className="text-sm font-medium">Método de pago</p>
                          <p className="text-sm text-muted-foreground">
                            {payment.method}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Referencia</p>
                          <p className="text-sm text-muted-foreground">
                            {payment.reference}
                          </p>
                        </div>
                        {payment.notes && (
                          <div>
                            <p className="text-sm font-medium">Notas</p>
                            <p className="text-sm text-muted-foreground">
                              {payment.notes}
                            </p>
                          </div>
                        )}
                      </div> */}

                        {expandedPayments[payment.id] &&
                          expandedPayments[payment.id].paymentData.length >
                            0 && (
                            <div>
                              <p className="text-sm mb-2 font-semibold">
                                Desglose de pagos
                              </p>
                              <div className="bg-background rounded-md overflow-hidden border shadow-sm">
                                <Table>
                                  <TableHeader>
                                    <TableRow>
                                      <TableHead>ID</TableHead>
                                      <TableHead>Monto</TableHead>
                                      <TableHead>Fecha</TableHead>
                                      <TableHead>Método</TableHead>
                                    </TableRow>
                                  </TableHeader>
                                  <TableBody>
                                    {expandedPayments[
                                      payment.id
                                    ].paymentData.map(
                                      (subPayment: Payment, i) => (
                                        <TableRow key={i}>
                                          <TableCell>{i + 1}</TableCell>
                                          <TableCell>
                                            ${subPayment.monto.toLocaleString()}
                                          </TableCell>
                                          <TableCell>
                                            {/* {formatDate(subPayment.date)} */}
                                            {subPayment.fecha_pago.toString()}
                                          </TableCell>
                                          <TableCell>
                                            {subPayment.metodo_pago === 'Transferencia_bancaria' ? 'Transf. banc.' :subPayment.metodo_pago === 'Tarjeta_credito' ? 'Tarj. Credito': subPayment.metodo_pago}
                                          </TableCell>
                                        </TableRow>
                                      )
                                    )}
                                  </TableBody>
                                </Table>
                              </div>
                            </div>
                          )}
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              )}
          </React.Fragment>
        ))}
      </TableBody>
    </Table>
  );
}
