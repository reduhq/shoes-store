"use client";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ClientDataTableObject } from "@/models/client";
import { ColumnDef } from "@tanstack/react-table";
import { Star } from "lucide-react";

export const columns: ColumnDef<ClientDataTableObject>[] = [
  {
    accessorKey: "nombre",
    header: "Nombre",
  },
  {
    accessorKey: "calificacion_cliente",
    header: () => <div className="text-center">Rating</div>,
    cell: ({ row }) => {
      const rating = row.original.calificacion_cliente ?? 4.3; // TODO: Pedir en el Backend

      return (
        <div className="flex items-center justify-center">
          {/* <Badge className="capitalize" variant={row.original.estado === 'pendiente'?'secondary':'success'}></Badge> */}
          <Badge className="capitalize" variant={"success"}>
            <Star className="h-3 w-3 mr-1 fill-current" /> {rating}
          </Badge>
          {/* <div
            className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium text-white"
            style={{ backgroundColor: getRatingColor(rating) }}
          >
            
          </div> */}
        </div>
      );
    },
  },
  {
    accessorKey: "prestamos_activos",
    header: () => <div className="text-center">Prestamos Activos</div>,
    cell: ({ row }) => {
      const prestamos = row.original.prestamos;
      return (
        <div className="flex justify-center">
          <div
            className={cn(
              "flex items-center justify-center w-7 h-7 rounded-full ",
              prestamos[0].count > 0 ? "bg-green-500" : "bg-secondary"
            )}
          >
            <span
              className={cn(
                "text-xs font-bold border-transparent",
                prestamos[0].count > 0
                  ? "text-white"
                  : "text-secondary-foreground"
              )}
            >
              {prestamos[0].count}
            </span>
          </div>
        </div>
      );
    },
  },
  // COLUMNA DE FECHA DE ULTIMO PRESTAMO
  // {
  //   accessorKey: "fecha_ultimo_prestamo",
  //   header: "Último Préstamo",
  //   cell: ({ row }) => {
  //     const dateString = row.original.calificacion_cliente ?? "2024-07-10"; // TODO: Remove 'calificacion_cliente' and get the date from the API

  //     const today = new Date();
  //     const loanDate = new Date(dateString);
  //     const diffTime = Math.abs(today.getTime() - loanDate.getTime());
  //     const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  //     // Check if client has active loans
  //     const activeLoans = 0;
  //     if (activeLoans > 0) {
  //       return (
  //         <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
  //           Activo
  //         </div>
  //       );
  //     }

  //     if (diffDays === 0) {
  //       return (
  //         <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
  //           Hoy
  //         </div>
  //       );
  //     } else if (diffDays === 1) {
  //       return (
  //         <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
  //           Hace 1 día
  //         </div>
  //       );
  //     } else if (diffDays < 7) {
  //       return (
  //         <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
  //           Hace {diffDays} días
  //         </div>
  //       );
  //     } else if (diffDays < 30) {
  //       const weeks = Math.floor(diffDays / 7);
  //       return (
  //         <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
  //           Hace {weeks} {weeks === 1 ? "semana" : "semanas"}
  //         </div>
  //       );
  //     } else if (diffDays < 365) {
  //       const months = Math.floor(diffDays / 30);
  //       return (
  //         <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
  //           Hace {months} {months === 1 ? "mes" : "meses"}
  //         </div>
  //       );
  //     } else {
  //       const years = Math.floor(diffDays / 365);
  //       return (
  //         <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
  //           Hace {years} {years === 1 ? "año" : "años"}
  //         </div>
  //       );
  //     }
  //   },
  // },

  // NO SE QUE ES ESTO
  // {
  //   id: "actions",
  //   cell: ({ row }) => {
  //     const client = row.original;

  //     return (
  //       <DropdownMenu>
  //         <DropdownMenuTrigger asChild>
  //           <Button variant="ghost" className="h-8 w-8 p-0">
  //             <span className="sr-only">Open menu</span>
  //             <MoreHorizontal className="h-4 w-4" />
  //           </Button>
  //         </DropdownMenuTrigger>
  //         <DropdownMenuContent align="end">
  //           <DropdownMenuLabel>Actions</DropdownMenuLabel>
  //           <DropdownMenuItem
  //             onClick={() => navigator.clipboard.writeText(client.nombre)}
  //           >
  //             Copy CLient ID
  //           </DropdownMenuItem>
  //           <DropdownMenuSeparator />
  //           <DropdownMenuItem>View Client</DropdownMenuItem>
  //           <DropdownMenuItem>View payment details</DropdownMenuItem>
  //         </DropdownMenuContent>
  //       </DropdownMenu>
  //     );
  //   },
  // },
];
