// import { Link, useLocation } from "react-router-dom";
// import {
//   FiHome,
//   FiList,
//   FiPlusSquare,
//   FiUsers,
//   FiUser,
//   FiMoon,
//   FiSun,
//   FiBarChart2,
//   FiBell,
// } from "react-icons/fi";
// import { useState } from "react";

// const Sidebar = ({ mobileMenuOpen, setMobileMenuOpen }) => {
//   const location = useLocation();
//   const [darkMode, setDarkMode] = useState(false);

//   const toggleDarkMode = () => {
//     setDarkMode(!darkMode);
//     document.documentElement.classList.toggle("dark");
//   };

//   const menuItems = [
//     { path: "/", label: "Dashboard", icon: FiHome },
//     { path: "/news", label: "News", icon: FiList },
//     { path: "/add-news", label: "Add News", icon: FiPlusSquare },
//     { path: "/users", label: "All Users", icon: FiUsers },
//     { path: "/profile", label: "Profile", icon: FiUser },
//     // { path: "/stats", label: "Statistikalar", icon: FiBarChart2 },
//     { path: "/notifications", label: "Notifications", icon: FiBell },
//   ];

//   return (
//     <>
//       {/* Mobile Sidebar */}
//       <div
//         className={`fixed inset-y-0 left-0 z-50 w-72 bg-gradient-to-b from-indigo-700 to-indigo-900 text-white transform transition-transform duration-300 lg:hidden ${
//           mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
//         }`}
//       >
//         <div className="p-6">
//           <h2 className="text-2xl font-bold mb-10 text-center">Admin Panel</h2>
//           <nav className="space-y-2">
//             {menuItems.map((item) => (
//               <Link
//                 key={item.path}
//                 to={item.path}
//                 onClick={() => setMobileMenuOpen(false)}
//                 className={`flex items-center px-6 py-4 rounded-xl transition-all ${
//                   location.pathname === item.path
//                     ? "bg-white/20 shadow-lg"
//                     : "hover:bg-white/10"
//                 }`}
//               >
//                 <item.icon className="mr-4 text-xl" />
//                 {item.label}
//               </Link>
//             ))}
//           </nav>
//         </div>
//       </div>

//       {/* Desktop Sidebar */}
//       <div className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:w-64 lg:block bg-gradient-to-b from-indigo-700 to-indigo-900 text-white shadow-2xl">
//         <div className="p-6">
//           <h2 className="text-3xl text-amber-50 font-bold mb-12 text-center">
//             Admin Panel
//           </h2>
//           <nav className="space-y-3">
//             {menuItems.map((item) => (
//               <Link
//                 key={item.path}
//                 to={item.path}
//                 className={`flex items-center px-6 py-4 rounded-xl text-lg font-medium transition-all ${
//                   location.pathname === item.path
//                     ? "bg-white text-indigo-700 shadow-xl"
//                     : "hover:bg-white/10"
//                 }`}
//               >
//                 <item.icon className="mr-4 min-w-[20px]" />
//                 {item.label}
//               </Link>
//             ))}
//           </nav>

//           {/* Dark mode toggle */}
//           <div className="absolute bottom-8 left-6 right-6">
//             <button
//               onClick={toggleDarkMode}
//               className="flex items-center justify-center w-full py-4 bg-white/10 rounded-xl hover:bg-white/20 transition"
//             >
//               {darkMode ? (
//                 <FiSun className="mr-3" />
//               ) : (
//                 <FiMoon className="mr-3" />
//               )}
//               {darkMode ? "Light Mode" : "Dark Mode"}
//             </button>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Sidebar;




















import { Link, useLocation } from "react-router-dom";
import {
  FiHome,
  FiList,
  FiPlusSquare,
  FiUsers,
  FiUser,
  FiBarChart2,
  FiBell,
  FiX,
  FiSettings,
  FiLogOut,
} from "react-icons/fi";

const Sidebar = ({ mobileMenuOpen, setMobileMenuOpen }) => {
  const location = useLocation();

  const menuItems = [
    { path: "/", label: "Dashboard", icon: FiHome },
    { path: "/news", label: "News", icon: FiList },
    { path: "/add-news", label: "Add News", icon: FiPlusSquare },
    { path: "/users", label: "All Users", icon: FiUsers },
    { path: "/profile", label: "Profile", icon: FiUser },
    { path: "/stats", label: "Analytics", icon: FiBarChart2 },
    { path: "/notifications", label: "Alerts", icon: FiBell, badge: 5 },
  ];

  return (
    <>
      {/* 1. OVERLAY (Mobil uchun) */}
      <div
        className={`fixed inset-0 z-[60] glass-overlay lg:hidden transition-all duration-500 ${
          mobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setMobileMenuOpen(false)}
      ></div>

      {/* 2. SIDEBAR */}
      <div
        className={`fixed inset-y-0 left-0 z-[70] w-72 floating-sidebar text-white transform transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] lg:translate-x-0 ${
          mobileMenuOpen ? "translate-x-0 m-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Brand Header */}
          <div className="h-24 flex items-center px-8 mb-4">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(79,70,229,0.5)] mr-3 rotate-3 group-hover:rotate-0 transition-transform">
              <span className="text-2xl font-black">T</span>
            </div>
            <h2 className="text-xl font-black tracking-tight uppercase">
              Tech<span className="text-indigo-500">Nova</span>
            </h2>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="lg:hidden ml-auto p-2 glass-button rounded-lg text-gray-400"
            >
              <FiX size={20} />
            </button>
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 px-4 space-y-1.5 overflow-y-auto sidebar-scroll">
            <p className="px-4 text-[10px] font-bold text-gray-500 uppercase tracking-[2px] mb-4">
              Main Menu
            </p>
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`group flex items-center px-4 py-3.5 rounded-xl transition-all duration-300 ${
                    isActive
                      ? "neon-glow-active text-white"
                      : "text-gray-400 hover:text-white hover:bg-white/[0.03]"
                  }`}
                >
                  <item.icon
                    className={`text-xl mr-4 transition-transform duration-300 ${
                      isActive
                        ? "text-indigo-400 scale-110"
                        : "group-hover:scale-110"
                    }`}
                  />
                  <span
                    className={`text-sm font-semibold tracking-wide ${
                      isActive
                        ? "opacity-100"
                        : "opacity-80 group-hover:opacity-100"
                    }`}
                  >
                    {item.label}
                  </span>
                  {item.badge && (
                    <span className="ml-auto bg-indigo-600 text-[10px] font-black px-2 py-0.5 rounded-md shadow-[0_0_10px_rgba(79,70,229,0.4)]">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* User & Settings Section
          <div className="p-4 mt-auto border-t border-white/5 space-y-2">
            <Link
              to="/settings"
              className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white transition-colors text-sm font-medium"
            >
              <FiSettings /> Settings
            </Link>
            <div className="p-4 bg-gradient-to-r from-indigo-600/10 to-transparent rounded-2xl border border-white/5 flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center font-black">
                  AD
                </div>
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-[#111827] rounded-full"></div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold truncate">Ali Developper</p>
                <p className="text-[10px] text-gray-500 truncate">
                  ali@example.com
                </p>
              </div>
              <button className="p-2 text-gray-500 hover:text-rose-500 transition-colors">
                <FiLogOut />
              </button>
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default Sidebar;