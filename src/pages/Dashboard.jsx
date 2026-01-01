// import { useEffect, useState } from "react";
// import axios from "axios";
// import { Bar } from "react-chartjs-2";
// import {
//   FiUsers,
//   FiFileText,
//   FiTrendingUp,
//   FiZap,
//   FiCalendar,
// } from "react-icons/fi";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend
// );

// const Dashboard = () => {
//     const [stats, setStats] = useState({
//       userCount: 0,
//       newsCount: 0,
//       todayUsers: 0,
//       todayNews: 0,
//       monthlyGrowth: 0,
//     });
//     const [recentNews, setRecentNews] = useState([]);
//     const [recentUsers, setRecentUsers] = useState([]);
//     const [loading, setLoading] = useState(true);

//     const fetchData = async () => {
//       setLoading(true);
//       try {
//         const [statsRes, newsRes, usersRes] = await Promise.all([
//           axios.get('http://localhost:5000/api/stats'),
//           axios.get('http://localhost:5000/api/news'),
//           axios.get('http://localhost:5000/api/users'),
//         ]);

//         const totalUsers = statsRes.data.userCount;
//         const totalNews = statsRes.data.newsCount;

//         // Bugungi sana
//         const today = new Date();
//         const todayStr = today.toISOString().split('T')[0];

//         // Bugungi foydalanuvchilar va yangiliklar
//         const todayUsersCount = usersRes.data.filter(u => {
//           const date = new Date(u.createdAt || Date.now());
//           return date.toISOString().split('T')[0] === todayStr;
//         }).length;

//         const todayNewsCount = newsRes.data.filter(n => {
//           const date = new Date(n.createdAt);
//           return date.toISOString().split('T')[0] === todayStr;
//         }).length;

//         // O'tgan oy bilan solishtirish (oddiy hisob)
//         const thisMonth = today.getMonth();
//         const thisYear = today.getFullYear();

//         const lastMonthUsers = usersRes.data.filter(u => {
//           const date = new Date(u.createdAt || Date.now());
//           return date.getMonth() === (thisMonth === 0 ? 11 : thisMonth - 1) &&
//                  date.getFullYear() === (thisMonth === 0 ? thisYear - 1 : thisYear);
//         }).length;

//         const monthlyGrowth = lastMonthUsers > 0
//           ? (((totalUsers - lastMonthUsers) / lastMonthUsers) * 100).toFixed(1)
//           : totalUsers > 0 ? '100' : '0';

//         setStats({
//           userCount: totalUsers,
//           newsCount: totalNews,
//           todayUsers: todayUsersCount,
//           todayNews: todayNewsCount,
//           monthlyGrowth: parseFloat(monthlyGrowth),
//         });

//         // So'nggi 5 ta yangilik
//         setRecentNews(newsRes.data.slice(0, 5));

//         // So'nggi 5 ta foydalanuvchi
//         setRecentUsers(usersRes.data.slice(0, 5));

//       } catch (err) {
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     useEffect(() => {
//       fetchData();
//     }, []);

//     // Mini chart uchun oxirgi 7 kun (oddiy misol)
//     const miniChartData = {
//       labels: ['Dush', 'Sesh', 'Chor', 'Pay', 'Jum', 'Shan', 'Yak'],
//       datasets: [{
//         label: 'Faollik',
//         data: [12, 19, 15, 25, 22, 30, 28],
//         backgroundColor: '#6366f1',
//         borderRadius: 6,
//       }]
//     };

//     const miniOptions = {
//       responsive: true,
//       plugins: { legend: { display: false }, title: { display: false } },
//       scales: { x: { display: false }, y: { display: false } },
//     };

//     const formatDate = (dateString) => {
//       return new Date(dateString).toLocaleDateString('uz-UZ', {
//         day: 'numeric',
//         month: 'long',
//         hour: '2-digit',
//         minute: '2-digit'
//       });
//     };

//   return (
//     <div className="min-h-screen p-4 md:p-8 space-y-12 animate-fade-in">
//       {/* --- WELCOME SECTION --- */}
//       <div className="relative overflow-hidden bg-gradient-to-r from-indigo-600 to-purple-700 rounded-[3rem] p-10 md:p-16 text-white shadow-2xl shadow-indigo-500/20">
//         <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
//           <div>
//             <h1 className="text-4xl md:text-6xl font-black mb-4 leading-tight">
//               Xush kelibsiz, <br />{" "}
//               <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-400">
//                 Admin Panelga!
//               </span>
//             </h1>
//             <div className="flex items-center gap-3 justify-center md:justify-start text-xl opacity-90">
//               <FiCalendar />
//               <p>
//                 {new Date().toLocaleDateString("uz-UZ", {
//                   weekday: "long",
//                   year: "numeric",
//                   month: "long",
//                   day: "numeric",
//                 })}
//               </p>
//             </div>
//           </div>
//           <div className="hidden lg:block animate-pulse">
//             <FiZap size={120} className="text-yellow-400 opacity-50" />
//           </div>
//         </div>
//         {/* Dekorativ doiralar */}
//         <div className="absolute top-[-50px] right-[-50px] w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
//         <div className="absolute bottom-[-50px] left-[-50px] w-64 h-64 bg-purple-500/20 rounded-full blur-3xl"></div>
//       </div>

//       {/* --- STATS CARDS --- */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
//         {/* Card 1 */}
//         <div className="card group hover:bg-indigo-600 transition-all duration-500">
//           <div className="flex justify-between items-start">
//             <div>
//               <p className="text-gray-500 dark:text-gray-400 group-hover:text-indigo-100 text-lg">
//                 Jami Foydalanuvchilar
//               </p>
//               <h2 className="text-5xl font-black mt-2 group-hover:text-white transition-colors">
//                 {stats.userCount}
//               </h2>
//               <div className="mt-4 flex items-center gap-2 text-emerald-500 group-hover:text-emerald-300">
//                 <FiTrendingUp />
//                 <span className="font-bold">+{stats.todayUsers} bugun</span>
//               </div>
//             </div>
//             <div className="bg-indigo-100 dark:bg-indigo-900/40 p-5 rounded-2xl group-hover:bg-white/20 transition-colors">
//               <FiUsers
//                 size={32}
//                 className="text-indigo-600 group-hover:text-white"
//               />
//             </div>
//           </div>
//         </div>

//         {/* Card 2 */}
//         <div className="card group hover:bg-purple-600 transition-all duration-500">
//           <div className="flex justify-between items-start">
//             <div>
//               <p className="text-gray-500 dark:text-gray-400 group-hover:text-purple-100 text-lg">
//                 Yangiliklar
//               </p>
//               <h2 className="text-5xl font-black mt-2 group-hover:text-white transition-colors">
//                 {stats.newsCount}
//               </h2>
//               <div className="mt-4 flex items-center gap-2 text-emerald-500 group-hover:text-emerald-300">
//                 <FiTrendingUp />
//                 <span className="font-bold">+{stats.todayNews} bugun</span>
//               </div>
//             </div>
//             <div className="bg-purple-100 dark:bg-purple-900/40 p-5 rounded-2xl group-hover:bg-white/20 transition-colors">
//               <FiFileText
//                 size={32}
//                 className="text-purple-600 group-hover:text-white"
//               />
//             </div>
//           </div>
//         </div>

//         {/* Card 3 (Growth) */}
//         <div className="card">
//           <p className="text-gray-500 dark:text-gray-400 text-lg">
//             Oylik O'sish
//           </p>
//           <div className="flex items-end gap-4 mt-2">
//             <h2
//               className={`text-5xl font-black ${
//                 stats.monthlyGrowth >= 0 ? "text-emerald-500" : "text-rose-500"
//               }`}
//             >
//               {stats.monthlyGrowth}%
//             </h2>
//             <div
//               className={`mb-2 px-3 py-1 rounded-full text-sm font-bold ${
//                 stats.monthlyGrowth >= 0
//                   ? "bg-emerald-100 text-emerald-600"
//                   : "bg-rose-100 text-rose-600"
//               }`}
//             >
//               {stats.monthlyGrowth >= 0 ? "Yaxshi" : "Past"}
//             </div>
//           </div>
//           <div className="w-full bg-gray-200 dark:bg-gray-700 h-3 rounded-full mt-6 overflow-hidden">
//             <div
//               className="bg-emerald-500 h-full transition-all duration-1000"
//               style={{ width: `${Math.min(stats.monthlyGrowth, 100)}%` }}
//             ></div>
//           </div>
//         </div>

//         {/* Card 4 (Activity) */}
//         <div className="card">
//           <p className="text-gray-500 dark:text-gray-400 text-lg">
//             Bugungi Faollik
//           </p>
//           <h2 className="text-5xl font-black text-orange-500 mt-2">
//             {stats.todayUsers + stats.todayNews}
//           </h2>
//           <p className="text-gray-400 mt-4 italic font-medium">
//             Platforma faol holatda 🚀
//           </p>
//         </div>
//       </div>

//       {/* --- CHART SECTION --- */}
//       <div className="card relative overflow-hidden">
//         <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
//           <h3 className="text-3xl font-bold">Haftalik Faollik Analitikasi</h3>
//           <div className="flex gap-2">
//             <span className="flex items-center gap-2 text-sm font-medium px-4 py-2 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 rounded-xl">
//               <div className="w-2 h-2 bg-indigo-600 rounded-full"></div>{" "}
//               Foydalanuvchilar
//             </span>
//           </div>
//         </div>
//         <div className="h-[400px]">
//           <Bar
//             data={miniChartData}
//             options={{ ...miniOptions, maintainAspectRatio: false }}
//           />
//         </div>
//       </div>

//       {/* --- LISTS SECTION --- */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
//         {/* Recent News */}
//         <div className="card">
//           <div className="flex justify-between items-center mb-8">
//             <h3 className="text-2xl font-black">So'nggi Yangiliklar</h3>
//             <button className="text-indigo-500 font-bold hover:underline">
//               Barchasi
//             </button>
//           </div>
//           <div className="space-y-4">
//             {recentNews.map((item, idx) => (
//               <div
//                 key={idx}
//                 className="flex items-center gap-4 p-4 rounded-3xl bg-gray-50 dark:bg-gray-900/30 hover:bg-white dark:hover:bg-gray-700 transition-all border border-transparent hover:border-indigo-500/20 shadow-sm hover:shadow-md group"
//               >
//                 <div className="w-16 h-16 rounded-2xl overflow-hidden flex-shrink-0 border-2 border-indigo-100">
//                   {item.image ? (
//                     <img
//                       src={`http://localhost:5000${item.image}`}
//                       className="w-full h-full object-cover"
//                       alt=""
//                     />
//                   ) : (
//                     <div className="w-full h-full bg-indigo-500 flex items-center justify-center text-white font-bold">
//                       N
//                     </div>
//                   )}
//                 </div>
//                 <div className="flex-1 min-w-0">
//                   <h4 className="font-bold text-lg truncate group-hover:text-indigo-600 transition-colors">
//                     {item.title}
//                   </h4>
//                   <p className="text-sm text-gray-400">
//                     {formatDate(item.createdAt)}
//                   </p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Recent Users */}
//         <div className="card">
//           <div className="flex justify-between items-center mb-8">
//             <h3 className="text-2xl font-black">Yangi Foydalanuvchilar</h3>
//             <button className="text-purple-500 font-bold hover:underline">
//               Barchasi
//             </button>
//           </div>
//           <div className="space-y-4">
//             {recentUsers.map((user, idx) => (
//               <div
//                 key={idx}
//                 className="flex items-center gap-4 p-4 rounded-3xl bg-gray-50 dark:bg-gray-900/30 hover:bg-white dark:hover:bg-gray-700 transition-all border border-transparent hover:border-purple-500/20 shadow-sm hover:shadow-md group"
//               >
//                 <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-purple-500 to-indigo-500 flex items-center justify-center text-white text-xl font-bold shadow-lg flex-shrink-0 group-hover:rotate-12 transition-transform">
//                   {user.name.charAt(0)}
//                 </div>
//                 <div className="flex-1 min-w-0">
//                   <h4 className="font-bold text-lg truncate">{user.name}</h4>
//                   <p className="text-sm text-gray-400 truncate">{user.email}</p>
//                 </div>
//                 <span
//                   className={`px-4 py-1 rounded-full text-xs font-black uppercase ${
//                     user.role === "admin"
//                       ? "bg-purple-100 text-purple-600"
//                       : "bg-blue-100 text-blue-600"
//                   }`}
//                 >
//                   {user.role}
//                 </span>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;





































import { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import {
  FiUsers,
  FiFileText,
  FiTrendingUp,
  FiZap,
  FiCalendar,
} from "react-icons/fi";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [stats, setStats] = useState({
    userCount: 0,
    newsCount: 0,
    todayUsers: 0,
    todayNews: 0,
    monthlyGrowth: 0,
  });
  const [recentNews, setRecentNews] = useState([]);
  const [recentUsers, setRecentUsers] = useState([]);
  const [weeklyActivity, setWeeklyActivity] = useState([]); // haqiqiy haftalik ma'lumot
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [statsRes, newsRes, usersRes] = await Promise.all([
        axios.get("http://localhost:5000/api/stats"),
        axios.get("http://localhost:5000/api/news"),
        axios.get("http://localhost:5000/api/users"),
      ]);

      const totalUsers = statsRes.data.userCount;
      const totalNews = statsRes.data.newsCount;

      // Bugungi sana
      const today = new Date();
      const todayStr = today.toISOString().split("T")[0];

      // Bugungi foydalanuvchilar va yangiliklar
      const todayUsersCount = usersRes.data.filter((u) => {
        const date = new Date(u.createdAt || Date.now());
        return date.toISOString().split("T")[0] === todayStr;
      }).length;

      const todayNewsCount = newsRes.data.filter((n) => {
        const date = new Date(n.createdAt);
        return date.toISOString().split("T")[0] === todayStr;
      }).length;

      // O'tgan oy bilan solishtirish
      const thisMonth = today.getMonth();
      const thisYear = today.getFullYear();

      const lastMonthUsers = usersRes.data.filter((u) => {
        const date = new Date(u.createdAt || Date.now());
        return (
          date.getMonth() === (thisMonth === 0 ? 11 : thisMonth - 1) &&
          date.getFullYear() === (thisMonth === 0 ? thisYear - 1 : thisYear)
        );
      }).length;

      const monthlyGrowth =
        lastMonthUsers > 0
          ? (((totalUsers - lastMonthUsers) / lastMonthUsers) * 100).toFixed(1)
          : totalUsers > 0
          ? "100"
          : "0";

      setStats({
        userCount: totalUsers,
        newsCount: totalNews,
        todayUsers: todayUsersCount,
        todayNews: todayNewsCount,
        monthlyGrowth: parseFloat(monthlyGrowth),
      });

      // So'nggi 5 ta
      setRecentNews(newsRes.data.slice(0, 5));
      setRecentUsers(usersRes.data.slice(0, 5));

      // Haftalik faollik – oxirgi 7 kun (haqiqiy ma'lumot)
      const days = ["Dush", "Sesh", "Chor", "Pay", "Jum", "Shan", "Yak"];
      const activity = [];

      for (let i = 6; i >= 0; i--) {
        const date = new Date();
        date.setDate(today.getDate() - i);
        const dateStr = date.toISOString().split("T")[0];

        const dayUsers = usersRes.data.filter((u) => {
          const uDate = new Date(u.createdAt || Date.now());
          return uDate.toISOString().split("T")[0] === dateStr;
        }).length;

        const dayNews = newsRes.data.filter((n) => {
          const nDate = new Date(n.createdAt);
          return nDate.toISOString().split("T")[0] === dateStr;
        }).length;

        activity.push(dayUsers + dayNews);
      }

      setWeeklyActivity(activity.reverse()); // eski kundan yangi kunga
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Haqiqiy chart ma'lumotlari
  const miniChartData = {
    labels: ["Dush", "Sesh", "Chor", "Pay", "Jum", "Shan", "Yak"],
    datasets: [
      {
        label: "Faollik",
        data: weeklyActivity,
        backgroundColor: "#6366f1",
        borderRadius: 6,
      },
    ],
  };

  const miniOptions = {
    responsive: true,
    plugins: { legend: { display: false }, title: { display: false } },
    scales: { x: { display: false }, y: { display: false } },
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("uz-UZ", {
      day: "numeric",
      month: "long",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen p-4 md:p-8 space-y-12 animate-fade-in">
      {/* --- WELCOME SECTION --- */}
      <div className="relative overflow-hidden bg-gradient-to-r from-indigo-600 to-purple-700 rounded-[3rem] p-10 md:p-16 text-white shadow-2xl shadow-indigo-500/20">
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
          <div>
            <h1 className="text-4xl md:text-6xl font-black mb-4 leading-tight">
              Xush kelibsiz, <br />{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-400">
                Admin Panelga!
              </span>
            </h1>
            <div className="flex items-center gap-3 justify-center md:justify-start text-xl opacity-90">
              <FiCalendar />
              <p>
                {new Date().toLocaleDateString("uz-UZ", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>
          <div className="hidden lg:block animate-pulse">
            <FiZap size={120} className="text-yellow-400 opacity-50" />
          </div>
        </div>
        {/* Dekorativ doiralar */}
        <div className="absolute top-[-50px] right-[-50px] w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[-50px] left-[-50px] w-64 h-64 bg-purple-500/20 rounded-full blur-3xl"></div>
      </div>

      {/* --- STATS CARDS --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Card 1 */}
        <div className="card group hover:bg-indigo-600 transition-all duration-500">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 dark:text-gray-400 group-hover:text-indigo-100 text-lg">
                Jami Foydalanuvchilar
              </p>
              <h2 className="text-5xl font-black mt-2 group-hover:text-white transition-colors">
                {stats.userCount}
              </h2>
              <div className="mt-4 flex items-center gap-2 text-emerald-500 group-hover:text-emerald-300">
                <FiTrendingUp />
                <span className="font-bold">+{stats.todayUsers} bugun</span>
              </div>
            </div>
            <div className="bg-indigo-100 dark:bg-indigo-900/40 p-5 rounded-2xl group-hover:bg-white/20 transition-colors">
              <FiUsers
                size={32}
                className="text-indigo-600 group-hover:text-white"
              />
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="card group hover:bg-purple-600 transition-all duration-500">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 dark:text-gray-400 group-hover:text-purple-100 text-lg">
                Yangiliklar
              </p>
              <h2 className="text-5xl font-black mt-2 group-hover:text-white transition-colors">
                {stats.newsCount}
              </h2>
              <div className="mt-4 flex items-center gap-2 text-emerald-500 group-hover:text-emerald-300">
                <FiTrendingUp />
                <span className="font-bold">+{stats.todayNews} bugun</span>
              </div>
            </div>
            <div className="bg-purple-100 dark:bg-purple-900/40 p-5 rounded-2xl group-hover:bg-white/20 transition-colors">
              <FiFileText
                size={32}
                className="text-purple-600 group-hover:text-white"
              />
            </div>
          </div>
        </div>

        {/* Card 3 (Growth) */}
        <div className="card">
          <p className="text-gray-500 dark:text-gray-400 text-lg">
            Oylik O'sish
          </p>
          <div className="flex items-end gap-4 mt-2">
            <h2
              className={`text-5xl font-black ${
                stats.monthlyGrowth >= 0 ? "text-emerald-500" : "text-rose-500"
              }`}
            >
              {stats.monthlyGrowth}%
            </h2>
            <div
              className={`mb-2 px-3 py-1 rounded-full text-sm font-bold ${
                stats.monthlyGrowth >= 0
                  ? "bg-emerald-100 text-emerald-600"
                  : "bg-rose-100 text-rose-600"
              }`}
            >
              {stats.monthlyGrowth >= 0 ? "Yaxshi" : "Past"}
            </div>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 h-3 rounded-full mt-6 overflow-hidden">
            <div
              className="bg-emerald-500 h-full transition-all duration-1000"
              style={{
                width: `${Math.min(Math.abs(stats.monthlyGrowth), 100)}%`,
              }}
            ></div>
          </div>
        </div>

        {/* Card 4 (Activity) */}
        <div className="card">
          <p className="text-gray-500 dark:text-gray-400 text-lg">
            Bugungi Faollik
          </p>
          <h2 className="text-5xl font-black text-orange-500 mt-2">
            {stats.todayUsers + stats.todayNews}
          </h2>
          <p className="text-gray-400 mt-4 italic font-medium">
            Platforma faol holatda 🚀
          </p>
        </div>
      </div>

      {/* --- CHART SECTION --- */}
      <div className="card relative overflow-hidden">
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
          <h3 className="text-3xl font-bold">Haftalik Faollik Analitikasi</h3>
          <div className="flex gap-2">
            <span className="flex items-center gap-2 text-sm font-medium px-4 py-2 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 rounded-xl">
              <div className="w-2 h-2 bg-indigo-600 rounded-full"></div> Faollik
            </span>
          </div>
        </div>
        <div className="h-[400px]">
          <Bar
            data={miniChartData}
            options={{ ...miniOptions, maintainAspectRatio: false }}
          />
        </div>
      </div>

      {/* --- LISTS SECTION --- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Recent News */}
        <div className="card">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-2xl font-black">So'nggi Yangiliklar</h3>
            <button className="text-indigo-500 font-bold hover:underline">
              Barchasi
            </button>
          </div>
          <div className="space-y-4">
            {recentNews.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center gap-4 p-4 rounded-3xl bg-gray-50 dark:bg-gray-900/30 hover:bg-white dark:hover:bg-gray-700 transition-all border border-transparent hover:border-indigo-500/20 shadow-sm hover:shadow-md group"
              >
                <div className="w-16 h-16 rounded-2xl overflow-hidden flex-shrink-0 border-2 border-indigo-100">
                  {item.image ? (
                    <img
                      src={`http://localhost:5000${item.image}`}
                      className="w-full h-full object-cover"
                      alt=""
                    />
                  ) : (
                    <div className="w-full h-full bg-indigo-500 flex items-center justify-center text-white font-bold">
                      N
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-lg truncate group-hover:text-indigo-600 transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-sm text-gray-400">
                    {formatDate(item.createdAt)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Users */}
        <div className="card">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-2xl font-black">Yangi Foydalanuvchilar</h3>
            <button className="text-purple-500 font-bold hover:underline">
              Barchasi
            </button>
          </div>
          <div className="space-y-4">
            {recentUsers.map((user, idx) => (
              <div
                key={idx}
                className="flex items-center gap-4 p-4 rounded-3xl bg-gray-50 dark:bg-gray-900/30 hover:bg-white dark:hover:bg-gray-700 transition-all border border-transparent hover:border-purple-500/20 shadow-sm hover:shadow-md group"
              >
                <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-purple-500 to-indigo-500 flex items-center justify-center text-white text-xl font-bold shadow-lg flex-shrink-0 group-hover:rotate-12 transition-transform">
                  {user.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-lg truncate">{user.name}</h4>
                  <p className="text-sm text-gray-400 truncate">{user.email}</p>
                </div>
                <span
                  className={`px-4 py-1 rounded-full text-xs font-black uppercase ${
                    user.role === "admin"
                      ? "bg-purple-100 text-purple-600"
                      : "bg-blue-100 text-blue-600"
                  }`}
                >
                  {user.role}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;







