"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { signUpNewUser } from "@/api/auth";
import { errorToast, successToast } from "@/global-components/toasters";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";

let passwordErrors: { message: string }[] = [];
const formSchema = z
  .object({
    name: z.string().min(3, {message: 'Ingresa un nombre válido'}),
    email: z
      .string()
      .min(1, { message: "El email es obligatorio" })
      .email({ message: "Email inválido" }),
    password: z.string(),
    confirmPassword: z.string(),
  })
  .superRefine((data, ctx) => {
    passwordErrors = [];
    if (data.password.length < 8) {
      passwordErrors.push({
        message: "La contraseña debe tener al menos 8 caracteres",
      });
    }
    if (!/[a-z]/.test(data.password)) {
      passwordErrors.push({
        message: "Debe contener al menos una letra minúscula",
      });
    }
    if (!/[A-Z]/.test(data.password)) {
      passwordErrors.push({ message: "Debe contener al menos una mayúscula" });
    }
    if (!/[0-9]/.test(data.password)) {
      passwordErrors.push({ message: "Debe contener al menos un número" });
    }
    if (!/[!@#$%^&*()_+\-=[\]{};:'"|<>?,.\/`~\\]/.test(data.password)) {
      passwordErrors.push({
        message: "Debe contener al menos un carácter especial",
      });
    }

    passwordErrors.forEach((error) => {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: error.message,
        path: ["password"],
      });
    });

    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Las contraseñas no coinciden",
        path: ["confirmPassword"],
      });
    }
  });

export function RegisterForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const response = await signUpNewUser(values.email, values.password, values.name);

    if (response.success) {
      if (response.data?.user?.identities?.length == 0) {
        errorToast("El usuario ya existe");
        return;
      }
      successToast("Se ha enviado un correo de confirmación");
    } else {
      errorToast(response.error?.message as string);
    }
  };

  // const registerHandler = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   // Email and password Data
  //   const { email, password } = e.target as HTMLFormElement;
  //   const response = await signUpNewUser(email.value, password.value);
  //   console.log(response);
  //   if (response.success) {
  //     if (response.data?.user?.identities?.length == 0) {
  //       errorToast("El usuario ya existe");
  //       return;
  //     }
  //     successToast("Se ha enviado un correo de confirmación");
  //   } else {
  //     errorToast(response.error?.message as string);
  //   }
  // };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("flex flex-col gap-6", className)}
        {...props}
      >
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Crea tu nueva cuenta</h1>
          <p className="text-balance text-sm text-muted-foreground">
            Ingresa los siguientes datos y crea tu cuenta.
          </p>
        </div>
        <div className="grid gap-6">
          <div className="grid gap-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
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
                    <Input placeholder="m@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* <Label htmlFor="email">Email</Label>
            <Input
              name="email"
              id="email"
              type="email"
              placeholder="m@example.com"
              required
            /> */}
          </div>
          <div className="grid gap-2">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center">
                    <FormLabel>Contraseña</FormLabel>
                    <a
                      href="#"
                      className="ml-auto text-sm underline-offset-4 hover:underline"
                    >
                      Olvidaste tu contraseña?
                    </a>
                  </div>
                  <FormControl>
                    <Input type="password" placeholder="" {...field} />
                  </FormControl>
                  {passwordErrors && (
                    <ul className="text-[12.8px] text-red-500">
                      {Array.isArray(passwordErrors)
                        ? passwordErrors.map((error, index) => (
                            <li key={index}>{error.message}</li>
                          ))
                        : [form.formState.errors.password].map(
                            (error, index) => (
                              <li key={index}>{error?.message}</li>
                            )
                          )}
                    </ul>
                  )}
                </FormItem>
              )}
            />
          </div>
          <div className="grid gap-2">
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Coonfirmar contraseña</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" className="w-full">
            Crear Cuenta
          </Button>
        </div>
        <div className="text-center text-sm">
          Ya tienes cuenta?{" "}
          <Link href="/auth/login" className="underline underline-offset-4">
            Inicia sesión
          </Link>
        </div>
      </form>
    </Form>
  );
}
