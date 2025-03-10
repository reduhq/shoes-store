export enum PaymentFrequencyENUM{
  diario,
  semanal,
  quincenal,
  mensual,
}

export interface Loan{
  id: string
  cliente_id: string
  monto: number
  fecha_inicio: Date
  cuotas: number
  estado: string
  tasa_aplicada: number
}