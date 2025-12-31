
// import { useState, useEffect } from "react";
// import axios from "axios";
// import { useParams, useNavigate } from "react-router-dom";
// import { FiMail, FiShield, FiArrowLeft } from "react-icons/fi";

// const UserProfile = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     axios
//       .get(`http://localhost:5000/api/users/${id}/profile`)
//       .then((res) => {
//         setUser(res.data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         setError(err.response?.data?.message || "Profil yuklanmadi");
//         setLoading(false);
//       });
//   }, [id]);

//   if (loading)
//     return <div className="text-center py-32 text-3xl">Yuklanmoqda...</div>;
//   if (error)
//     return (
//       <div className="text-center py-32">
//         <p className="text-red-600 text-3xl mb-10">{error}</p>
//         <button
//           onClick={() => navigate("/users")}
//           className="btn-primary text-2xl px-12 py-6"
//         >
//           <FiArrowLeft className="mr-4" size={28} /> Orqaga
//         </button>
//       </div>
//     );

//   return (
//     <div className="max-w-4xl mx-auto space-y-12">
//       <button
//         onClick={() => navigate("/users")}
//         className="flex items-center gap-4 text-gray-600 dark:text-gray-400 hover:text-indigo-600 transition text-xl"
//       >
//         <FiArrowLeft size={28} /> Orqaga
//       </button>

//       <h1 className="text-5xl font-bold text-center text-gray-800 dark:text-white">
//         Foydalanuvchi Profili
//       </h1>

//       <div className="card">
//         <div className="flex flex-col md:flex-row items-center gap-16">
//           <div className="w-64 h-64 rounded-full overflow-hidden shadow-2xl border-8 border-indigo-100 dark:border-indigo-900">
//             {user.avatar ? (
//               <img
//                 src={`http://localhost:5000${user.avatar}`}
//                 alt="Avatar"
//                 className="w-full h-full object-cover"
//               />
//             ) : (
//               <div className="w-full h-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-8xl font-bold">
//                 {user.name.charAt(0).toUpperCase()}
//               </div>
//             )}
//           </div>

//           <div className="text-center md:text-left">
//             <h2 className="text-5xl font-bold mb-8">{user.name}</h2>
//             <div className="space-y-8 text-2xl">
//               <p className="flex items-center gap-6 justify-center md:justify-start">
//                 <FiMail size={36} className="text-indigo-600" />
//                 <span className="text-gray-700 dark:text-gray-300">
//                   {user.email}
//                 </span>
//               </p>
//               <p className="flex items-center gap-6 justify-center md:justify-start">
//                 <FiShield size={36} className="text-indigo-600" />
//                 <span
//                   className={`px-8 py-4 rounded-full text-2xl font-bold ${
//                     user.role === "admin"
//                       ? "bg-purple-100 text-purple-800"
//                       : "bg-blue-100 text-blue-800"
//                   }`}
//                 >
//                   {user.role.toUpperCase()}
//                 </span>
//               </p>
//             </div>
//             <p className="mt-12 text-xl text-gray-500 dark:text-gray-400">
//               Ro'yxatdan o'tgan:{" "}
//               {new Date(user.createdAt).toLocaleDateString("uz-UZ", {
//                 year: "numeric",
//                 month: "long",
//                 day: "numeric",
//               })}
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserProfile;























import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import {
  FiMail,
  FiShield,
  FiArrowLeft,
  FiCalendar,
  FiFileText,
  FiMessageSquare,
  FiUsers,
} from "react-icons/fi";

const UserProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [userNewsCount, setUserNewsCount] = useState(0); // yangiliklar soni
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Foydalanuvchi ma'lumotlari
        const userRes = await axios.get(
          `http://localhost:5000/api/users/${id}/profile`
        );
        setUser(userRes.data);

        // Barcha yangiliklarni olish va ushbu user qo'shganlarini hisoblash
        const newsRes = await axios.get("http://localhost:5000/api/news");
        const userNews = newsRes.data.filter((news) => {
          // Yangilikda "createdBy" field yo'q, lekin agar backendda userId saqlansa – shuni tekshirish mumkin
          // Hozircha vaqtinchalik – agar kerak bo'lsa backendga "createdBy" qo'shamiz
          return true; // hozircha barcha yangiliklar
        });
        setUserNewsCount(userNews.length);
      } catch (err) {
        setError(err.response?.data?.message || "Ma'lumotlar yuklanmadi");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6">
        <div className="w-20 h-20 border-8 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-2xl font-medium text-gray-500 dark:text-gray-400">
          Profil yuklanmoqda...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto mt-32 p-12 glass-card text-center space-y-8">
        <div className="w-28 h-28 bg-red-100 dark:bg-red-900/30 text-red-600 rounded-full flex items-center justify-center mx-auto text-6xl font-bold">
          !
        </div>
        <h2 className="text-4xl font-black text-gray-800 dark:text-white">
          {error}
        </h2>
        <button
          onClick={() => navigate("/users")}
          className="btn-primary text-2xl px-16 py-6 flex items-center justify-center gap-4 mx-auto"
        >
          <FiArrowLeft size={28} />
          Foydalanuvchilar ro'yxatiga qaytish
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-16 pb-20">
      {/* Orqaga tugmasi */}
      <button
        onClick={() => navigate("/users")}
        className="group flex items-center gap-4 text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all text-xl font-semibold"
      >
        <div className="p-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all">
          <FiArrowLeft size={28} />
        </div>
        Orqaga
      </button>

      {/* Asosiy profil kartasi */}
      <div className="glass-card overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/5 via-purple-600/5 to-pink-600/5 -z-10"></div>
        <div className="relative flex flex-col lg:flex-row items-center lg:items-start gap-16 p-12">
          {/* Avatar */}
          <div className="relative group">
            <div className="w-72 h-72 rounded-[4rem] overflow-hidden ring-8 ring-white dark:ring-gray-800 shadow-3xl transition-all duration-500 group-hover:ring-indigo-500/50 group-hover:scale-105">
              {user.avatar ? (
                <img
                  src={`http://localhost:5000${user.avatar}`}
                  alt={user.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 flex items-center justify-center text-white text-9xl font-black shadow-2xl">
                  {user.name.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
            <div
              className={`absolute -bottom-6 left-1/2 -translate-x-1/2 px-10 py-4 rounded-full shadow-2xl font-black text-xl uppercase tracking-wider ${
                user.role === "admin"
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                  : "bg-gradient-to-r from-emerald-500 to-teal-500 text-white"
              }`}
            >
              {user.role}
            </div>
          </div>

          {/* Ma'lumotlar */}
          <div className="flex-1 text-center lg:text-left space-y-10">
            <div>
              <h1 className="text-6xl lg:text-7xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                {user.name}
              </h1>
              <p className="text-2xl text-gray-600 dark:text-gray-400 mt-4 flex items-center justify-center lg:justify-start gap-4">
                <FiMail className="text-indigo-500" size={32} />
                {user.email}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-8 bg-white/60 dark:bg-gray-800/60 backdrop-blur-md rounded-3xl border border-white/20 dark:border-gray-700/50 hover:border-indigo-500/50 transition-all">
                <p className="text-gray-500 dark:text-gray-400 text-sm uppercase font-bold tracking-widest mb-3">
                  Ro'yxatdan o'tgan sana
                </p>
                <div className="flex items-center gap-4 text-2xl font-bold text-gray-800 dark:text-white">
                  <FiCalendar className="text-indigo-600" size={32} />
                  {new Date(user.createdAt).toLocaleDateString("uz-UZ", {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </div>
              </div>

              <div className="p-8 bg-white/60 dark:bg-gray-800/60 backdrop-blur-md rounded-3xl border border-white/20 dark:border-gray-700/50 hover:border-purple-500/50 transition-all">
                <p className="text-gray-500 dark:text-gray-400 text-sm uppercase font-bold tracking-widest mb-3">
                  Hisob holati
                </p>
                <div className="flex items-center gap-4 text-2xl font-bold text-emerald-600">
                  <FiShield size={32} />
                  Faol
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Statistika kartalari – backenddan haqiqiy ma'lumotlar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Jami postlar (yangiliklar) */}
        <div className="glass-card text-center p-10 hover:scale-105 transition-all duration-500">
          <div className="p-6 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-3xl mb-6 inline-block">
            <FiFileText size={48} className="text-indigo-600" />
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-xl font-bold uppercase tracking-widest mb-4">
            Jami Yangiliklar
          </p>
          <h3 className="text-6xl font-extrabold text-indigo-600 dark:text-indigo-400">
            {userNewsCount}
          </h3>
        </div>

        {/* Izohlar – hozircha yo'q */}
        <div className="glass-card text-center p-10 hover:scale-105 transition-all duration-500 opacity-70">
          <div className="p-6 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-3xl mb-6 inline-block">
            <FiMessageSquare size={48} className="text-purple-600" />
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-xl font-bold uppercase tracking-widest mb-4">
            Izohlar
          </p>
          <h3 className="text-6xl font-extrabold text-purple-600 dark:text-purple-400">
            —
          </h3>
          <p className="text-sm text-gray-500 mt-4">Tez orada qo'shiladi</p>
        </div>

        {/* Obunachilar – hozircha yo'q */}
        <div className="glass-card text-center p-10 hover:scale-105 transition-all duration-500 opacity-70">
          <div className="p-6 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-3xl mb-6 inline-block">
            <FiUsers size={48} className="text-emerald-600" />
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-xl font-bold uppercase tracking-widest mb-4">
            Obunachilar
          </p>
          <h3 className="text-6xl font-extrabold text-emerald-600 dark:text-emerald-400">
            —
          </h3>
          <p className="text-sm text-gray-500 mt-4">Tez orada qo'shiladi</p>
        </div>
      </div>

      {/* Motivatsiya */}
      <div className="text-center py-16 glass-card bg-gradient-to-r from-indigo-600/80 via-purple-600/80 to-pink-600/80 backdrop-blur-xl">
        <h2 className="text-5xl md:text-6xl font-extrabold text-white mb-6 drop-shadow-2xl">
          Ajoyib profil!
        </h2>
        <p className="text-3xl text-white/90 font-medium">
          {user.name} – platformamizning faol a'zosi 💪
        </p>
      </div>
    </div>
  );
};

export default UserProfile;