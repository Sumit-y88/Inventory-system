import { memo, useMemo } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

function InventoryChart({ items }) {
  const { data, hasData } = useMemo(() => {
    const categoryMap = {};

    items.forEach((item) => {
      const categoryName = item.category?.trim() || "Uncategorized";
      categoryMap[categoryName] = (categoryMap[categoryName] || 0) + Number(item.quantity);
    });

    const labels = Object.keys(categoryMap);
    const values = Object.values(categoryMap);

    return {
      hasData: labels.length > 0,
      data: {
        labels,
        datasets: [
          {
            label: "Units in stock",
            data: values,
            backgroundColor: [
              "rgba(139, 92, 246, 0.72)",
              "rgba(20, 184, 166, 0.72)",
              "rgba(14, 165, 233, 0.72)",
              "rgba(250, 204, 21, 0.72)",
              "rgba(244, 63, 94, 0.72)",
            ],
            borderRadius: 10,
            borderSkipped: false,
          },
        ],
      },
    };
  }, [items]);

  const options = useMemo(
    () => ({
      maintainAspectRatio: false,
      responsive: true,
      animation: {
        duration: 220,
      },
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: "#0f0f14",
          borderColor: "rgba(255,255,255,0.1)",
          borderWidth: 1,
          titleColor: "#fafafa",
          bodyColor: "#d4d4d8",
          padding: 12,
          cornerRadius: 12,
          callbacks: {
            label: (ctx) => ` ${ctx.parsed.y} units`,
          },
        },
      },
      scales: {
        x: {
          grid: { display: false },
          border: { display: false },
          ticks: {
            color: "#a1a1aa",
            font: { family: "Manrope, sans-serif", size: 12, weight: "600" },
          },
        },
        y: {
          grid: { color: "rgba(255,255,255,0.08)" },
          border: { display: false },
          ticks: {
            precision: 0,
            color: "#71717a",
            font: { family: "IBM Plex Mono, monospace", size: 11 },
          },
        },
      },
    }),
    []
  );

  if (!hasData) {
    return (
      <div className="table-empty">
        <p>No chart data yet. Add a few products to unlock category insights.</p>
      </div>
    );
  }

  return (
    <div style={{ height: "280px" }}>
      <Bar data={data} options={options} />
    </div>
  );
}

export default memo(InventoryChart);
