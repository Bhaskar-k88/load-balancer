import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

function RequestChart({ stats }) {
  const data = {
    labels: Object.keys(stats),
datasets: [
  {
    label: "Requests",
    data: Object.values(stats),
    backgroundColor: "#16a34a",
    borderColor: "#22c55e",
    borderWidth: 1,
    borderRadius: 5
  }
]
  };

  const options = {
  responsive: true,
  plugins: {
    legend: {
      labels: {
        color: "white"
      }
    }
  },
  scales: {
    x: {
      ticks: { color: "white" },
      grid: { color: "#334155" }
    },
    y: {
      ticks: { color: "white" },
      grid: { color: "#334155" }
    }
  }
}

  return <Bar data={data} options={options} />;
}

export default RequestChart;