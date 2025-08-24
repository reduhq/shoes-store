"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BarChart3 } from "lucide-react";
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
import { Line } from "react-chartjs-2";

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

const OverviewTab = () => {
  // Payment history data
  const paymentHistoryData = {
    labels: [
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
    ],
    datasets: [
      {
        label: "Pagos Realizados",
        data: [333, 333, 333, 333, 333, 333, 417, 417, 417, 417, 417, 0],
        borderColor: "hsl(var(--primary))",
        backgroundColor: "hsl(var(--primary) / 0.1)",
        // fill: true,
        tension: 0.4,
      },
    ],
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2 gap-4 sm:gap-5 md:gap-6 lg:gap-8">
      {/* Payment History Chart */}
      <Card className="shadow-md border-0 bg-white col-span-1 lg:col-span-2">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-base sm:text-lg md:text-xl lg:text-xl xl:text-2xl">
            <BarChart3 className="h-5 w-5 sm:h-5 sm:w-5 md:h-6 md:w-6 text-primary" />
            Historial de Pagos
          </CardTitle>
          <CardDescription className="text-sm md:text-base">
            Pagos realizados en los últimos 12 meses
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[200px] sm:h-[250px] md:h-[300px] lg:h-[350px] xl:h-[400px] 2xl:h-[450px]">
            <Line
              data={paymentHistoryData}
              // height={250}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  y: {
                    beginAtZero: true,
                    ticks: {
                      callback: (value) => `$${Number(value).toLocaleString()}`,
                    },
                  },
                },
                plugins: {
                  legend: {
                    display: false,
                  },
                },
              }}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OverviewTab;
