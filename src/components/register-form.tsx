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
// import { zodResolver } from "@hookform/resolvers/zod"
let  passwordErrors:{message: string}[] = []
const formSchema = z
  .object({
    email: z.string().min(1, {message: 'El email es obligatorio'}).email({ message: "Email inválido" }),
    password: z
      .string(),
    // confirmPassword: z.string(),
  })
  .superRefine((data, ctx) => {
    passwordErrors = []
    if (data.password.length < 8) {
      passwordErrors.push({ message: "La contraseña debe tener al menos 8 caracteres" });
    }
    if (!/[a-z]/.test(data.password)) {
      passwordErrors.push({ message: "Debe contener al menos una letra minúscula" });
    }
    if (!/[A-Z]/.test(data.password)) {
      passwordErrors.push({ message: "Debe contener al menos una mayúscula" });
    }
    if (!/[0-9]/.test(data.password)) {
      passwordErrors.push({ message: "Debe contener al menos un número" });
    }
    if (!/[!@#$%^&*()_+\-=[\]{};:'"|<>?,.\/`~\\]/.test(data.password)) {
      passwordErrors.push({ message: "Debe contener al menos un carácter especial" });
    }

    passwordErrors.forEach((error) => {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: error.message,
        path: ["password"],
      });
    });

    // if (data.password !== data.confirmPassword) {
    //   ctx.addIssue({
    //     code: z.ZodIssueCode.custom,
    //     message: "Las contraseñas no coinciden",
    //     path: ["confirmPassword"],
    //   });
    // }
  });

export function RegisterForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      // confirmPassword: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const response = await signUpNewUser(values.email, values.password);

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
                        : [form.formState.errors.password].map((error, index) => (
                            <li key={index}>{error?.message}</li>
                          ))}
                    </ul>
                  )}
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" className="w-full">
            Crear Cuenta
          </Button>
          {/* <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
          <span className="relative z-10 bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
        <Button variant="outline" className="w-full">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path
              d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
              fill="currentColor"
            />
          </svg>
          Login with GitHub
        </Button> */}
        </div>
        <div className="text-center text-sm">
          Ya tienes cuenta?{" "}
          <Link href="/login" className="underline underline-offset-4">
            Inicia sesión
          </Link>
        </div>
      </form>
    </Form>
  );
}
