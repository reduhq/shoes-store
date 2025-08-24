import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AlertTriangle,
  CalendarDays,
  CreditCard,
  DollarSign,
  TrendingUp,
} from "lucide-react";
import React from "react";

const ClientStatisticsCards = () => {
  // Format date
  const formatDate = (dateString: string) => {
    if (dateString === "-") return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString("es-ES", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatCurrency = (value: number) => {
    return `$${value.toLocaleString()}`;
  };

  // Get urgency status for next payment
  const getPaymentUrgency = (days: number) => {
    if (days <= 0)
      return {
        color: "text-red-700",
        bg: "bg-red-50",
        border: "border-red-200",
        status: "Vencido",
      };
    if (days <= 3)
      return {
        color: "text-red-700",
        bg: "bg-red-50",
        border: "border-red-200",
        status: "Urgente",
      };
    if (days <= 7)
      return {
        color: "text-amber-700",
        bg: "bg-amber-50",
        border: "border-amber-200",
        status: "Próximo",
      };
    return {
      color: "text-green-700",
      bg: "bg-green-50",
      border: "border-green-200",
      status: "A Tiempo",
    };
  };

  const paymentUrgency = getPaymentUrgency(3);

  return (
    <div className="md:col-span-6 lg:col-span-6 xl:col-span-6 2xl:col-span-6 grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 2xl:grid-cols-1 gap-3 sm:gap-4 md:gap-4 lg:gap-5 xl:gap-6">
      {/* Total Prestado - Dashboard Style */}
      {/* <Card className="shadow-lg border-0 bg-gradient-to-br from-green-50 to-emerald-50 hover:shadow-xl transition-all duration-300 w-full"> */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xs sm:text-sm md:text-sm lg:text-sm xl:text-sm 2xl:text-base font-medium text-gray-700">
              Total Prestado
            </CardTitle>
            <div className="p-2 bg-green-100 rounded-lg">
              <DollarSign className="h-4 w-4 text-green-600" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-lg sm:text-xl md:text-xl lg:text-2xl xl:text-2xl 2xl:text-3xl font-bold text-green-700">
            {formatCurrency(3500)}
          </div>
          <p className="text-xs text-green-600 mt-1">
            {formatCurrency(10000)} pagado
          </p>
          <div className="mt-2 bg-green-200 rounded-full h-2">
            <div
              className="bg-green-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${(10000 / 20000) * 100}%` }}
              // style={{ width: `${(total paid / total borrowed) * 100}%` }}
            ></div>
          </div>
        </CardContent>
      </Card>

      {/* Intereses Generados */}
      {/* <Card className="shadow-lg border-0 bg-gradient-to-br from-purple-50 to-violet-50 hover:shadow-xl transition-all duration-300"> */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xs sm:text-sm md:text-sm lg:text-sm xl:text-sm 2xl:text-base font-medium text-gray-700">
              Intereses Generados
            </CardTitle>
            <div className="p-2 bg-purple-100 rounded-lg">
              <TrendingUp className="h-4 w-4 text-purple-600" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-lg sm:text-xl md:text-xl lg:text-2xl xl:text-2xl 2xl:text-3xl font-bold text-purple-700">
            {formatCurrency(2500)}
          </div>
          <Badge
            variant="outline"
            className="bg-purple-100 text-purple-700 border-purple-200 mt-1 text-xs"
          >
            {((2500 / 20000) * 100).toFixed(1)}% ROI
            {/* {((total InterestEarned / total borrowed) * 100).toFixed(1)}% ROI  */}
          </Badge>
          <p className="text-xs text-purple-600 mt-1">Rentabilidad total</p>
        </CardContent>
      </Card>

      {/* Préstamos Activos */}
      {/* <Card className="shadow-lg border-0 bg-gradient-to-br from-teal-50 to-cyan-50 hover:shadow-xl transition-all duration-300"> */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xs sm:text-sm md:text-sm lg:text-sm xl:text-sm 2xl:text-base font-medium text-gray-700">
              Préstamos Activos
            </CardTitle>
            <div className="p-2 bg-teal-100 rounded-lg">
              <CreditCard className="h-4 w-4 text-teal-600" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-lg sm:text-xl md:text-xl lg:text-2xl xl:text-2xl 2xl:text-3xl font-bold text-teal-700">
            {3}
            {/* {loans.filter((loan) => loan.status === "Active").length} */}
          </div>
          <Badge
            variant="outline"
            className="bg-teal-100 text-teal-700 border-teal-200 mt-1 text-xs"
          >
            {2} completados
            {/* {loans.filter((loan) => loan.status === "Completed").length} completados */}
          </Badge>
          <p className="text-xs text-teal-600 mt-1">Total: {5} préstamos</p>
          {/* <p className="text-xs text-teal-600 mt-1">Total: {loans.length} préstamos</p> */}
        </CardContent>
      </Card>

      {/* Próximo Pago */}
      {/* <Card className="shadow-lg border-0 bg-gradient-to-br from-amber-50 to-orange-50 hover:shadow-xl transition-all duration-300"> */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xs sm:text-sm md:text-sm lg:text-sm xl:text-sm 2xl:text-base font-medium text-gray-700">
              Próximo Pago
            </CardTitle>
            <div className="p-2 bg-amber-100 rounded-lg">
              {/* {daysUntilPayment <= 3 ? ( */}
              {3 <= 3 ? (
                <AlertTriangle className="h-4 w-4 text-red-600" />
              ) : (
                <CalendarDays className="h-4 w-4 text-amber-600" />
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-lg sm:text-xl md:text-xl lg:text-2xl xl:text-2xl 2xl:text-3xl font-bold text-amber-700">
            {Math.abs(3)} días
            {/* {Math.abs(daysUntilPayment)} días */}
          </div>
          <Badge
            variant="outline"
            className={`mt-1 text-xs ${paymentUrgency.bg} ${paymentUrgency.color} ${paymentUrgency.border}`}
          >
            {paymentUrgency.status}
          </Badge>
          <p className="text-xs text-amber-600 mt-1">
            {formatCurrency(2500)} - {formatDate("03-25-2003")}
            {/* {formatCurrency(client.nextPaymentAmount)} - {formatDate(client.nextPaymentDate)} */}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ClientStatisticsCards;
