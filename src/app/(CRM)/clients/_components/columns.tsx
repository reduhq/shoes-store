import { Client } from "@/models/client"
import {ColumnDef} from "@tanstack/react-table"

export const columns: ColumnDef<Client>[] = [
  {
    accessorKey: "nombre",
    header: "Nombre"
  }
]