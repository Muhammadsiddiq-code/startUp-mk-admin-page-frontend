// import { useEffect, useState } from "react";
// import axios from "axios";
// import { Line, Bar } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
//   Filler,
// } from "chart.js";

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
//   Filler
// );

// const Stats = () => {
//   const [dailyData, setDailyData] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const fetchData = async () => {
//     setLoading(true);
//     try {
//       const [usersRes, newsRes] = await Promise.all([
//         axios.get("http://localhost:5000/api/users"),
//         axios.get("http://localhost:5000/api/news"),
//       ]);

//       const users = usersRes.data;
//       const news = newsRes.data;

//       // Kun bo'yicha guruhlash (oxirgi 30 kun)
//       const dailyStats = {};
//       const today = new Date();
//       const last30Days = new Date(today);
//       last30Days.setDate(today.getDate() - 30);

//       // Barcha kunlarni yaratamiz (bo'sh kunlar uchun 0)
//       for (
//         let d = new Date(last30Days);
//         d <= today;
//         d.setDate(d.getDate() + 1)
//       ) {
//         const dateKey = d.toISOString().split("T")[0]; // YYYY-MM-DD
//         dailyStats[dateKey] = { users: 0, news: 0, total: 0 };
//       }

//       // Foydalanuvchilar
//       users.forEach((user) => {
//         const date = new Date(user.createdAt || Date.now());
//         const dateKey = date.toISOString().split("T")[0];
//         if (dailyStats[dateKey]) {
//           dailyStats[dateKey].users++;
//           dailyStats[dateKey].total++;
//         }
//       });

//       // Yangiliklar
//       news.forEach((item) => {
//         const date = new Date(item.createdAt);
//         const dateKey = date.toISOString().split("T")[0];
//         if (dailyStats[dateKey]) {
//           dailyStats[dateKey].news++;
//           dailyStats[dateKey].total++;
//         }
//       });

//       // Massivga aylantirish va saralash
//       const sortedData = Object.keys(dailyStats)
//         .sort()
//         .map((key) => {
//           const date = new Date(key);
//           return {
//             date: key,
//             dayName: date.toLocaleDateString("uz-UZ", { weekday: "short" }),
//             fullDate: date.toLocaleDateString("uz-UZ", {
//               day: "numeric",
//               month: "long",
//             }),
//             users: dailyStats[key].users,
//             news: dailyStats[key].news,
//             total: dailyStats[key].total,
//           };
//         });

//       setDailyData(sortedData);
//     } catch (err) {
//       console.error(err);
//       alert("Statistikalar yuklanmadi");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   // Chart ma'lumotlari
//   const labels = dailyData.map((item) => `${item.dayName}\n${item.fullDate}`);

//   const lineChartData = {
//     labels,
//     datasets: [
//       {
//         label: "Yangi Foydalanuvchilar",
//         data: dailyData.map((item) => item.users),
//         borderColor: "#6366f1",
//         backgroundColor: "rgba(99, 102, 241, 0.1)",
//         tension: 0.4,
//         fill: true,
//         pointBackgroundColor: "#6366f1",
//         pointRadius: 5,
//       },
//       {
//         label: "Yangi Yangiliklar",
//         data: dailyData.map((item) => item.news),
//         borderColor: "#8b5cf6",
//         backgroundColor: "rgba(139, 92, 246, 0.1)",
//         tension: 0.4,
//         fill: true,
//         pointBackgroundColor: "#8b5cf6",
//         pointRadius: 5,
//       },
//     ],
//   };

//   const barChartData = {
//     labels,
//     datasets: [
//       {
//         label: "Kunlik Jami Faollik",
//         data: dailyData.map((item) => item.total),
//         backgroundColor: "#10b981",
//         borderRadius: 8,
//         borderSkipped: false,
//       },
//     ],
//   };

//   const options = {
//     responsive: true,
//     plugins: {
//       legend: { position: "top" },
//       tooltip: {
//         callbacks: {
//           title: (tooltipItems) => {
//             return dailyData[tooltipItems[0].dataIndex]?.fullDate || "";
//           },
//         },
//       },
//     },
//     scales: {
//       y: { beginAtZero: true, ticks: { stepSize: 1 } },
//       x: {
//         ticks: {
//           maxRotation: 0,
//           minRotation: 0,
//           callback: function (value) {
//             const label = this.getLabelForValue(value);
//             return label.split("\n")[0]; // faqat kun nomi
//           },
//         },
//       },
//     },
//   };

//   // Bugungi va kecha kunlik solishtirish
//   const todayData = dailyData[dailyData.length - 1];
//   const yesterdayData = dailyData[dailyData.length - 2];

//   const calculateGrowth = (today, yesterday) => {
//     if (!yesterday || yesterday === 0) return today > 0 ? "+100%" : "0%";
//     const growth = ((today - yesterday) / yesterday) * 100;
//     return growth > 0 ? `+${growth.toFixed(1)}%` : `${growth.toFixed(1)}%`;
//   };

//   return (
//     <div className="space-y-12">
//       <h1 className="text-5xl font-bold text-center text-gray-800 dark:text-white">
//         Kunlik Statistika va Analitika
//       </h1>

//       <p className="text-center text-2xl text-gray-600 dark:text-gray-400">
//         Oxirgi 30 kun ichidagi faollik
//       </p>

//       {/* Bugun va kecha solishtirish */}
//       {todayData && yesterdayData && (
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//           <div className="card text-center hover:scale-105 transition-transform">
//             <p className="text-xl text-gray-600 dark:text-gray-400 mb-4">
//               Yangi foydalanuvchilar
//             </p>
//             <p className="text-5xl font-bold text-indigo-600 mb-4">
//               {todayData.users}
//             </p>
//             <p
//               className={`text-2xl font-bold ${
//                 parseFloat(
//                   calculateGrowth(todayData.users, yesterdayData.users)
//                 ) > 0
//                   ? "text-green-600"
//                   : "text-red-600"
//               }`}
//             >
//               {calculateGrowth(todayData.users, yesterdayData.users)} (kechaga
//               nisbatan)
//             </p>
//           </div>

//           <div className="card text-center hover:scale-105 transition-transform">
//             <p className="text-xl text-gray-600 dark:text-gray-400 mb-4">
//               Yangi yangiliklar
//             </p>
//             <p className="text-5xl font-bold text-purple-600 mb-4">
//               {todayData.news}
//             </p>
//             <p
//               className={`text-2xl font-bold ${
//                 parseFloat(
//                   calculateGrowth(todayData.news, yesterdayData.news)
//                 ) > 0
//                   ? "text-green-600"
//                   : "text-red-600"
//               }`}
//             >
//               {calculateGrowth(todayData.news, yesterdayData.news)} (kechaga
//               nisbatan)
//             </p>
//           </div>

//           <div className="card text-center hover:scale-105 transition-transform">
//             <p className="text-xl text-gray-600 dark:text-gray-400 mb-4">
//               Jami faollik
//             </p>
//             <p className="text-5xl font-bold text-green-600 mb-4">
//               {todayData.total}
//             </p>
//             <p
//               className={`text-2xl font-bold ${
//                 parseFloat(
//                   calculateGrowth(todayData.total, yesterdayData.total)
//                 ) > 0
//                   ? "text-green-600"
//                   : "text-red-600"
//               }`}
//             >
//               {calculateGrowth(todayData.total, yesterdayData.total)} (kechaga
//               nisbatan)
//             </p>
//           </div>
//         </div>
//       )}

//       {/* Line Chart – Kunlik trend */}
//       <div className="card">
//         <h3 className="text-3xl font-bold text-center mb-8">
//           Kunlik Trend (Oxirgi 30 kun)
//         </h3>
//         <Line data={lineChartData} options={options} />
//       </div>

//       {/* Bar Chart – Kunlik jami */}
//       <div className="card">
//         <h3 className="text-3xl font-bold text-center mb-8">
//           Kunlik Jami Faollik
//         </h3>
//         <Bar data={barChartData} options={options} />
//       </div>

//       {/* Jadval – Kunlik batafsil */}
//       <div className="card overflow-x-auto">
//         <h3 className="text-3xl font-bold text-center mb-8">
//           Kun bo'yicha batafsil statistika
//         </h3>
//         <table className="w-full">
//           <thead className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
//             <tr>
//               <th className="p-6 text-left">Sana</th>
//               <th className="p-6 text-center">Yangi Foydalanuvchilar</th>
//               <th className="p-6 text-center">Yangi Yangiliklar</th>
//               <th className="p-6 text-center">Jami</th>
//             </tr>
//           </thead>
//           <tbody>
//             {dailyData.map((item, index) => (
//               <tr
//                 key={index}
//                 className="border-b hover:bg-gray-50 dark:hover:bg-gray-700 transition"
//               >
//                 <td className="p-6 font-semibold">
//                   {item.fullDate} ({item.dayName})
//                 </td>
//                 <td className="p-6 text-center text-2xl font-bold text-indigo-600">
//                   {item.users}
//                 </td>
//                 <td className="p-6 text-center text-2xl font-bold text-purple-600">
//                   {item.news}
//                 </td>
//                 <td className="p-6 text-center text-3xl font-bold text-green-600">
//                   {item.total}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default Stats;
























import { useEffect, useState } from "react";
import axios from "axios";
import { Line, Bar } from "react-chartjs-2";
import {
  FiUsers,
  FiFileText,
  FiActivity,
  FiTrendingUp,
  FiTrendingDown,
} from "react-icons/fi";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const Stats = () => {
  const [dailyData, setDailyData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [usersRes, newsRes] = await Promise.all([
        axios.get("http://localhost:5000/api/users"),
        axios.get("http://localhost:5000/api/news"),
      ]);

      const users = usersRes.data;
      const news = newsRes.data;

      const dailyStats = {};
      const today = new Date();
      const last30Days = new Date(today);
      last30Days.setDate(today.getDate() - 30);

      for (
        let d = new Date(last30Days);
        d <= today;
        d.setDate(d.getDate() + 1)
      ) {
        const dateKey = d.toISOString().split("T")[0];
        dailyStats[dateKey] = { users: 0, news: 0, total: 0 };
      }

      users.forEach((user) => {
        const dateKey = new Date(user.createdAt || Date.now())
          .toISOString()
          .split("T")[0];
        if (dailyStats[dateKey]) {
          dailyStats[dateKey].users++;
          dailyStats[dateKey].total++;
        }
      });

      news.forEach((item) => {
        const dateKey = new Date(item.createdAt).toISOString().split("T")[0];
        if (dailyStats[dateKey]) {
          dailyStats[dateKey].news++;
          dailyStats[dateKey].total++;
        }
      });

      const sortedData = Object.keys(dailyStats)
        .sort()
        .map((key) => {
          const date = new Date(key);
          return {
            date: key,
            dayName: date.toLocaleDateString("uz-UZ", { weekday: "short" }),
            fullDate: date.toLocaleDateString("uz-UZ", {
              day: "numeric",
              month: "short",
            }),
            users: dailyStats[key].users,
            news: dailyStats[key].news,
            total: dailyStats[key].total,
          };
        });

      setDailyData(sortedData);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Grafik sozlamalari (Grafik ranglarini premium ko'rinishga keltiramiz)
  const labels = dailyData.map((item) => item.fullDate);

  const lineChartData = {
    labels,
    datasets: [
      {
        label: "Foydalanuvchilar",
        data: dailyData.map((item) => item.users),
        borderColor: "#6366f1",
        backgroundColor: (context) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 400);
          gradient.addColorStop(0, "rgba(99, 102, 241, 0.4)");
          gradient.addColorStop(1, "rgba(99, 102, 241, 0)");
          return gradient;
        },
        tension: 0.4,
        fill: true,
        pointRadius: 4,
        pointHoverRadius: 8,
      },
      {
        label: "Yangiliklar",
        data: dailyData.map((item) => item.news),
        borderColor: "#d946ef",
        backgroundColor: "rgba(217, 70, 239, 0.1)",
        tension: 0.4,
        fill: true,
        pointRadius: 4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "#1e1b4b",
        padding: 12,
        titleFont: { size: 14, weight: "bold" },
        bodyFont: { size: 13 },
        displayColors: true,
      },
    },
    scales: {
      y: { grid: { display: false }, ticks: { color: "#94a3b8" } },
      x: { grid: { display: false }, ticks: { color: "#94a3b8" } },
    },
  };

  const todayData = dailyData[dailyData.length - 1] || {
    users: 0,
    news: 0,
    total: 0,
  };
  const yesterdayData = dailyData[dailyData.length - 2] || {
    users: 0,
    news: 0,
    total: 0,
  };

  const calculateGrowth = (today, yesterday) => {
    if (!yesterday || yesterday === 0)
      return { val: today > 0 ? 100 : 0, pos: true };
    const growth = ((today - yesterday) / yesterday) * 100;
    return { val: Math.abs(growth).toFixed(0), pos: growth >= 0 };
  };

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );

  return (
    <div className="max-w-[1600px] mx-auto space-y-10 pb-20 animate-fade-in">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-end gap-4">
        <div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-gray-900 dark:text-white">
            {" "}
            Analitika{" "}
          </h1>
          <p className="text-gray-500 text-lg mt-2">
            Oxirgi 30 kunlik faollik ko'rsatkichlari
          </p>
        </div>
        <div className="px-4 py-2 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 rounded-2xl font-bold">
          Oxirgi yangilanish: Bugun, {new Date().toLocaleTimeString()}
        </div>
      </div>

      {/* STAT CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          {
            label: "Yangi Foydalanuvchilar",
            val: todayData.users,
            yest: yesterdayData.users,
            icon: <FiUsers />,
            color: "indigo",
          },
          {
            label: "Yangi Yangiliklar",
            val: todayData.news,
            yest: yesterdayData.news,
            icon: <FiFileText />,
            color: "fuchsia",
          },
          {
            label: "Jami Faollik",
            val: todayData.total,
            yest: yesterdayData.total,
            icon: <FiActivity />,
            color: "emerald",
          },
        ].map((stat, i) => {
          const growth = calculateGrowth(stat.val, stat.yest);
          return (
            <div
              key={i}
              className="card group hover:border-indigo-500/50 transition-all duration-500"
            >
              <div className="flex justify-between items-start mb-6">
                <div
                  className={`p-4 bg-${stat.color}-500/10 text-${stat.color}-600 rounded-2xl text-2xl group-hover:scale-110 transition-transform`}
                >
                  {stat.icon}
                </div>
                <div
                  className={`flex items-center gap-1 text-sm font-black ${
                    growth.pos ? "text-emerald-500" : "text-rose-500"
                  }`}
                >
                  {growth.pos ? <FiTrendingUp /> : <FiTrendingDown />}
                  {growth.val}%
                </div>
              </div>
              <p className="text-gray-500 font-bold uppercase tracking-wider text-xs mb-1">
                {stat.label}
              </p>
              <h2 className="text-5xl font-black text-gray-900 dark:text-white">
                {stat.val}
              </h2>
              <p className="text-gray-400 text-sm mt-4 font-medium italic">
                Kechagi ko'rsatkich: {stat.yest}
              </p>
            </div>
          );
        })}
      </div>

      {/* CHARTS SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="card h-[450px] flex flex-col">
          <h3 className="text-xl font-black mb-6 flex items-center gap-2">
            {" "}
            <FiTrendingUp className="text-indigo-600" /> O'sish Trendi
          </h3>
          <div className="flex-1">
            <Line data={lineChartData} options={chartOptions} />
          </div>
        </div>
        <div className="card h-[450px] flex flex-col">
          <h3 className="text-xl font-black mb-6 flex items-center gap-2">
            {" "}
            <FiActivity className="text-emerald-600" /> Kunlik Faollik
          </h3>
          <div className="flex-1">
            <Bar
              data={{
                labels,
                datasets: [
                  {
                    label: "Jami",
                    data: dailyData.map((d) => d.total),
                    backgroundColor: "#10b981",
                    borderRadius: 10,
                    hoverBackgroundColor: "#059669",
                  },
                ],
              }}
              options={chartOptions}
            />
          </div>
        </div>
      </div>

      {/* DETAILED TABLE */}
      <div className="card !p-0 overflow-hidden border-none shadow-2xl">
        <div className="p-8 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center bg-white/50 dark:bg-gray-900/50">
          <h3 className="text-2xl font-black">Batafsil Hisobot</h3>
          <button
            onClick={fetchData}
            className="text-indigo-600 font-bold hover:underline"
          >
            Ma'lumotlarni yangilash
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-800/50 text-gray-400 text-xs uppercase tracking-widest">
                <th className="p-6 font-black">Sana</th>
                <th className="p-6 font-black text-center">Foydalanuvchilar</th>
                <th className="p-6 font-black text-center">Yangiliklar</th>
                <th className="p-6 font-black text-center">Jami Faollik</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {dailyData
                .slice()
                .reverse()
                .map((item, index) => (
                  <tr
                    key={index}
                    className="hover:bg-indigo-50/30 dark:hover:bg-indigo-900/10 transition-colors group"
                  >
                    <td className="p-6 font-bold text-gray-700 dark:text-gray-300">
                      <span className="text-gray-400 mr-2">{item.dayName}</span>{" "}
                      {item.fullDate}
                    </td>
                    <td className="p-6 text-center">
                      <span className="px-4 py-1 bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 rounded-lg font-black">
                        {item.users}
                      </span>
                    </td>
                    <td className="p-6 text-center">
                      <span className="px-4 py-1 bg-fuchsia-100 dark:bg-fuchsia-900/40 text-fuchsia-600 rounded-lg font-black">
                        {item.news}
                      </span>
                    </td>
                    <td className="p-6 text-center font-black text-2xl text-gray-900 dark:text-white">
                      {item.total}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Stats;