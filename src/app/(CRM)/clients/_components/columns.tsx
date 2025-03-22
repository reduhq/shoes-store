"use client";
import { ClientDataTableObject } from "@/models/client";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<ClientDataTableObject>[] = [
  {
    accessorKey: "nombre",
    header: "Nombre",
  },
  {
    accessorKey: "calificacion_cliente",
    header: "Rating",
  },
  {
    accessorKey: "prestamos_activos",
    header: "Prestamos Activos",
    cell: ({row}) => {
      const prestamos = row.original.prestamos
      return prestamos[0].count
    }
  },
  {
    accessorKey: "fecha_ultimo_prestamo",
    header: "Último Préstamo",
  },
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
