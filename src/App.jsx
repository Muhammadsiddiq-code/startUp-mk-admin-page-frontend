// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Navigate,
// } from "react-router-dom";
// import { useContext, useState } from "react";
// import { AuthContext } from "./context/AuthContext";
// import Dashboard from "./pages/Dashboard";
// import NewsList from "./pages/NewsList";
// import AddNews from "./pages/AddNews";
// import AllUsers from "./pages/AllUser";
// import Profile from "./pages/Profile";
// import UserProfile from "./pages/UserProfile";
// import Login from "./pages/Login";
// import Sidebar from "./components/Sidebar";
// import NotificationPanel from "./components/NotificationPanel";

// function PrivateRoute({ children }) {
//   const { user, loading } = useContext(AuthContext);
//   if (loading)
//     return (
//       <div className="flex items-center justify-center h-screen text-2xl">
//         Yuklanmoqda...
//       </div>
//     );
//   return user ? children : <Navigate to="/login" />;
// }

// function App() {
//   const { user, logout } = useContext(AuthContext);
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

//   return (
//     <Router>
//       {user ? (
//         <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
//           {/* Mobile menu overlay */}
//           {mobileMenuOpen && (
//             <div
//               className="fixed inset-0 bg-black/50 z-40 lg:hidden"
//               onClick={() => setMobileMenuOpen(false)}
//             />
//           )}

//           {/* Sidebar */}
//           <Sidebar
//             mobileMenuOpen={mobileMenuOpen}
//             setMobileMenuOpen={setMobileMenuOpen}
//           />

//           {/* Main content */}
//           <div className="lg:ml-64 min-h-screen">
//             {/* Top bar */}
//             <header className="bg-white dark:bg-gray-800 shadow-md border-b border-gray-200 dark:border-gray-700">
//               <div className="flex justify-between items-center p-6">
//                 <button
//                   onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//                   className="lg:hidden text-gray-700 dark:text-gray-300"
//                 >
//                   <svg
//                     className="w-8 h-8"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M4 6h16M4 12h16M4 18h16"
//                     />
//                   </svg>
//                 </button>

//                 <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
//                   Admin Panel
//                 </h1>

//                 {/* Notification bell */}
//                 <NotificationPanel />

//                 {/* Chiqish */}
//                 <button onClick={logout} className="btn-danger">
//                   Chiqish
//                 </button>
//               </div>
//             </header>

//             {/* Page content */}
//             <main className="p-6 lg:p-10">
//               <Routes>
//                 <Route
//                   path="/"
//                   element={
//                     <PrivateRoute>
//                       <Dashboard />
//                     </PrivateRoute>
//                   }
//                 />
//                 <Route
//                   path="/news"
//                   element={
//                     <PrivateRoute>
//                       <NewsList />
//                     </PrivateRoute>
//                   }
//                 />
//                 <Route
//                   path="/add-news"
//                   element={
//                     <PrivateRoute>
//                       <AddNews />
//                     </PrivateRoute>
//                   }
//                 />
//                 <Route
//                   path="/users"
//                   element={
//                     <PrivateRoute>
//                       <AllUsers />
//                     </PrivateRoute>
//                   }
//                 />
//                 <Route
//                   path="/profile"
//                   element={
//                     <PrivateRoute>
//                       <Profile />
//                     </PrivateRoute>
//                   }
//                 />
//                 <Route
//                   path="/user-profile/:id"
//                   element={
//                     <PrivateRoute>
//                       <UserProfile />
//                     </PrivateRoute>
//                   }
//                 />
//                 <Route path="*" element={<Navigate to="/" />} />
//               </Routes>
//             </main>
//           </div>
//         </div>
//       ) : (
//         <Routes>
//           <Route path="/login" element={<Login />} />
//           <Route path="*" element={<Navigate to="/login" />} />
//         </Routes>
//       )}
//     </Router>
//   );
// }

// export default App;








import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "./context/AuthContext";
import Dashboard from "./pages/Dashboard";
import NewsList from "./pages/NewsList";
import AddNews from "./pages/AddNews";
import AllUsers from "./pages/AllUser";
import Profile from "./pages/Profile";
import UserProfile from "./pages/UserProfile";
import Login from "./pages/Login";
import Sidebar from "./components/Sidebar";
import NotificationPanel from "./components/NotificationPanel";
import AllNotifications from './pages/AllNotifications';


function PrivateRoute({ children }) {
  const { user, loading } = useContext(AuthContext);
  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="text-2xl font-bold text-primary-600 dark:text-primary-400 animate-fade-in">
          Yuklanmoqda...
        </div>
      </div>
    );
  return user ? children : <Navigate to="/login" />;
}

function App() {
  const { user, logout } = useContext(AuthContext);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <Router>
      {user ? (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
          {/* Mobile Menu Backdrop */}
          {mobileMenuOpen && (
            <div
              className="mobile-menu-backdrop animate-fade-in"
              onClick={() => setMobileMenuOpen(false)}
            />
          )}

          {/* Sidebar */}
          <Sidebar
            mobileMenuOpen={mobileMenuOpen}
            setMobileMenuOpen={setMobileMenuOpen}
          />

          {/* Main Content */}
          <div className="lg:ml-64 min-h-screen flex flex-col">
            {/* Top Header */}
            <header className="bg-white dark:bg-gray-800 shadow-xl mb-7 px-4 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-30">
              <div className="container-responsive flex items-center justify-between py-2 sm:py-5 sm:px-2">
                {/* Mobile Menu Button */}
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="lg:hidden p-3 rounded-xl bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200 active:scale-95"
                  aria-label="Menu ochish"
                >
                  <svg
                    className="w-7 h-7 text-gray-700 dark:text-gray-200"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </button>

                {/* Title */}
                <h1 className="text-responsive-lg ml-7 text-[black] font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-3xl hidden min-[700px]:block">
                  Admin Panel
                </h1>

                <div className="flex items-center gap-4">
                  {/* Notification Panel */}
                  <NotificationPanel />

                  {/* Logout Button */}
                  <button onClick={logout} className="btn-danger">
                    Chiqish
                  </button>
                </div>
              </div>
            </header>

            {/* Page Content */}
            <main className="flex-1 section-padding">
              <Routes>
                <Route
                  path="/"
                  element={
                    <PrivateRoute>
                      <Dashboard />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/news"
                  element={
                    <PrivateRoute>
                      <NewsList />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/add-news"
                  element={
                    <PrivateRoute>
                      <AddNews />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/users"
                  element={
                    <PrivateRoute>
                      <AllUsers />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <PrivateRoute>
                      <Profile />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/user-profile/:id"
                  element={
                    <PrivateRoute>
                      <UserProfile />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/notifications"
                  element={
                    <PrivateRoute>
                      <AllNotifications />
                    </PrivateRoute>
                  }
                />
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </main>
          </div>
        </div>
      ) : (
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      )}
    </Router>
  );
}

export default App;