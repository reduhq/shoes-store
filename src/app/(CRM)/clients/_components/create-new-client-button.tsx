"use client";
import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@radix-ui/react-dialog";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { createClientSchema } from "@/models/client";
import { createNewClient } from "@/api/clients";
import { errorToast, successToast } from "@/global-components/toasters";
import { redirect } from "next/navigation";
import { LoaderCircle } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(3, { message: "Ingresa un nombre válido" }),
  lastname: z.string(),
  email: z.string().email().or(z.literal("")),
  phone: z.string(),
  adress: z.string(),
});

const CreateNewClientButton = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      lastname: "",
      email: "",
      phone: "",
      adress: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const client: createClientSchema = {
      nombre: values.name,
      apellido: values.lastname,
      email: values.email,
      telefono: values.phone,
      direccion: values.adress,
      fecha_registro: new Date(),
    };
    const response = await createNewClient(client);
    if (response.success) {
      successToast("El cliente fue creado exitosamente");
      setOpenDialog(false);
      form.reset();
      redirect("/clients");
    } else {
      errorToast("Error al crear el nuevo cliente");
      setOpenDialog(false);
      form.reset();
    }
    console.log(new Date());
  };
  return (
    <Dialog
      open={openDialog}
      onOpenChange={(state) => {
        setOpenDialog(state);
        if (state) form.reset();
      }}
    >
      <DialogTrigger asChild>
        <Button onClick={() => setOpenDialog(true)}>+ Nuevo Cliente</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Crea un nuevo Cliente</DialogTitle>
          <DialogDescription>
            Añade y gestiona nuevos clientes para sus préstamos.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid gap-6">
                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Nombre{" "}
                          <span className="text-[#f00] text-[1rem]">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="John"
                            {...field}
                            disabled={form.formState.isSubmitting}
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
                    name="lastname"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Apellido</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Doe"
                            {...field}
                            disabled={form.formState.isSubmitting}
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
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="m@example.com"
                            {...field}
                            disabled={form.formState.isSubmitting}
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
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Teléfono</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="25252525"
                            {...field}
                            disabled={form.formState.isSubmitting}
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
                    name="adress"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Dirección</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder=""
                            className="resize-none"
                            disabled={form.formState.isSubmitting}
                            {...field}
                          />
                        </FormControl>
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
          {/* <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="name" className="text-right">
          Name
        </Label>
        <Input id="name" className="col-span-3" />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="username" className="text-right">
          Username
        </Label>
        <Input id="username"  className="col-span-3" />
      </div> */}
        </div>
        <DialogFooter>
          {/* <Button type="submit">Save changes</Button> */}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateNewClientButton;
