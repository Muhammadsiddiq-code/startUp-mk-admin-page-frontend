// import { useContext, useState, useEffect } from "react";
// import axios from "axios";
// import { AuthContext } from "../context/AuthContext";
// import { FiMail, FiLock, FiCamera, FiTrash2 } from "react-icons/fi";

// const Profile = () => {
//   const { user: authUser } = useContext(AuthContext);
//   const [profile, setProfile] = useState(null);
//   const [isEditing, setIsEditing] = useState(false);
//   const [avatarFile, setAvatarFile] = useState(null);
//   const [avatarPreview, setAvatarPreview] = useState(null);
//   const [uploading, setUploading] = useState(false);
//   const [deletingAvatar, setDeletingAvatar] = useState(false);

//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     currentPassword: "",
//     newPassword: "",
//     confirmPassword: "",
//   });

//   const [message, setMessage] = useState("");
//   const [error, setError] = useState("");

//   const fetchProfile = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/api/auth/me");
//       setProfile(res.data);
//       setFormData({
//         name: res.data.name || "",
//         email: res.data.email || "",
//         currentPassword: "",
//         newPassword: "",
//         confirmPassword: "",
//       });
//       setAvatarPreview(
//         res.data.avatar ? `http://localhost:5000${res.data.avatar}` : null
//       );
//     } catch {
//       setError("Profil yuklanmadi");
//     }
//   };

//   useEffect(() => {
//     fetchProfile();
//   }, []);

//   const handleAvatarChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setAvatarFile(file);
//       setAvatarPreview(URL.createObjectURL(file));
//     }
//   };

//   const handleAvatarUpload = async () => {
//     if (!avatarFile) return;
//     setUploading(true);
//     const data = new FormData();
//     data.append("avatar", avatarFile);

//     try {
//       const res = await axios.post(
//         "http://localhost:5000/api/auth/avatar",
//         data,
//         { headers: { "Content-Type": "multipart/form-data" } }
//       );
//       setProfile({ ...profile, avatar: res.data.avatar });
//       setAvatarPreview(`http://localhost:5000${res.data.avatar}`);
//       setAvatarFile(null);
//       setMessage("Avatar yangilandi!");
//     } catch {
//       setError("Avatar yuklashda xatolik");
//     } finally {
//       setUploading(false);
//     }
//   };

//   const handleDeleteAvatar = async () => {
//     if (!window.confirm("Avatar o‘chirilsinmi?")) return;
//     setDeletingAvatar(true);
//     try {
//       await axios.delete("http://localhost:5000/api/auth/avatar");
//       setProfile({ ...profile, avatar: null });
//       setAvatarPreview(null);
//       setMessage("Avatar o‘chirildi!");
//     } catch {
//       setError("Avatar o‘chirishda xatolik");
//     } finally {
//       setDeletingAvatar(false);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setMessage("");
//     setError("");

//     if (
//       formData.newPassword &&
//       formData.newPassword !== formData.confirmPassword
//     ) {
//       setError("Yangi parollar mos emas");
//       return;
//     }

//     try {
//       const updateData = {
//         name: formData.name,
//         email: formData.email,
//       };

//       if (formData.currentPassword && formData.newPassword) {
//         updateData.currentPassword = formData.currentPassword;
//         updateData.newPassword = formData.newPassword;
//       }

//       const res = await axios.put(
//         "http://localhost:5000/api/auth/me",
//         updateData
//       );

//       setProfile(res.data);
//       setIsEditing(false);
//       setMessage("Profil yangilandi!");
//     } catch (err) {
//       setError(err.response?.data?.message || "Xatolik yuz berdi");
//     }
//   };

//   if (!profile) {
//     return <div className="text-center py-20 text-2xl">Yuklanmoqda...</div>;
//   }

//   return (
//     <div className="max-w-5xl mx-auto space-y-12 px-4 sm:px-6 lg:px-0">
//       {/* TITLE */}
//       <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center">
//         Mening Profilim
//       </h1>

//       {/* CARD */}
//       <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-xl p-6 sm:p-10">
//         {/* AVATAR SECTION */}
//         <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12 mb-12">
//           <div className="relative">
//             <div className="w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 rounded-full overflow-hidden border-8 border-indigo-200 dark:border-indigo-800 shadow-xl">
//               {avatarPreview || profile.avatar ? (
//                 <img
//                   src={
//                     avatarPreview || `http://localhost:5000${profile.avatar}`
//                   }
//                   alt="Avatar"
//                   className="w-full h-full object-cover"
//                 />
//               ) : (
//                 <div className="w-full h-full bg-indigo-600 flex items-center justify-center text-white text-5xl font-bold">
//                   {profile.name.charAt(0).toUpperCase()}
//                 </div>
//               )}
//             </div>

//             <label className="absolute bottom-2 right-2 sm:bottom-4 sm:right-4 bg-indigo-600 p-3 sm:p-4 rounded-full cursor-pointer text-white shadow-lg">
//               <FiCamera size={22} />
//               <input
//                 type="file"
//                 accept="image/*"
//                 className="hidden"
//                 onChange={handleAvatarChange}
//               />
//             </label>

//             {(avatarPreview || profile.avatar) && (
//               <button
//                 onClick={handleDeleteAvatar}
//                 disabled={deletingAvatar}
//                 className="absolute top-2 right-2 sm:top-4 sm:right-4 bg-red-600 p-2 sm:p-3 rounded-full text-white shadow-lg"
//               >
//                 <FiTrash2 size={18} />
//               </button>
//             )}
//           </div>

//           {/* INFO */}
//           <div className="text-center lg:text-left flex-1">
//             <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
//               {profile.name}
//             </h2>
//             <p className="flex items-center justify-center lg:justify-start gap-3 text-gray-600 mb-6">
//               <FiMail /> {profile.email}
//             </p>

//             <span
//               className={`inline-block px-5 py-2 rounded-full font-semibold ${
//                 profile.role === "admin"
//                   ? "bg-purple-100 text-purple-800"
//                   : "bg-blue-100 text-blue-800"
//               }`}
//             >
//               {profile.role.toUpperCase()}
//             </span>
//           </div>

//           {avatarFile && (
//             <button
//               onClick={handleAvatarUpload}
//               disabled={uploading}
//               className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl w-full sm:w-auto"
//             >
//               {uploading ? "Yuklanmoqda..." : "Avatar Saqlash"}
//             </button>
//           )}
//         </div>

//         {/* MESSAGES */}
//         {message && (
//           <p className="text-green-600 text-center font-bold mb-6">{message}</p>
//         )}
//         {error && (
//           <p className="text-red-600 text-center font-bold mb-6">{error}</p>
//         )}

//         {/* EDIT FORM */}
//         <div className="border-t pt-10">
//           <div className="flex justify-between items-center mb-8">
//             <h3 className="text-xl font-bold">Ma’lumotlarni o‘zgartirish</h3>
//             <button
//               onClick={() => setIsEditing(!isEditing)}
//               className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl"
//             >
//               {isEditing ? "Bekor qilish" : "Tahrirlash"}
//             </button>
//           </div>

//           {isEditing && (
//             <form onSubmit={handleSubmit} className="space-y-8">
//               <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//                 <input
//                   type="text"
//                   value={formData.name}
//                   onChange={(e) =>
//                     setFormData({ ...formData, name: e.target.value })
//                   }
//                   className="border p-4 rounded-xl"
//                   placeholder="Ism"
//                 />
//                 <input
//                   type="email"
//                   value={formData.email}
//                   onChange={(e) =>
//                     setFormData({ ...formData, email: e.target.value })
//                   }
//                   className="border p-4 rounded-xl"
//                   placeholder="Email"
//                 />
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                 <input
//                   type="password"
//                   placeholder="Joriy parol"
//                   value={formData.currentPassword}
//                   onChange={(e) =>
//                     setFormData({
//                       ...formData,
//                       currentPassword: e.target.value,
//                     })
//                   }
//                   className="border p-4 rounded-xl"
//                 />
//                 <input
//                   type="password"
//                   placeholder="Yangi parol"
//                   value={formData.newPassword}
//                   onChange={(e) =>
//                     setFormData({ ...formData, newPassword: e.target.value })
//                   }
//                   className="border p-4 rounded-xl"
//                 />
//                 <input
//                   type="password"
//                   placeholder="Tasdiqlash"
//                   value={formData.confirmPassword}
//                   onChange={(e) =>
//                     setFormData({
//                       ...formData,
//                       confirmPassword: e.target.value,
//                     })
//                   }
//                   className="border p-4 rounded-xl"
//                 />
//               </div>

//               <button
//                 type="submit"
//                 className="bg-green-600 hover:bg-green-700 text-white px-12 py-4 rounded-xl w-full sm:w-auto"
//               >
//                 Saqlash
//               </button>
//             </form>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Profile;






























import { useContext, useState, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import {
  FiMail,
  FiLock,
  FiCamera,
  FiTrash2,
  FiUser,
  FiCheckCircle,
  FiShield,
} from "react-icons/fi";

const Profile = () => {
  const { user: authUser } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [deletingAvatar, setDeletingAvatar] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const fetchProfile = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/auth/me");
      setProfile(res.data);
      setFormData({
        name: res.data.name || "",
        email: res.data.email || "",
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setAvatarPreview(
        res.data.avatar ? `http://localhost:5000${res.data.avatar}` : null
      );
    } catch {
      setError("Profil yuklanmadi");
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const handleAvatarUpload = async () => {
    if (!avatarFile) return;
    setUploading(true);
    const data = new FormData();
    data.append("avatar", avatarFile);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/avatar",
        data,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      setProfile({ ...profile, avatar: res.data.avatar });
      setAvatarPreview(`http://localhost:5000${res.data.avatar}`);
      setAvatarFile(null);
      setMessage("Avatar muvaffaqiyatli yangilandi!");
      setTimeout(() => setMessage(""), 3000);
    } catch {
      setError("Avatar yuklashda xatolik");
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteAvatar = async () => {
    if (!window.confirm("Avatar o‘chirilsinmi?")) return;
    setDeletingAvatar(true);
    try {
      await axios.delete("http://localhost:5000/api/auth/avatar");
      setProfile({ ...profile, avatar: null });
      setAvatarPreview(null);
      setMessage("Avatar o‘chirildi");
      setTimeout(() => setMessage(""), 3000);
    } catch {
      setError("Avatar o‘chirishda xatolik");
    } finally {
      setDeletingAvatar(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (
      formData.newPassword &&
      formData.newPassword !== formData.confirmPassword
    ) {
      setError("Yangi parollar mos emas");
      return;
    }

    try {
      const updateData = { name: formData.name, email: formData.email };
      if (formData.currentPassword && formData.newPassword) {
        updateData.currentPassword = formData.currentPassword;
        updateData.newPassword = formData.newPassword;
      }

      const res = await axios.put(
        "http://localhost:5000/api/auth/me",
        updateData
      );
      setProfile(res.data);
      setIsEditing(false);
      setMessage("Profil ma'lumotlari yangilandi!");
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      setError(err.response?.data?.message || "Xatolik yuz berdi");
    }
  };

  if (!profile) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-xl font-medium text-gray-500">
          Profil yuklanmoqda...
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-10 pb-20 animate-fade-in">
      {/* HEADER SECTION */}
      <div className="text-center space-y-2">
        <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tight">
          Profil <span className="text-indigo-600">Sozlamalari</span>
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-lg italic">
          Shaxsiy ma'lumotlaringizni boshqaring
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {/* AVATAR & BASIC INFO CARD */}
        <div className="card relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-600/5 rounded-bl-[5rem]"></div>

          <div className="flex flex-col md:flex-row items-center gap-10">
            {/* Avatar Circle */}
            <div className="relative group">
              <div className="w-40 h-40 md:w-48 md:h-48 rounded-[3rem] overflow-hidden border-4 border-white dark:border-gray-800 shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]">
                {avatarPreview ? (
                  <img
                    src={avatarPreview}
                    alt="Avatar"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-6xl font-black">
                    {profile.name.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>

              {/* Photo Controls */}
              <label className="absolute -bottom-3 -right-3 bg-indigo-600 hover:bg-indigo-700 p-4 rounded-2xl cursor-pointer text-white shadow-xl transition-all hover:rotate-12 active:scale-90">
                <FiCamera size={24} />
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleAvatarChange}
                />
              </label>

              {(avatarPreview || profile.avatar) && (
                <button
                  onClick={handleDeleteAvatar}
                  disabled={deletingAvatar}
                  className="absolute -top-3 -right-3 bg-rose-500 hover:bg-rose-600 p-2 rounded-xl text-white shadow-lg transition-all"
                >
                  <FiTrash2 size={18} />
                </button>
              )}
            </div>

            {/* Basic Info */}
            <div className="flex-1 text-center md:text-left space-y-4">
              <div>
                <h2 className="text-3xl font-black text-gray-800 dark:text-white">
                  {profile.name}
                </h2>
                <div className="flex items-center justify-center md:justify-start gap-2 text-gray-500 dark:text-gray-400 mt-1">
                  <FiMail className="text-indigo-500" />
                  <span className="font-medium">{profile.email}</span>
                </div>
              </div>

              <div className="flex flex-wrap justify-center md:justify-start gap-3">
                <span className="flex items-center gap-2 px-4 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-xl text-sm font-black uppercase tracking-wider">
                  <FiShield /> {profile.role}
                </span>
                <span className="flex items-center gap-2 px-4 py-2 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 rounded-xl text-sm font-bold">
                  <FiCheckCircle /> Faol
                </span>
              </div>

              {avatarFile && (
                <button
                  onClick={handleAvatarUpload}
                  disabled={uploading}
                  className="mt-4 bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-indigo-500/30 hover:bg-indigo-700 transition-all flex items-center gap-2 mx-auto md:mx-0"
                >
                  {uploading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <FiCheckCircle />
                  )}
                  Yangi Avatarni Saqlash
                </button>
              )}
            </div>
          </div>
        </div>

        {/* MESSAGES */}
        {message && (
          <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 py-4 px-6 rounded-2xl text-center font-bold animate-bounce">
            {message}
          </div>
        )}
        {error && (
          <div className="bg-rose-500/10 border border-rose-500/20 text-rose-600 py-4 px-6 rounded-2xl text-center font-bold">
            {error}
          </div>
        )}

        {/* EDITABLE FORM CARD */}
        <div className="card">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-10 gap-4">
            <h3 className="text-2xl font-black flex items-center gap-3">
              <FiUser className="text-indigo-600" /> Shaxsiy Ma'lumotlar
            </h3>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className={`px-6 py-3 rounded-xl font-bold transition-all ${
                isEditing
                  ? "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
                  : "bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600"
              }`}
            >
              {isEditing ? "Tahrirni yopish" : "Ma'lumotlarni yangilash"}
            </button>
          </div>

          <form
            onSubmit={handleSubmit}
            className={`space-y-8 ${
              !isEditing ? "opacity-50 pointer-events-none" : ""
            }`}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-400 ml-2">
                  To'liq ismingiz
                </label>
                <div className="relative">
                  <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-gray-800/50 border border-transparent focus:border-indigo-500 rounded-2xl outline-none transition-all"
                    placeholder="Ism sharif"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-400 ml-2">
                  Email manzil
                </label>
                <div className="relative">
                  <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-gray-800/50 border border-transparent focus:border-indigo-500 rounded-2xl outline-none transition-all"
                    placeholder="example@mail.com"
                  />
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-gray-100 dark:border-gray-800 space-y-6">
              <h4 className="font-black text-lg flex items-center gap-2">
                <FiLock className="text-rose-500" /> Xavfsizlik (Parolni
                o'zgartirish)
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <input
                  type="password"
                  placeholder="Joriy parol"
                  value={formData.currentPassword}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      currentPassword: e.target.value,
                    })
                  }
                  className="w-full px-4 py-4 bg-gray-50 dark:bg-gray-800/50 border border-transparent focus:border-rose-500 rounded-2xl outline-none transition-all"
                />
                <input
                  type="password"
                  placeholder="Yangi parol"
                  value={formData.newPassword}
                  onChange={(e) =>
                    setFormData({ ...formData, newPassword: e.target.value })
                  }
                  className="w-full px-4 py-4 bg-gray-50 dark:bg-gray-800/50 border border-transparent focus:border-indigo-500 rounded-2xl outline-none transition-all"
                />
                <input
                  type="password"
                  placeholder="Tasdiqlash"
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      confirmPassword: e.target.value,
                    })
                  }
                  className="w-full px-4 py-4 bg-gray-50 dark:bg-gray-800/50 border border-transparent focus:border-indigo-500 rounded-2xl outline-none transition-all"
                />
              </div>
            </div>

            {isEditing && (
              <button
                type="submit"
                className="w-full md:w-auto bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-12 py-4 rounded-2xl font-black shadow-xl shadow-indigo-500/20 hover:scale-105 active:scale-95 transition-all"
              >
                O'zgarishlarni Saqlash
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;