// import { useState, useContext } from "react";
// import { AuthContext } from "../context/AuthContext";
// import { useNavigate } from "react-router-dom";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const { login } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     try {
//       await login(email, password);
//       navigate("/");
//     } catch (err) {
//       setError(err.response?.data?.message || "Kirishda xatolik");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600">
//       <div className="card w-full max-w-md p-12">
//         <h2 className="text-4xl font-bold text-center mb-12 text-gray-800 dark:text-white">
//           Admin Kirish
//         </h2>

//         {error && (
//           <p className="text-red-600 bg-red-100 dark:bg-red-900/30 p-4 rounded-xl text-center mb-8 text-xl">
//             {error}
//           </p>
//         )}

//         <form onSubmit={handleSubmit} className="space-y-10">
//           <div>
//             <label className="block text-xl font-semibold mb-4">Email</label>
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//               className="input text-xl"
//               placeholder="admin@example.com"
//             />
//           </div>

//           <div>
//             <label className="block text-xl font-semibold mb-4">Parol</label>
//             <input
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//               className="input text-xl"
//               placeholder="••••••••"
//             />
//           </div>

//           <button type="submit" className="w-full btn-primary text-2xl py-6">
//             Kirish
//           </button>
//         </form>

//         <p className="text-center mt-10 text-gray-600 dark:text-gray-400">
//           Birinchi marta?{" "}
//           <span className="text-indigo-600 font-bold">
//             admin@example.com / 123456
//           </span>{" "}
//           bilan kiring
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Login;





















import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { FiMail, FiLock, FiLogIn, FiAlertCircle } from "react-icons/fi"; // Ikonkalar qo'shildi

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useContext(AuthContext);
  const [loading, setLoading] = useState(false); // Yuklanish holati
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Email yoki parol noto'g'ri");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#4f46e5] via-[#9333ea] to-[#db2777] p-4 relative overflow-hidden">
      {/* Orqa fondagi dekorativ elementlar */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-pink-500/20 rounded-full blur-3xl"></div>

      <div className="w-full max-w-md animate-fade-in relative z-10">
        <div className="bg-white/10 dark:bg-gray-900/40 backdrop-blur-2xl border border-white/20 rounded-[2.5rem] p-10 md:p-12 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)]">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-3xl mb-6 backdrop-blur-lg">
              <FiLogIn className="text-white text-4xl" />
            </div>
            <h2 className="text-4xl font-black text-white tracking-tight">
              Xush kelibsiz
            </h2>
            <p className="text-white/60 mt-2 font-medium">
              Panelga kirish uchun ma'lumotlarni kiriting
            </p>
          </div>

          {error && (
            <div className="flex items-center gap-3 bg-red-500/20 border border-red-500/50 text-white p-4 rounded-2xl mb-8 animate-shake">
              <FiAlertCircle className="flex-shrink-0 text-xl" />
              <p className="text-lg font-semibold leading-tight">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Input */}
            <div className="space-y-3">
              <label className="block text-white font-bold ml-2">
                Email Manzil
              </label>
              <div className="relative group">
                <FiMail className="absolute left-5 top-1/2 -translate-y-1/2 text-white/50 group-focus-within:text-white transition-colors text-xl" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-14 pr-6 py-5 bg-white/10 border border-white/10 focus:border-white/40 focus:bg-white/20 rounded-2xl outline-none text-white placeholder:text-white/30 transition-all text-lg"
                  placeholder="admin@example.com"
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-3">
              <label className="block text-white font-bold ml-2">
                Maxfiy Parol
              </label>
              <div className="relative group">
                <FiLock className="absolute left-5 top-1/2 -translate-y-1/2 text-white/50 group-focus-within:text-white transition-colors text-xl" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-14 pr-6 py-5 bg-white/10 border border-white/10 focus:border-white/40 focus:bg-white/20 rounded-2xl outline-none text-white placeholder:text-white/30 transition-all text-lg"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-5 bg-white text-indigo-600 rounded-2xl font-black text-xl shadow-xl hover:bg-opacity-90 active:scale-[0.98] transition-all flex items-center justify-center gap-3 disabled:opacity-70 mt-4"
            >
              {loading ? (
                <div className="w-7 h-7 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
              ) : (
                "Tizimga Kirish"
              )}
            </button>
          </form>

          <div className="mt-10 pt-8 border-t border-white/10">
            <p className="text-center text-white/50 font-medium">
              Demo Ma'lumotlar: <br />
              <span className="text-white italic">
                admin@example.com / 123456
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;