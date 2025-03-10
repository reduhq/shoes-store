"use client";
import { Badge } from "@/components/ui/badge";
import { Loan } from "@/models/loan";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<Loan>[] = [
  {
    accessorKey: "monto",
    header: "Monto",
  },
  {
    accessorKey: "fecha_inicio",
    header: () => <div className="hidden md:table-cell">Fecha</div>,
    cell: ({row}) => <div className="hidden md:table-cell">{row.original.fecha_inicio.toString()}</div>
  },
  {
    accessorKey: "cuotas",
    header: () => <div className="text-left">Plazo</div>,
    cell: ({row}) =>{
      const plazo = row.original.cuotas
      return <div>{plazo} meses</div>
    }
  },
  {
    accessorKey: "estado",
    header: "Estado",
    cell: ({row}) =>(
      // estado: pendiente, cancelado, pagado
      <Badge className="capitalize" variant={row.original.estado === 'pendiente'?'secondary':'success'}>{row.original.estado}</Badge>
    )
  },
  {
    accessorKey: "tasa_aplicada",
    header: "Tasa %",
    cell: ({row}) =>{
      return <div>{row.original.tasa_aplicada}%</div>
    }
  },
]