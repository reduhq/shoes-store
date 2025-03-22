// import React from "react";
// import Header from "../_components/header";

// const WelcomePage = () => {
//   return (
//     <>
//     <Header title="Dashboard"/>
//       {/* <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
//         <div className="grid auto-rows-min gap-4 md:grid-cols-3">
//           <div className="aspect-video rounded-xl bg-muted/50" />
//           <div className="aspect-video rounded-xl bg-muted/50" />
//           <div className="aspect-video rounded-xl bg-muted/50" />
//         </div>
//         <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
//       </div> */}
//     </>
//   );
// };

// export default WelcomePage;

"use client";
import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  ArrowUpRight,
  DollarSign,
  AlertCircle,
  Calendar,
  CreditCard,
  TrendingUp,
  CheckCircle2,
  Clock,
  HelpCircle,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip as ChartTooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line, Bar, Doughnut } from "react-chartjs-2";
import Header from "../_components/header";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  ChartTooltip,
  Legend,
  Filler
);

export default function Dashboard() {
  const [isClient, setIsClient] = useState(false);
  const [timeRange, setTimeRange] = useState("month");

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Mock data for dashboard based on time range
  const dashboardData = {
    month: {
      totalLoans: 125000,
      activeLoans: 42,
      overduePayments: 7,
      collectionRate: 94.5,
      revenueMonth: 3250,
      changeFromLastPeriod: 12.5,
      upcomingPayments: 15,
      completedLoans: 8,
      newLoans: 12,
    },
    quarter: {
      totalLoans: 350000,
      activeLoans: 42,
      overduePayments: 12,
      collectionRate: 92.8,
      revenueMonth: 9750,
      changeFromLastPeriod: 8.3,
      upcomingPayments: 35,
      completedLoans: 22,
      newLoans: 30,
    },
    year: {
      totalLoans: 1250000,
      activeLoans: 42,
      overduePayments: 15,
      collectionRate: 93.2,
      revenueMonth: 42500,
      changeFromLastPeriod: 15.7,
      upcomingPayments: 45,
      completedLoans: 65,
      newLoans: 85,
    },
    all: {
      totalLoans: 2500000,
      activeLoans: 42,
      overduePayments: 7,
      collectionRate: 95.1,
      revenueMonth: 125000,
      changeFromLastPeriod: 22.5,
      upcomingPayments: 15,
      completedLoans: 120,
      newLoans: 162,
    },
  };

  // Get current data based on selected time range
  const currentData = dashboardData[timeRange as keyof typeof dashboardData];

  // Time range labels
  const timeRangeLabels = {
    month: "Este mes",
    quarter: "Este trimestre",
    year: "Este año",
    all: "Todo el tiempo",
  };

  // Mock data for charts
  const monthlyLabels = [
    "Ene",
    "Feb",
    "Mar",
    "Abr",
    "May",
    "Jun",
    "Jul",
    "Ago",
    "Sep",
    "Oct",
    "Nov",
    "Dic",
  ];

  const loanIssuanceData = {
    labels: monthlyLabels,
    datasets: [
      {
        label: "Préstamos Emitidos",
        data: [
          12000, 19000, 15000, 22000, 18000, 24000, 25000, 30000, 28000, 32000,
          35000, 40000,
        ],
        borderColor: "rgb(99, 102, 241)",
        backgroundColor: "rgba(99, 102, 241, 0.1)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const paymentCollectionData = {
    labels: monthlyLabels,
    datasets: [
      {
        label: "Pagos Recibidos",
        data: [
          10000, 15000, 12000, 18000, 16000, 20000, 22000, 25000, 24000, 28000,
          30000, 35000,
        ],
        backgroundColor: "rgb(34, 197, 94)",
        borderColor: "rgb(34, 197, 94)",
      },
      {
        label: "Pagos Esperados",
        data: [
          11000, 16000, 13000, 19000, 17000, 21000, 23000, 26000, 25000, 29000,
          32000, 37000,
        ],
        backgroundColor: "rgb(99, 102, 241)",
        borderColor: "rgb(99, 102, 241)",
      },
    ],
  };

  const loanStatusData = {
    labels: ["Activos", "Completados", "Atrasados"],
    datasets: [
      {
        data: [
          currentData.activeLoans,
          currentData.completedLoans,
          currentData.overduePayments,
        ],
        backgroundColor: [
          "rgb(99, 102, 241)",
          "rgb(34, 197, 94)",
          "rgb(239, 68, 68)",
        ],
        borderWidth: 1,
      },
    ],
  };

  // Recent loans data
  const recentLoans = [
    { id: "L012", client: "María González", amount: 3500, date: "2023-11-28" },
    { id: "L011", client: "Juan Pérez", amount: 5000, date: "2023-11-25" },
    { id: "L010", client: "Ana Martínez", amount: 2000, date: "2023-11-20" },
    { id: "L009", client: "Roberto Sánchez", amount: 7500, date: "2023-11-15" },
  ];

  // Upcoming payments data
  const upcomingPayments = [
    {
      id: "P045",
      loanId: "L008",
      client: "Laura Torres",
      amount: 416.67,
      dueDate: "2023-12-05",
    },
    {
      id: "P046",
      loanId: "L005",
      client: "Carlos Rodríguez",
      amount: 333.33,
      dueDate: "2023-12-10",
    },
    {
      id: "P047",
      loanId: "L012",
      client: "María González",
      amount: 291.67,
      dueDate: "2023-12-15",
    },
    {
      id: "P048",
      loanId: "L011",
      client: "Juan Pérez",
      amount: 416.67,
      dueDate: "2023-12-25",
    },
  ];

  // Format currency
  const formatCurrency = (value: number) => {
    return `$${value.toLocaleString()}`;
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("es-ES", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Handle time range change
  const handleTimeRangeChange = (value: string) => {
    setTimeRange(value);
  };

  return (
    <>
      <Header title="Dashboard" />
      <div className="px-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground">
              Resumen general y estadísticas del sistema de préstamos
            </p>
          </div>
          <div className="flex items-center gap-2">
            <p className="text-sm text-muted-foreground whitespace-nowrap">
              Periodo de tiempo:
            </p>
            <Select value={timeRange} onValueChange={handleTimeRangeChange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Seleccionar periodo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="month">Este mes</SelectItem>
                <SelectItem value="quarter">Este trimestre</SelectItem>
                <SelectItem value="year">Este año</SelectItem>
                <SelectItem value="all">Todo el tiempo</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Time period indicator */}
        <div className="flex justify-end mb-6">
          <Button variant="outline" size="sm">
            Exportar datos
          </Button>
        </div>

        {/* KPI Cards - Versión simplificada */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card className="overflow-hidden">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-sm font-medium">
                    Total en Préstamos
                  </CardTitle>
                </div>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="p-2 bg-primary/10 rounded-full cursor-help">
                        <DollarSign className="h-4 w-4 text-primary" />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Monto total emitido en préstamos</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="text-3xl font-bold">
                {formatCurrency(currentData.totalLoans)}
              </div>
              <div className="flex items-center mt-1">
                <ArrowUpRight className="h-4 w-4 mr-1 text-green-500" />
                <span className="text-sm text-green-500 font-medium">
                  {currentData.changeFromLastPeriod}%
                </span>
              </div>
            </CardContent>
          </Card>

          <Card className="overflow-hidden">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-sm font-medium">
                    Préstamos Activos
                  </CardTitle>
                </div>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="p-2 bg-blue-500/10 rounded-full cursor-help">
                        <CreditCard className="h-4 w-4 text-blue-500" />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Número de préstamos en curso</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="text-3xl font-bold">
                {currentData.activeLoans}
              </div>
              <div className="flex items-center mt-1">
                <span className="text-sm text-muted-foreground">
                  {currentData.completedLoans} completados
                </span>
              </div>
            </CardContent>
          </Card>

          <Card className="overflow-hidden">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-sm font-medium">
                    Tasa de Cobro
                  </CardTitle>
                </div>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="p-2 bg-green-500/10 rounded-full cursor-help">
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Porcentaje de pagos recibidos a tiempo</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="text-3xl font-bold">
                {currentData.collectionRate}%
              </div>
              <div className="flex items-center mt-1">
                <AlertCircle className="h-4 w-4 mr-1 text-amber-500" />
                <span className="text-sm text-amber-500">
                  {currentData.overduePayments} atrasados
                </span>
              </div>
            </CardContent>
          </Card>

          <Card className="overflow-hidden">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-sm font-medium">
                    Pagos Próximos
                  </CardTitle>
                </div>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="p-2 bg-amber-500/10 rounded-full cursor-help">
                        <Calendar className="h-4 w-4 text-amber-500" />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Pagos esperados en los próximos 30 días</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="text-3xl font-bold">
                {currentData.upcomingPayments}
              </div>
              <div className="flex items-center mt-1">
                <span className="text-sm text-muted-foreground">
                  {formatCurrency(currentData.upcomingPayments * 350)}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <Tabs defaultValue="overview" className="mb-6">
          <TabsList>
            <TabsTrigger value="overview">Resumen</TabsTrigger>
            <TabsTrigger value="loans">Préstamos</TabsTrigger>
            <TabsTrigger value="payments">Pagos</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <CardTitle>Préstamos Emitidos</CardTitle>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <HelpCircle className="h-4 w-4 text-muted-foreground cursor-help" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>
                                Muestra la tendencia de préstamos emitidos a lo
                                largo del tiempo, permitiendo identificar
                                patrones y temporadas de mayor actividad.
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                      <CardDescription>
                        Tendencia mensual de préstamos emitidos
                      </CardDescription>
                    </div>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                          >
                            <HelpCircle className="h-4 w-4 text-muted-foreground" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>
                            Muestra el monto total de préstamos emitidos cada
                            mes durante el último año
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </CardHeader>
                <CardContent>
                  {isClient && (
                    <Line
                      data={loanIssuanceData}
                      height={250}
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        scales: {
                          y: {
                            beginAtZero: true,
                            ticks: {
                              callback: (value) =>
                                `$${Number(value).toLocaleString()}`,
                            },
                          },
                        },
                      }}
                    />
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <CardTitle>Estado de Préstamos</CardTitle>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <HelpCircle className="h-4 w-4 text-muted-foreground cursor-help" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>
                                Visualiza la proporción de préstamos según su
                                estado actual: activos, completados o atrasados,
                                para evaluar la salud general de la cartera.
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                      <CardDescription>
                        Distribución de préstamos por estado
                      </CardDescription>
                    </div>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                          >
                            <HelpCircle className="h-4 w-4 text-muted-foreground" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>
                            Muestra la distribución actual de préstamos según su
                            estado
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </CardHeader>
                <CardContent className="flex justify-center">
                  {isClient && (
                    <Doughnut
                      data={loanStatusData}
                      height={250}
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                          legend: {
                            position: "bottom",
                          },
                        },
                      }}
                    />
                  )}
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <CardTitle>Rendimiento de Cobros</CardTitle>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <HelpCircle className="h-4 w-4 text-muted-foreground cursor-help" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>
                              Compara los pagos esperados con los realmente
                              recibidos, permitiendo evaluar la eficiencia del
                              proceso de cobro y detectar posibles problemas.
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <CardDescription>
                      Comparación entre pagos esperados y recibidos
                    </CardDescription>
                  </div>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <HelpCircle className="h-4 w-4 text-muted-foreground" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>
                          Compara los pagos esperados con los pagos realmente
                          recibidos cada mes
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </CardHeader>
              <CardContent>
                {isClient && (
                  <Bar
                    data={paymentCollectionData}
                    height={250}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      scales: {
                        y: {
                          beginAtZero: true,
                          ticks: {
                            callback: (value) =>
                              `${Number(value).toLocaleString()}`,
                          },
                        },
                      },
                    }}
                  />
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="loans" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <CardTitle>Préstamos Recientes</CardTitle>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <HelpCircle className="h-4 w-4 text-muted-foreground cursor-help" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>
                              Lista de los préstamos más recientes emitidos en
                              el sistema, mostrando información básica como
                              cliente, monto y fecha.
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <CardDescription>
                      Últimos préstamos emitidos en{" "}
                      {timeRangeLabels[
                        timeRange as keyof typeof timeRangeLabels
                      ].toLowerCase()}
                    </CardDescription>
                  </div>
                  <Button variant="outline" size="sm">
                    Ver todos
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-2 font-medium">ID</th>
                        <th className="text-left py-3 px-2 font-medium">
                          Cliente
                        </th>
                        <th className="text-left py-3 px-2 font-medium">
                          Monto
                        </th>
                        <th className="text-left py-3 px-2 font-medium">
                          Fecha
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentLoans.map((loan) => (
                        <tr
                          key={loan.id}
                          className="border-b hover:bg-muted/50"
                        >
                          <td className="py-3 px-2">{loan.id}</td>
                          <td className="py-3 px-2">{loan.client}</td>
                          <td className="py-3 px-2">
                            {formatCurrency(loan.amount)}
                          </td>
                          <td className="py-3 px-2">{formatDate(loan.date)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <CardTitle>Distribución por Monto</CardTitle>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <HelpCircle className="h-4 w-4 text-muted-foreground cursor-help" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>
                                Muestra cómo se distribuyen los préstamos según
                                su monto, ayudando a identificar los rangos más
                                comunes y planificar productos financieros.
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                      <CardDescription>
                        Préstamos agrupados por rango de monto en{" "}
                        {timeRangeLabels[
                          timeRange as keyof typeof timeRangeLabels
                        ].toLowerCase()}
                      </CardDescription>
                    </div>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                          >
                            <HelpCircle className="h-4 w-4 text-muted-foreground" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>
                            Muestra cómo se distribuyen los préstamos según su
                            monto
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </CardHeader>
                <CardContent>
                  {isClient && (
                    <Bar
                      data={{
                        labels: [
                          "$0-$1000",
                          "$1001-$3000",
                          "$3001-$5000",
                          "$5001-$10000",
                          "Más de $10000",
                        ],
                        datasets: [
                          {
                            label: "Número de préstamos",
                            data: [5, 12, 18, 8, 4],
                            backgroundColor: "rgb(99, 102, 241)",
                          },
                        ],
                      }}
                      height={250}
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                      }}
                    />
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <CardTitle>Distribución por Plazo</CardTitle>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <HelpCircle className="h-4 w-4 text-muted-foreground cursor-help" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>
                                Visualiza la distribución de préstamos según su
                                plazo, permitiendo entender las preferencias de
                                los clientes y optimizar las ofertas de
                                productos.
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                      <CardDescription>
                        Préstamos agrupados por duración en{" "}
                        {timeRangeLabels[
                          timeRange as keyof typeof timeRangeLabels
                        ].toLowerCase()}
                      </CardDescription>
                    </div>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                          >
                            <HelpCircle className="h-4 w-4 text-muted-foreground" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>
                            Muestra cómo se distribuyen los préstamos según su
                            plazo de pago
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </CardHeader>
                <CardContent>
                  {isClient && (
                    <Doughnut
                      data={{
                        labels: [
                          "3 meses",
                          "6 meses",
                          "12 meses",
                          "18 meses",
                          "24+ meses",
                        ],
                        datasets: [
                          {
                            data: [8, 15, 25, 12, 7],
                            backgroundColor: [
                              "rgb(99, 102, 241)",
                              "rgb(59, 130, 246)",
                              "rgb(16, 185, 129)",
                              "rgb(245, 158, 11)",
                              "rgb(239, 68, 68)",
                            ],
                          },
                        ],
                      }}
                      height={250}
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                          legend: {
                            position: "bottom",
                          },
                        },
                      }}
                    />
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="payments" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <CardTitle>Pagos Próximos</CardTitle>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <HelpCircle className="h-4 w-4 text-muted-foreground cursor-help" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>
                              Lista de pagos programados para los próximos días,
                              facilitando el seguimiento y la planificación de
                              cobros.
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <CardDescription>
                      Pagos programados para los próximos 30 días
                    </CardDescription>
                  </div>
                  <Button variant="outline" size="sm">
                    Ver todos
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-2 font-medium">ID</th>
                        <th className="text-left py-3 px-2 font-medium">
                          Préstamo
                        </th>
                        <th className="text-left py-3 px-2 font-medium">
                          Cliente
                        </th>
                        <th className="text-left py-3 px-2 font-medium">
                          Monto
                        </th>
                        <th className="text-left py-3 px-2 font-medium">
                          Fecha
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {upcomingPayments.map((payment) => (
                        <tr
                          key={payment.id}
                          className="border-b hover:bg-muted/50"
                        >
                          <td className="py-3 px-2">{payment.id}</td>
                          <td className="py-3 px-2">{payment.loanId}</td>
                          <td className="py-3 px-2">{payment.client}</td>
                          <td className="py-3 px-2">
                            {formatCurrency(payment.amount)}
                          </td>
                          <td className="py-3 px-2">
                            {formatDate(payment.dueDate)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <CardTitle>Métodos de Pago</CardTitle>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <HelpCircle className="h-4 w-4 text-muted-foreground cursor-help" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>
                                Muestra la distribución de los métodos de pago
                                utilizados por los clientes, ayudando a
                                optimizar los canales de cobro.
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                      <CardDescription>
                        Distribución de pagos por método en{" "}
                        {timeRangeLabels[
                          timeRange as keyof typeof timeRangeLabels
                        ].toLowerCase()}
                      </CardDescription>
                    </div>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                          >
                            <HelpCircle className="h-4 w-4 text-muted-foreground" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>
                            Muestra la distribución de los métodos de pago
                            utilizados por los clientes
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </CardHeader>
                <CardContent>
                  {isClient && (
                    <Doughnut
                      data={{
                        labels: [
                          "Efectivo",
                          "Transferencia",
                          "Tarjeta de crédito",
                          "Otros",
                        ],
                        datasets: [
                          {
                            data: [35, 45, 15, 5],
                            backgroundColor: [
                              "rgb(34, 197, 94)",
                              "rgb(99, 102, 241)",
                              "rgb(239, 68, 68)",
                              "rgb(245, 158, 11)",
                            ],
                          },
                        ],
                      }}
                      height={250}
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                          legend: {
                            position: "bottom",
                          },
                        },
                      }}
                    />
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <CardTitle>Pagos por Día de la Semana</CardTitle>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <HelpCircle className="h-4 w-4 text-muted-foreground cursor-help" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>
                                Analiza en qué días de la semana se reciben más
                                pagos, permitiendo optimizar la gestión de
                                personal y recursos.
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                      <CardDescription>
                        Distribución de pagos recibidos por día en{" "}
                        {timeRangeLabels[
                          timeRange as keyof typeof timeRangeLabels
                        ].toLowerCase()}
                      </CardDescription>
                    </div>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                          >
                            <HelpCircle className="h-4 w-4 text-muted-foreground" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>
                            Muestra en qué días de la semana se reciben más
                            pagos
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </CardHeader>
                <CardContent>
                  {isClient && (
                    <Bar
                      data={{
                        labels: [
                          "Lunes",
                          "Martes",
                          "Miércoles",
                          "Jueves",
                          "Viernes",
                          "Sábado",
                          "Domingo",
                        ],
                        datasets: [
                          {
                            label: "Número de pagos",
                            data: [18, 22, 25, 20, 30, 12, 5],
                            backgroundColor: "rgb(99, 102, 241)",
                          },
                        ],
                      }}
                      height={250}
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                      }}
                    />
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Revenue and Activity */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="md:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <CardTitle>Ingresos Mensuales</CardTitle>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <HelpCircle className="h-4 w-4 text-muted-foreground cursor-help" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>
                            Muestra la evolución de los ingresos generados por
                            intereses y comisiones, permitiendo evaluar la
                            rentabilidad del negocio.
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <CardDescription>
                    Ingresos por intereses y comisiones en{" "}
                    {timeRangeLabels[
                      timeRange as keyof typeof timeRangeLabels
                    ].toLowerCase()}
                  </CardDescription>
                </div>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <HelpCircle className="h-4 w-4 text-muted-foreground" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>
                        Muestra los ingresos mensuales generados por intereses y
                        comisiones de préstamos
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </CardHeader>
            <CardContent>
              {isClient && (
                <Line
                  data={{
                    labels: monthlyLabels,
                    datasets: [
                      {
                        label: "Ingresos",
                        data: [
                          1200, 1500, 1800, 2000, 2200, 2500, 2700, 2900, 3000,
                          3100, 3200, 3250,
                        ],
                        borderColor: "rgb(34, 197, 94)",
                        backgroundColor: "rgba(34, 197, 94, 0.1)",
                        fill: true,
                        tension: 0.4,
                      },
                    ],
                  }}
                  height={250}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                      y: {
                        beginAtZero: true,
                        ticks: {
                          callback: (value) =>
                            `$${Number(value).toLocaleString()}`,
                        },
                      },
                    },
                  }}
                />
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <CardTitle>Actividad Reciente</CardTitle>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <HelpCircle className="h-4 w-4 text-muted-foreground cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>
                        Muestra las últimas transacciones y eventos importantes
                        en el sistema, proporcionando una visión rápida de la
                        actividad reciente.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <CardDescription>
                Últimas transacciones en el sistema
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="rounded-full p-2 bg-green-100">
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">
                      María González pagó $291.67
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Hace 2 horas
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="rounded-full p-2 bg-blue-100">
                    <CreditCard className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">
                      Juan Pérez solicitó $5,000
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Hace 5 horas
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="rounded-full p-2 bg-amber-100">
                    <Clock className="h-4 w-4 text-amber-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">
                      Roberto Sánchez - pago pendiente
                    </p>
                    <p className="text-xs text-muted-foreground">Hace 1 día</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="rounded-full p-2 bg-green-100">
                    <TrendingUp className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">
                      Ana Martínez completó su préstamo
                    </p>
                    <p className="text-xs text-muted-foreground">Hace 2 días</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
