import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function InventoryChart({ items }) {

  const categoryMap = {};

  items.forEach((item) => {
    categoryMap[item.category] =
      (categoryMap[item.category] || 0) + Number(item.quantity);
  });

  const data = {
    labels: Object.keys(categoryMap),
    datasets: [
      {
        label: "Stock by Category",
        data: Object.values(categoryMap),
        backgroundColor: "rgba(79,70,229,0.6)"
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" }
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow mt-8">
      <h2 className="text-xl font-semibold mb-4">
        Inventory Analytics
      </h2>

      <Bar data={data} options={options} />
    </div>
  );
}

export default InventoryChart;