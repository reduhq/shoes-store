'use client'
import React, { useEffect, useState } from 'react'
import { DataTable } from '../../_components/data-table'
import { columns } from './columns'
import { getLoansByClientId } from '@/api/loans'
import { Loan } from '@/models/loan'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import LoansCreateBtn from './loans-create-btn'

const LoansDataTable = ({clientId}: {clientId: string}) => {
  const [loans, setLoans] = useState<Loan[]>([])
  useEffect(()=>{
    const data = async()=>{
      const loansData = await getLoansByClientId(clientId)
      setLoans(loansData as Loan[])
    }
    data()
  })
  return (
    
    <Card>
    <CardHeader className="flex flex-row items-center justify-between">
      <div>
        <CardTitle>Préstamos</CardTitle>
        <CardDescription>
          Historial de préstamos del cliente
        </CardDescription>
      </div>
      <LoansCreateBtn/>
    </CardHeader>
    <CardContent>
      <div className="overflow-x-auto">
      <DataTable data={loans} columns={columns}/>
      </div>
    </CardContent>
  </Card>
  )
}

export default LoansDataTable