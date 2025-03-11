import { createNewLoan } from "@/api/loans";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTitle,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
  DialogContent,
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
import { createLoanSchema } from "@/models/loan";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle, Plus } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

const formSchema = z.object({
  monto: z.coerce
    .number()
    .positive()
    .refine(
      (value) => {
        const decimalPlaces = (value.toString().split(".")[1] || "").length;
        return decimalPlaces <= 4;
      },
      {
        message: "El monto puede tener máximo 4 decimales",
      }
    ),
  plazo: z.coerce
    .number()
    .positive()
    .refine(
      (value) => {
        return !value.toString().includes(".");
      },
      {
        message: "El campo tiene que ser un numero entero",
      }
    ),
  tasa: z.coerce
    .number()
    .positive()
    .refine(
      (value) => {
        const decimalPlaces = (value.toString().split(".")[1] || "").length;
        return decimalPlaces <= 4;
      },
      {
        message: "La tasa puede tener máximo 4 decimales",
      }
    ),
  frecuencia_pago: z.enum(["mensual", "quincenal", "semanal", "diario"]),
  tipo_prestamo: z.enum(["INTERES_SIMPLE", "INTERES_COMPUESTO"]),
});

const paymentFrequency = ["mensual", "quincenal", "semanal", "diario"];
const loanType = ["INTERES_SIMPLE", "INTERES_COMPUESTO"];

const LoansCreateBtn = ({ cliente_id }: { cliente_id: string }) => {
  const [openDialog, setOpenDialog] = useState(false)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      monto: 0.0,
      plazo: 0,
      tasa: 0,
    },
  });
  const onSubmit = async(values: z.infer<typeof formSchema>) => {
    const newLoan: createLoanSchema = {
      cliente_id: cliente_id,
      monto: values.monto,
      fecha_inicio: new Date(),
      cuotas: values.plazo,
      tasa_aplicada: values.tasa,
      frecuencia_pago: values.frecuencia_pago,
      tipo_prestamo: values.tipo_prestamo
    };
    const {success} = await createNewLoan(newLoan)
    if(!success){
      errorToast('Se ha producido un error creando un nuevo préstamo')
      setOpenDialog(false)
      return
    }
    successToast('Se ha creado un nuevo prestamo')
    setOpenDialog(false)
  };
  return (
    <Dialog open={openDialog} onOpenChange={state => {
      setOpenDialog(state)
      if(state ) form.reset()
    }}>
      <DialogTrigger asChild>
        <Button className="ml-auto">
          <Plus className="mr-2 h-4 w-4" /> Nuevo Préstamo
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Agregar nuevo préstamo</DialogTitle>
          <DialogDescription>
            Completa los siguientes campos para registrar un nuevo préstamo.
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
                  name="plazo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>N. Cuotas</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="12" {...field}
                            disabled={form.formState.isSubmitting} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="tasa"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tasa %</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type="number"
                            placeholder="15"
                            disabled={form.formState.isSubmitting}
                            className="no-spinners"
                            {...field}
                          />
                          <span className="absolute right-3 top-1/2 -translate-y-1/2">
                            %
                          </span>
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
                  name="frecuencia_pago"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Frecuencia de pago</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        disabled={form.formState.isSubmitting}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecciona la frequencia de pago" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {paymentFrequency.map((value, i) => (
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
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="tipo_prestamo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tipo de interés</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        disabled={form.formState.isSubmitting}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecciona el tipo de interés" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {loanType.map((value, i) => (
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
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? (
                  <LoaderCircle className="w-5 h-5 animate-spin" />
                ) : (
                  <p>Crear</p>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default LoansCreateBtn;
