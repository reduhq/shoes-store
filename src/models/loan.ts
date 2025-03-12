export enum PaymentFrequencyENUM{
  diario = 'diario',
  semanal = 'semanal',
  quincenal = 'quincenal',
  mensual = 'mensual',
}

export enum LoanType{
  INTERES_SIMPLE = 'INTERES_SIMPLE',
  INTERES_COMPUESTO = 'INTERES_COMPUESTO'
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

export interface createLoanSchema{
  cliente_id: string
  monto: number
  fecha_inicio: Date
  cuotas: number
  tasa_aplicada: number
  frecuencia_pago: PaymentFrequencyENUM // PaymentFrequencyENUM{
  tipo_prestamo: LoanType // LoanType
}