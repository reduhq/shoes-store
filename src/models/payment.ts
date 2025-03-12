export enum PaymentMethodEnum{
  Efectivo = 'Efectivo',
  Transferencia_bancaria = 'Transferencia_bancaria',
  Tarjeta_credito = 'Tarjeta_credito'
}

export interface CreatePaymentSchema{
  cuota_id: string
  monto: number
  fecha_pago: Date
  metodo_pago: PaymentMethodEnum
}