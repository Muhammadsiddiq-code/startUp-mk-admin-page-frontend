// import { useState } from "react";
// import { useSocket } from "../context/SocketContext";
// import { FiBell, FiUserPlus, FiFileText } from "react-icons/fi";

// const NotificationPanel = () => {
//   const { notifications } = useSocket();
//   const [isOpen, setIsOpen] = useState(false);
//   const unreadCount = notifications.length;

//   const formatRelativeTime = (dateString) => {
//     const date = new Date(dateString);
//     const now = new Date();
//     const diffMs = now - date;
//     const diffMins = Math.floor(diffMs / 60000);

//     if (diffMins < 1) return "hozirgina";
//     if (diffMins < 60) return `${diffMins} daqiqa oldin`;
//     if (diffMins < 1440) return `${Math.floor(diffMins / 60)} soat oldin`;
//     return date.toLocaleDateString("uz-UZ", {
//       day: "numeric",
//       month: "short",
//     });
//   };

//   const getIconAndColor = (type) => {
//     if (type === "user") {
//       return {
//         icon: FiUserPlus,
//         color:
//           "bg-indigo-100 text-indigo-600 dark:bg-indigo-900/50 dark:text-indigo-400",
//       };
//     }
//     return {
//       icon: FiFileText,
//       color:
//         "bg-purple-100 text-purple-600 dark:bg-purple-900/50 dark:text-purple-400",
//     };
//   };

//   return (
//     <div className="relative">
//       {/* Bell tugmasi */}
//       <button
//         onClick={() => setIsOpen(!isOpen)}
//         className="relative p-3 md:p-4 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200"
//       >
//         <FiBell size={26} className="text-gray-700 dark:text-gray-300" />
//         {unreadCount > 0 && (
//           <span className="absolute -top-1 -right-1 md:-top-2 md:-right-2 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 md:w-6 md:h-6 flex items-center justify-center shadow-lg animate-pulse">
//             {unreadCount > 99 ? "99+" : unreadCount}
//           </span>
//         )}
//       </button>

//       {/* Panel ochiq bo'lganda */}
//       {isOpen && (
//         <>
//           {/* Overlay – mobil uchun to'liq ekran */}
//           <div
//             className="fixed inset-0 bg-black/50 z-40 lg:hidden"
//             onClick={() => setIsOpen(false)}
//           />

//           {/* Notification panel */}
//           <div
//             className={`
//               fixed lg:absolute
//               top-16 lg:top-auto
//               right-4 lg:right-0
//               left-4 lg:left-auto
//               w-[calc(100%-2rem)] lg:w-96
//               bg-white dark:bg-gray-800
//               rounded-3xl
//               shadow-2xl
//               border border-gray-200 dark:border-gray-700
//               z-50
//               max-h-[80vh]
//               overflow-hidden
//               animate-in fade-in slide-in-from-top-4 duration-300
//             `}
//           >
//             {/* Sarlavha */}
//             <div className="p-5 md:p-6 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
//               <h3 className="text-xl md:text-2xl font-bold text-center">
//                 Yangi Bildirishnomalar
//               </h3>
//             </div>

//             {/* Bildirishnomalar ro'yxati */}
//             <div className="max-h-[60vh] overflow-y-auto">
//               {notifications.length === 0 ? (
//                 <div className="p-12 text-center">
//                   <svg
//                     className="mx-auto w-20 h-20 text-gray-400 mb-6"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
//                     />
//                   </svg>
//                   <p className="text-xl text-gray-500 dark:text-gray-400">
//                     Hozircha bildirishnoma yo'q
//                   </p>
//                 </div>
//               ) : (
//                 <div className="divide-y divide-gray-200 dark:divide-gray-700">
//                   {notifications.map((notif, index) => {
//                     const { icon: Icon, color } = getIconAndColor(notif.type);
//                     return (
//                       <div
//                         key={index}
//                         className="p-5 md:p-6 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition flex items-start gap-4"
//                       >
//                         <div
//                           className={`p-3 rounded-2xl ${color} flex-shrink-0`}
//                         >
//                           <Icon size={24} />
//                         </div>
//                         <div className="flex-1 min-w-0">
//                           <p className="text-base md:text-lg font-medium text-gray-800 dark:text-white break-words">
//                             {notif.message}
//                           </p>
//                           <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
//                             {formatRelativeTime(notif.createdAt)}
//                           </p>
//                         </div>
//                       </div>
//                     );
//                   })}
//                 </div>
//               )}
//             </div>

//             {/* Pastki qism – Yopish tugmasi (mobil uchun) */}
//             <div className="p-4 border-t border-gray-200 dark:border-gray-700 lg:hidden">
//               <button
//                 onClick={() => setIsOpen(false)}
//                 className="w-full py-3 text-center text-indigo-600 dark:text-indigo-400 font-semibold hover:bg-indigo-50 dark:hover:bg-indigo-900/30 rounded-xl transition"
//               >
//                 Yopish
//               </button>
//             </div>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default NotificationPanel;

























import { useState, useEffect } from "react";
import { useSocket } from "../context/SocketContext";
import { FiBell, FiUserPlus, FiFileText, FiArrowRight } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const NotificationPanel = () => {
  const { notifications } = useSocket();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  // Bugungi bildirishnomalar
  const today = new Date();
  const todayStr = today.toISOString().split("T")[0];

  const todayNotifications = notifications.filter((notif) => {
    const notifDate = new Date(notif.createdAt);
    return notifDate.toISOString().split("T")[0] === todayStr;
  });

  const unreadCount = todayNotifications.length;

  // Panel ochilganda o'qilgan deb belgilash
  useEffect(() => {
    if (isOpen && unreadCount > 0) {
      // Bu yerda backendga yuborish mumkin, lekin hozir local saqlaymiz
      localStorage.setItem("lastNotificationCheck", new Date().toISOString());
    }
  }, [isOpen, unreadCount]);

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMins = Math.floor((now - date) / 60000);

    if (diffMins < 1) return "hozirgina";
    if (diffMins < 60) return `${diffMins} daqiqa oldin`;
    return `${Math.floor(diffMins / 60)} soat oldin`;
  };

  const getIconAndColor = (type) => {
    if (type === "user") {
      return {
        icon: FiUserPlus,
        color: "bg-indigo-100 text-indigo-600 dark:bg-indigo-900/50",
      };
    }
    return {
      icon: FiFileText,
      color: "bg-purple-100 text-purple-600 dark:bg-purple-900/50",
    };
  };

  return (
    <div className="relative">
      {/* Bell ikonka */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-3 md:p-4 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200"
      >
        <FiBell size={28} className="text-gray-700 dark:text-gray-300" />
        {unreadCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold rounded-full w-7 h-7 flex items-center justify-center shadow-2xl animate-pulse ring-4 ring-red-500/30">
            {unreadCount > 99 ? "99+" : unreadCount}
          </span>
        )}
      </button>

      {/* Panel */}
      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40 lg:hidden"
            onClick={() => setIsOpen(false)}
          />

          <div
            className={`
            fixed lg:absolute top-16 lg:top-auto right-4 lg:right-0 left-4 lg:left-auto
            w-[calc(100%-2rem)] lg:w-96 bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700 z-50 overflow-hidden
          `}
          >
            <div className="p-5 md:p-6 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
              <div className="flex justify-between items-center">
                <h3 className="text-xl md:text-2xl font-bold">
                  Bugungi Bildirishnomalar
                </h3>
                {unreadCount > 0 && (
                  <span className="text-sm bg-white/20 px-3 py-1 rounded-full">
                    {unreadCount} ta yangi
                  </span>
                )}
              </div>
            </div>

            <div className="max-h-96 overflow-y-auto">
              {todayNotifications.length === 0 ? (
                <div className="p-12 text-center text-gray-500 dark:text-gray-400">
                  Bugun yangi bildirishnoma yo'q
                </div>
              ) : (
                <div className="divide-y divide-gray-200 dark:divide-gray-700">
                  {todayNotifications.map((notif, index) => {
                    const { icon: Icon, color } = getIconAndColor(notif.type);
                    return (
                      <div
                        key={index}
                        className="p-5 md:p-6 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition flex items-start gap-4"
                      >
                        <div className={`p-3 rounded-2xl ${color}`}>
                          <Icon size={24} />
                        </div>
                        <div className="flex-1">
                          <p className="text-base md:text-lg font-medium text-gray-800 dark:text-white">
                            {notif.message}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                            {formatTime(notif.createdAt)}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Barchasini ko'rish tugmasi */}
            {notifications.length > todayNotifications.length && (
              <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={() => {
                    setIsOpen(false);
                    navigate("/notifications");
                  }}
                  className="w-full py-4 text-center text-indigo-600 dark:text-indigo-400 font-bold hover:bg-indigo-50 dark:hover:bg-indigo-900/30 rounded-xl transition flex items-center justify-center gap-3"
                >
                  Barcha bildirishnomalarni ko'rish
                  <FiArrowRight size={20} />
                </button>
              </div>
            )}

            {/* Mobil uchun yopish */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-700 lg:hidden">
              <button
                onClick={() => setIsOpen(false)}
                className="w-full py-3 text-center text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition"
              >
                Yopish
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default NotificationPanel;