import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import { dashboardService } from "../../api/dashboardService";

const SalesChart = ({ salesData, loading }) => {
  const [annualData, setAnnualData] = useState(null);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [chartLoading, setChartLoading] = useState(true);

  useEffect(() => {
    loadAnnualSalesData();
  }, [selectedYear]);

  const loadAnnualSalesData = async () => {
    setChartLoading(true);
    try {
      const response = await dashboardService.getAnnualSalesData(selectedYear);
      if (response.code === 200) {
        setAnnualData(response.data);
      }
    } catch (error) {
      console.error("Error loading annual sales data:", error);
    } finally {
      setChartLoading(false);
    }
  };

  // Prepare chart data
  const chartOptions = {
    chart: {
      type: "line",
      height: 350,
      toolbar: {
        show: true,
      },
      animations: {
        enabled: true,
        easing: "easeinout",
        speed: 800,
      },
    },
    colors: ["#3B82F6", "#10B981"],
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      width: 3,
    },
    xaxis: {
      categories: annualData?.monthlySales?.map((month) => month.month) || [],
      title: {
        text: "Months",
      },
    },
    yaxis: [
      {
        title: {
          text: "Revenue ($)",
          style: {
            color: "#3B82F6",
          },
        },
        labels: {
          formatter: function (value) {
            return "$" + value.toFixed(0);
          },
          style: {
            colors: "#3B82F6",
          },
        },
      },
      {
        opposite: true,
        title: {
          text: "Number of Orders",
          style: {
            color: "#10B981",
          },
        },
        labels: {
          formatter: function (value) {
            return value.toFixed(0);
          },
          style: {
            colors: "#10B981",
          },
        },
      },
    ],
    tooltip: {
      shared: true,
      intersect: false,
      y: [
        {
          formatter: function (value) {
            return "$" + value.toFixed(2);
          },
        },
        {
          formatter: function (value) {
            return value + " orders";
          },
        },
      ],
    },
    legend: {
      position: "top",
      horizontalAlign: "left", // Change from "right" to "left"
      offsetX: 0,
      offsetY: 0,
    },
    grid: {
      borderColor: "#f1f5f9",
      strokeDashArray: 3,
    },
    responsive: [
      {
        breakpoint: 768,
        options: {
          chart: {
            height: 300,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };

  const chartSeries = [
    {
      name: "Revenue",
      type: "line",
      data:
        annualData?.monthlySales?.map((month) => month.revenue.toFixed(2)) ||
        [],
    },
    {
      name: "Orders",
      type: "line",
      yAxisIndex: 1,
      data: annualData?.monthlySales?.map((month) => month.orderCount) || [],
    },
  ];

  const generateYearOptions = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let year = currentYear; year >= currentYear - 5; year--) {
      years.push(year);
    }
    return years;
  };

  return (
    <div className="p-6 bg-white border rounded-lg shadow">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Sales Overview</h3>
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(parseInt(e.target.value))}
          className="px-3 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={chartLoading}
        >
          {generateYearOptions().map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      {loading || chartLoading ? (
        <div className="flex items-center justify-center bg-gray-100 rounded-lg h-96 animate-pulse">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-300 rounded-full"></div>
            <div className="w-32 h-4 mx-auto mb-2 bg-gray-300 rounded"></div>
            <div className="w-24 h-3 mx-auto bg-gray-300 rounded"></div>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Summary Cards */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="p-4 text-center rounded-lg bg-blue-50">
              <div className="text-2xl font-bold text-blue-600">
                ${annualData?.totalAnnualRevenue?.toFixed(2) || "0.00"}
              </div>
              <div className="text-sm text-gray-500">
                Total Revenue ({selectedYear})
              </div>
            </div>
            <div className="p-4 text-center rounded-lg bg-green-50">
              <div className="text-2xl font-bold text-green-600">
                {annualData?.totalAnnualOrders || 0}
              </div>
              <div className="text-sm text-gray-500">
                Total Orders ({selectedYear})
              </div>
            </div>
          </div>

          {/* Chart */}
          {annualData?.monthlySales?.length > 0 ? (
            <div className="w-full">
              <ReactApexChart
                options={chartOptions}
                series={chartSeries}
                type="line"
                height={350}
              />
            </div>
          ) : (
            <div className="flex items-center justify-center h-64 bg-gray-100 rounded-lg">
              <div className="text-center">
                <div className="mb-2 text-4xl text-gray-400">📊</div>
                <p className="text-gray-500">
                  No sales data available for {selectedYear}
                </p>
                <p className="text-sm text-gray-400">
                  Try selecting a different year
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SalesChart;
