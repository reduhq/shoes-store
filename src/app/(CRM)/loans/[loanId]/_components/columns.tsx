'use client'
import { Badge } from "@/components/ui/badge"
import { Installments } from "@/models/installment"
import { ColumnDef } from "@tanstack/react-table"

export const columns: ColumnDef<Installments>[] = [
  {
    accessorKey: 'numero_cuota',
    header: '#'
  },
  {
    accessorKey: 'monto_cuota',
    header: 'Monto'
  },
  {
    accessorKey: 'monto_pagado',
    header: 'Pagado',
    cell: ({row}) => (
      <div>{row.original.monto_pagado.toFixed(2)}</div>
    )
  },
  {
    accessorKey: 'pagada',
    header: 'Estado',
    cell: ({row}) =>(
      <div><Badge variant={row.original.pagada?"success":'destructive'}>{row.original.pagada?'Pagada':'Pendiente'}</Badge></div>
    )
  },
]