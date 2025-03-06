'use client'
import React, { useEffect, useState } from 'react'
import { DataTable } from '../../_components/data-table'
import { columns } from './columns'
import { getLoansByClientId } from '@/api/loans'
import { Loan } from '@/models/loan'

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
    <DataTable data={loans} columns={columns}/>
  )
}

export default LoansDataTable