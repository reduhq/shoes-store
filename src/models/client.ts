export interface createClientSchema{
  nombre: string
  apellido: string | null
  telefono: string | null
  email: string | null
  direccion: string | null
  fecha_registro: Date
}

export interface Client{
  nombre: string
}