"use client";
import { createNewPayment } from "@/api/payment";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { errorToast, successToast } from "@/global-components/toasters";
import { Installments } from "@/models/installment";
import { CreatePaymentSchema, PaymentMethodEnum } from "@/models/payment";
import { zodResolver } from "@hookform/resolvers/zod";
import { DollarSign, LoaderCircle } from "lucide-react";
import { redirect } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const metodoPago = ["Efectivo", "Transferencia_bancaria", "Tarjeta_credito"];

const PayInstallmentBtn = ({
  installmentData,
  loanId,
}: {
  installmentData: Installments[];
  loanId: string;
}) => {
  // const sortInstallments = () => {
  //   return installmentData.sort((a, b) => a.numero_cuota - b.numero_cuota);
  // };
  const getCurrentInstallment = () => {
    const currentInstallment = installmentData.find(
      (installment) => !installment.pagada
    );
    return currentInstallment!;
  };

  const formSchema = z.object({
    monto: z.coerce
      .number()
      .positive()
      .max(
        Number(
          (
            getCurrentInstallment().monto_cuota -
            getCurrentInstallment().monto_pagado
          ).toFixed(2)
        ),
        {
          message: `El pago pendiente es de ${(
            getCurrentInstallment().monto_cuota -
            getCurrentInstallment().monto_pagado
          ).toFixed(2)}`,
        }
      ),
    metodo_pago: z.enum([
      "Efectivo",
      "Transferencia_bancaria",
      "Tarjeta_credito",
    ]),
  });

  const [openDialog, setOpenDialog] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      monto: 0,
    },
  });
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const paymentData: CreatePaymentSchema = {
      cuota_id: getCurrentInstallment().id,
      monto: values.monto,
      metodo_pago: PaymentMethodEnum[values.metodo_pago],
      fecha_pago: new Date(),
    };
    const { error } = await createNewPayment(paymentData);
    if (error) {
      errorToast("Ha ocurrido un error al realizar el pago");
      setOpenDialog(false);
      return;
    }
    successToast("Pago realizado con éxito");
    setOpenDialog(false);
    form.reset();
    redirect(`/loans/${loanId}`);
    // redirect(`/loans/${loanId}`)
    // router.push(`/loans/${loanId}`)
    // `/loans/${loanId}`
  };
  return (
    <Dialog
      open={openDialog}
      onOpenChange={(state) => {
        setOpenDialog(state);
        form.reset();
      }}
    >
      <DialogTrigger asChild>
        <Button className="w-full md:w-auto">
          <DollarSign className="mr-2 h-4 w-4" /> Pagar Cuota
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Registrar Pago de Cuota</DialogTitle>
          <DialogDescription>
            Registra un pago para la cuota #{" "}
            {getCurrentInstallment()?.numero_cuota}
          </DialogDescription>
        </DialogHeader>
        {/* Form */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
            <div className="grid gap-6">
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="monto"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Monto</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2">
                            $
                          </span>
                          <Input
                            type="number"
                            placeholder="0.00"
                            disabled={form.formState.isSubmitting}
                            {...field}
                            className="pl-7"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="metodo_pago"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Método de pago</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        disabled={form.formState.isSubmitting}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecciona el método de pago" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {metodoPago.map((value, i) => (
                            <SelectItem
                              className="hover:bg-secondary"
                              key={i}
                              value={value}
                            >
                              {value.toUpperCase()}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-col gap-2">
                <Button type="submit" disabled={form.formState.isSubmitting}>
                  {form.formState.isSubmitting ? (
                    <LoaderCircle className="w-5 h-5 animate-spin" />
                  ) : (
                    <p>Registrar pago</p>
                  )}
                </Button>

                {/* <Button
                  type="button"
                  variant="outline"
                  onClick={() => setOpenDialog(false)}
                >
                  Cancelar
                </Button> */}
              </div>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default PayInstallmentBtn;
