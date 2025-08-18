import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Separator } from '@/components/ui/separator'
import { Client } from '@/models/client'
import { DropdownMenu } from '@radix-ui/react-dropdown-menu'
import { Briefcase, Building, Calendar, Edit, Mail, MapPin, MoreHorizontal, Phone, Plus, Star } from 'lucide-react'
import React from 'react'

const ClientProfileCard = ({client}:{client:Client}) => {
  
  // Render stars for rating
  const renderRating = (rating: number) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <Star
          key={i}
          className={`h-5 w-5 ${
            i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
          }`}
        />
      ));
  };
  
  // Format date
  const formatDate = (dateString: string) => {
    if (dateString === "-") return "-"
    const date = new Date(dateString)
    return date.toLocaleDateString("es-ES", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <Card className="md:col-span-6 lg:col-span-6 xl:col-span-6 2xl:col-span-6 shadow-lg border-0 bg-white/95 backdrop-blur-sm">
            <CardHeader className="text-center pb-3 sm:pb-4">
              <div className="flex justify-center mb-3">
                <Avatar className="h-16 w-16 sm:h-18 sm:w-18 md:h-20 md:w-20 lg:h-22 lg:w-22 xl:h-24 xl:w-24 2xl:h-28 2xl:w-28 ring-4 ring-primary/10">
                  <AvatarFallback className="text-lg sm:text-xl md:text-xl lg:text-2xl xl:text-2xl 2xl:text-3xl font-bold bg-gradient-to-br from-primary to-primary/80 text-white">
                    {client.nombre[0]}
                    {client.apellido[0]}
                  </AvatarFallback>
                </Avatar>
              </div>
              <CardTitle className="text-lg sm:text-xl md:text-xl lg:text-2xl xl:text-2xl 2xl:text-3xl font-bold text-gray-900 leading-tight">
                {`${client.nombre} ${client.apellido}`}
              </CardTitle>
              <div className="flex items-center justify-center gap-1 mt-2">
                {renderRating(4.5) /*Calificacion del cliente*/}
                <span className="ml-2 text-sm text-muted-foreground">4.5/5</span> 
              </div>
              <Badge
                variant={'active' === "active" ? "default" : "secondary"} // estado del cliente
                className="mt-3 w-fit mx-auto px-3 py-1"
              >
                {'active' === "active" ? "Cliente Activo" : "Inactivo"} 
              </Badge> 
            </CardHeader>
            <CardContent className="space-y-2 sm:space-y-3">
              <div className="space-y-2">
                <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="p-2 bg-blue-50 rounded-lg flex-shrink-0">
                    <Mail className="h-4 w-4 text-blue-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-muted-foreground">Email</p>
                    <p className="text-sm font-medium truncate">{client.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="p-2 bg-green-50 rounded-lg flex-shrink-0">
                    <Phone className="h-4 w-4 text-green-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-muted-foreground">Teléfono</p>
                    <p className="text-sm font-medium">{client.telefono}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="p-2 bg-purple-50 rounded-lg flex-shrink-0">
                    <MapPin className="h-4 w-4 text-purple-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-muted-foreground">Dirección</p>
                    <p className="text-sm font-medium line-clamp-2">{client.direccion}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="p-2 bg-orange-50 rounded-lg flex-shrink-0">
                    <Briefcase className="h-4 w-4 text-orange-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-muted-foreground">Ocupación</p>
                    <p className="text-sm font-medium">Ingeniero en Sistemas</p>  
                  </div>
                </div>

                <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="p-2 bg-indigo-50 rounded-lg flex-shrink-0">
                    <Building className="h-4 w-4 text-indigo-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-muted-foreground">Empresa</p>
                    <p className="text-sm font-medium">Sistematica Internacional</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="p-2 bg-gray-50 rounded-lg flex-shrink-0">
                    <Calendar className="h-4 w-4 text-gray-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-muted-foreground">Cliente desde</p>
                    <p className="text-sm font-medium">{formatDate('03-25-2003')}</p>
                  </div>
                </div>
              </div>

              <Separator className="my-4" />

              <div className="flex flex-col gap-2">
                <Button /*onClick={handleNewLoan}*/ className="w-full shadow-md">
                  <Plus className="mr-2 h-4 w-4" />
                  <span className="hidden sm:inline">Nuevo Préstamo</span>
                  <span className="sm:hidden">Préstamo</span>
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="w-full shadow-md bg-white">
                      <MoreHorizontal className="mr-2 h-4 w-4" />
                      <span className="hidden sm:inline">Más acciones</span>
                      <span className="sm:hidden">Acciones</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="center" className="w-48">
                    <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="gap-2">
                      <Edit className="h-4 w-4" />
                      Editar perfil
                    </DropdownMenuItem>
                    {/* <DropdownMenuItem className="gap-2">
                      <Download className="h-4 w-4" />
                      Exportar datos
                    </DropdownMenuItem>
                    <DropdownMenuItem className="gap-2">
                      <FileText className="h-4 w-4" />
                      Ver documentos
                    </DropdownMenuItem> */}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardContent>
          </Card>
  )
}

export default ClientProfileCard