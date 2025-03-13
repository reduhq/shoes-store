export enum PaymentMethodEnum{
  Efectivo = 'Efectivo',
  Transferencia_bancaria = 'Transferencia_bancaria',
  Tarjeta_credito = 'Tarjeta_credito'
}

export interface Payment{
  fecha_pago: Date
  monto: number
  metodo_pago: PaymentMethodEnum
}

export interface CreatePaymentSchema{
  cuota_id: string
  monto: number
  fecha_pago: Date
  metodo_pago: PaymentMethodEnum
}