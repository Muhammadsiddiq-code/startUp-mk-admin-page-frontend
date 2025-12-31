// import { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate, useSearchParams } from "react-router-dom";

// const AddNews = () => {
//   const navigate = useNavigate();
//   const [searchParams] = useSearchParams();
//   const editId = searchParams.get("id");

//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [createdAt, setCreatedAt] = useState(""); // yangi: sana state
//   const [image, setImage] = useState(null);
//   const [preview, setPreview] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");

//   // Edit rejimida yangilikni yuklash
//   useEffect(() => {
//     if (editId) {
//       axios
//         .get("http://localhost:5000/api/news")
//         .then((res) => {
//           const newsItem = res.data.find((n) => n._id === editId);
//           if (newsItem) {
//             setTitle(newsItem.title);
//             setDescription(newsItem.description);
//             // Sana formatini input uchun to'g'rilash (YYYY-MM-DDTHH:MM)
//             const date = new Date(newsItem.createdAt);
//             const formattedDate = date.toISOString().slice(0, 16);
//             setCreatedAt(formattedDate);
//             setPreview(
//               newsItem.image ? `http://localhost:5000${newsItem.image}` : null
//             );
//           }
//         })
//         .catch(() => setMessage("Yangilik yuklanmadi"));
//     } else {
//       // Yangi qo'shishda bugungi sana
//       const today = new Date().toISOString().slice(0, 16);
//       setCreatedAt(today);
//     }
//   }, [editId]);

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setImage(file);
//       setPreview(URL.createObjectURL(file));
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setMessage("");

//     const formData = new FormData();
//     formData.append("title", title);
//     formData.append("description", description);
//     formData.append("createdAt", new Date(createdAt).toISOString()); // ISO formatda yuboramiz
//     if (image) formData.append("image", image);

//     try {
//       if (editId) {
//         await axios.put(`http://localhost:5000/api/news/${editId}`, formData, {
//           headers: { "Content-Type": "multipart/form-data" },
//         });
//         setMessage("Yangilik muvaffaqiyatli yangilandi!");
//       } else {
//         await axios.post("http://localhost:5000/api/news", formData, {
//           headers: { "Content-Type": "multipart/form-data" },
//         });
//         setMessage("Yangilik muvaffaqiyatli qo'shildi!");
//       }
//       setTimeout(() => navigate("/news"), 2000);
//     } catch (err) {
//       setMessage("Xatolik: " + (err.response?.data?.message || "Saqlanmadi"));
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-5xl mx-auto space-y-12">
//       <h1 className="text-5xl font-bold text-center text-gray-800 dark:text-white">
//         {editId ? "Yangilikni Tahrirlash" : "Yangi Yangilik Qo‘shish"}
//       </h1>

//       <div className="card">
//         {message && (
//           <p
//             className={`text-center text-2xl font-bold py-6 rounded-xl mb-10 ${
//               message.includes("muvaffaqiyatli")
//                 ? "text-green-600 bg-green-50 dark:bg-green-900/30"
//                 : "text-red-600 bg-red-50 dark:bg-red-900/30"
//             }`}
//           >
//             {message}
//           </p>
//         )}

//         <form onSubmit={handleSubmit} className="space-y-12">
//           {/* Sana input */}
//           <div>
//             <label className="block text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-6">
//               Qo'shilgan sana va vaqt
//             </label>
//             <input
//               type="datetime-local"
//               value={createdAt}
//               onChange={(e) => setCreatedAt(e.target.value)}
//               required
//               className="input text-xl"
//             />
//             <p className="text-lg text-gray-600 dark:text-gray-400 mt-4">
//               Siz xohlagan sanani tanlashingiz mumkin (masalan, eski yangilik
//               uchun orqaga sana qo'yish)
//             </p>
//           </div>

//           <div>
//             <label className="block text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-6">
//               Sarlavha
//             </label>
//             <input
//               type="text"
//               value={title}
//               onChange={(e) => setTitle(e.target.value)}
//               required
//               className="input text-xl"
//               placeholder="Yangilik sarlavhasini kiriting..."
//             />
//           </div>

//           <div>
//             <label className="block text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-6">
//               Matn (tavsif)
//             </label>
//             <textarea
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//               required
//               rows="10"
//               className="input text-xl resize-none"
//               placeholder="Yangilik haqida batafsil yozing..."
//             />
//           </div>

//           <div>
//             <label className="block text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-6">
//               Rasm yuklash (ixtiyoriy)
//             </label>
//             <div className="border-4 border-dashed border-gray-300 dark:border-gray-600 rounded-3xl p-12 text-center hover:border-indigo-500 dark:hover:border-indigo-400 transition">
//               {preview ? (
//                 <div className="space-y-6">
//                   <img
//                     src={preview}
//                     alt="Tanlangan rasm"
//                     className="mx-auto max-h-96 rounded-2xl shadow-2xl"
//                   />
//                   <p className="text-xl text-gray-600 dark:text-gray-400">
//                     Yangi rasm tanlash uchun quyidagi tugmani bosing
//                   </p>
//                 </div>
//               ) : (
//                 <div className="space-y-6">
//                   <svg
//                     className="mx-auto w-24 h-24 text-gray-400"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
//                     />
//                   </svg>
//                   <p className="text-2xl text-gray-600 dark:text-gray-400">
//                     Rasm yuklash uchun quyidagi tugmani bosing
//                   </p>
//                 </div>
//               )}
//               <input
//                 type="file"
//                 accept="image/*"
//                 onChange={handleImageChange}
//                 className="mt-8 file:btn-primary file:text-xl file:py-4 file:px-10 file:cursor-pointer"
//               />
//             </div>
//           </div>

//           <div className="flex flex-col sm:flex-row gap-8 justify-center">
//             <button
//               type="button"
//               onClick={() => navigate("/news")}
//               className="btn-danger text-2xl px-16 py-6"
//             >
//               Bekor qilish
//             </button>
//             <button
//               type="submit"
//               disabled={loading}
//               className="btn-success text-2xl px-16 py-6"
//             >
//               {loading ? "Saqlanmoqda..." : editId ? "Yangilash" : "Qo‘shish"}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AddNews;






















import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  FiCalendar,
  FiType,
  FiFileText,
  FiUploadCloud,
  FiXCircle,
  FiCheckCircle,
} from "react-icons/fi";

const AddNews = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const editId = searchParams.get("id");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (editId) {
      axios
        .get("http://localhost:5000/api/news")
        .then((res) => {
          const newsItem = res.data.find((n) => n._id === editId);
          if (newsItem) {
            setTitle(newsItem.title);
            setDescription(newsItem.description);
            const date = new Date(newsItem.createdAt);
            const formattedDate = date.toISOString().slice(0, 16);
            setCreatedAt(formattedDate);
            setPreview(
              newsItem.image ? `http://localhost:5000${newsItem.image}` : null
            );
          }
        })
        .catch(() => setMessage("Yangilik yuklanmadi"));
    } else {
      const today = new Date().toISOString().slice(0, 16);
      setCreatedAt(today);
    }
  }, [editId]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("createdAt", new Date(createdAt).toISOString());
    if (image) formData.append("image", image);

    try {
      if (editId) {
        await axios.put(`http://localhost:5000/api/news/${editId}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setMessage("success:Yangilik muvaffaqiyatli yangilandi!");
      } else {
        await axios.post("http://localhost:5000/api/news", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setMessage("success:Yangilik muvaffaqiyatli qo'shildi!");
      }
      setTimeout(() => navigate("/news"), 2000);
    } catch (err) {
      setMessage(
        "error:Xatolik: " + (err.response?.data?.message || "Saqlanmadi")
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-6 md:p-12 bg-gray-50 dark:bg-[#0f172a] transition-colors duration-500">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600">
            {editId ? "Yangilikni Tahrirlash" : "Yangi Yangilik"}
          </h1>
          <p className="text-lg text-gray-500 dark:text-gray-400">
            Platformangiz uchun eng so'nggi xabarlarni joylang
          </p>
        </div>

        {/* Status Message */}
        {message && (
          <div
            className={`mb-8 p-6 rounded-3xl flex items-center gap-4 animate-bounce-short ${
              message.startsWith("success")
                ? "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 border border-emerald-200"
                : "bg-rose-50 dark:bg-rose-900/20 text-rose-600 border border-rose-200"
            }`}
          >
            {message.startsWith("success") ? (
              <FiCheckCircle size={30} />
            ) : (
              <FiXCircle size={30} />
            )}
            <span className="text-xl font-bold">{message.split(":")[1]}</span>
          </div>
        )}

        {/* Main Form Card */}
        <div className="bg-white/80 dark:bg-gray-800/50 backdrop-blur-2xl p-8 md:p-12 rounded-[3rem] shadow-2xl border border-white/20 dark:border-gray-700/30 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full -mr-16 -mt-16 blur-3xl"></div>

          <form onSubmit={handleSubmit} className="space-y-10 relative z-10">
            {/* Date Input */}
            <div className="group">
              <label className="flex items-center gap-3 text-xl font-bold text-gray-700 dark:text-gray-300 mb-4">
                <FiCalendar className="text-indigo-500" /> Sana va vaqt
              </label>
              <input
                type="datetime-local"
                value={createdAt}
                onChange={(e) => setCreatedAt(e.target.value)}
                required
                className="w-full px-6 py-5 bg-gray-100 dark:bg-gray-900/50 border-2 border-transparent focus:border-indigo-500 rounded-2xl outline-none transition-all text-lg font-medium"
              />
            </div>

            {/* Title Input */}
            <div className="group">
              <label className="flex items-center gap-3 text-xl font-bold text-gray-700 dark:text-gray-300 mb-4">
                <FiType className="text-indigo-500" /> Sarlavha
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                placeholder="Yangilik sarlavhasini kiriting..."
                className="w-full px-6 py-5 bg-gray-100 dark:bg-gray-900/50 border-2 border-transparent focus:border-indigo-500 rounded-2xl outline-none transition-all text-lg font-medium"
              />
            </div>

            {/* Description Textarea */}
            <div className="group">
              <label className="flex items-center gap-3 text-xl font-bold text-gray-700 dark:text-gray-300 mb-4">
                <FiFileText className="text-indigo-500" /> Batafsil matn
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                rows="8"
                placeholder="Yangilik mazmunini shu yerga yozing..."
                className="w-full px-6 py-5 bg-gray-100 dark:bg-gray-900/50 border-2 border-transparent focus:border-indigo-500 rounded-3xl outline-none transition-all text-lg font-medium resize-none"
              />
            </div>

            {/* Image Upload Area */}
            <div>
              <label className="flex items-center gap-3 text-xl font-bold text-gray-700 dark:text-gray-300 mb-4">
                <FiUploadCloud className="text-indigo-500" /> Muqova rasmi
              </label>
              <div className="relative border-4 border-dashed border-gray-200 dark:border-gray-700 rounded-[2.5rem] p-4 group-hover:border-indigo-400 transition-colors">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                />
                <div className="py-12 text-center">
                  {preview ? (
                    <div className="relative inline-block">
                      <img
                        src={preview}
                        alt="Preview"
                        className="max-h-80 rounded-[2rem] shadow-2xl border-4 border-white dark:border-gray-700 object-cover"
                      />
                      <div className="absolute inset-0 bg-black/20 rounded-[2rem] opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="text-white font-bold bg-black/40 px-4 py-2 rounded-full">
                          Rasmni o'zgartirish
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="mx-auto w-24 h-24 bg-indigo-50 dark:bg-indigo-900/30 rounded-full flex items-center justify-center text-indigo-500">
                        <FiUploadCloud size={48} />
                      </div>
                      <p className="text-2xl font-semibold text-gray-500">
                        Rasm yuklash uchun bosing yoki sudrab keling
                      </p>
                      <p className="text-gray-400">
                        PNG, JPG yoki WEBP (Max: 5MB)
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex flex-col md:flex-row gap-6 pt-8">
              <button
                type="button"
                onClick={() => navigate("/news")}
                className="flex-1 py-5 rounded-2xl text-xl font-bold bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all active:scale-95"
              >
                Bekor qilish
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-[2] py-5 rounded-2xl text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-xl shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:-translate-y-1 transition-all active:scale-95 disabled:opacity-70"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-3">
                    <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                    Saqlanmoqda...
                  </span>
                ) : editId ? (
                  "O'zgarishlarni Saqlash"
                ) : (
                  "Yangilikni Chop Etish"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddNews;