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
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle, Plus } from "lucide-react";
import React from "react";
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
        message: "El monto debe tener máximo 4 decimales",
      }
    ),
  plazo: z.coerce.number().positive(),
  tasa: z.coerce.number().positive(),
  frecuencia_pago: z.enum(["MENSUAL", "QUINCENAL", "SEMANAL", "DIARIO"]),
  tipo_prestamo: z.enum(["INTERES_SIMPLE", "INTERES_COMPUESTO"]),
});

const paymentFrequency = ["MENSUAL", "QUINCENAL", "SEMANAL", "DIARIO"];
const loanType = ["INTERES_SIMPLE", "INTERES_COMPUESTO"];

const LoansCreateBtn = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      monto: 0.0,
      plazo: 0,
      tasa: 0,
    },
  });
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="ml-auto">
          <Plus className="mr-2 h-4 w-4" /> Nuevo Préstamo
        </Button>
      </DialogTrigger>
      <DialogContent>
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
                        <Input type="number" placeholder="0.00" {...field} />
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
                      <FormLabel>Plazo (meses)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          onKeyDown={(e) =>
                            e.key.toString() == "." && e.preventDefault()
                          }
                          placeholder="12"
                          {...field}
                        />
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
                        <Input
                          type="number"
                          onKeyDown={(e) =>
                            e.key.toString() == "." && e.preventDefault()
                          }
                          placeholder="15"
                          {...field}
                        />
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
