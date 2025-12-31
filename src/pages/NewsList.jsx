// import { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import {
//   FiEdit,
//   FiTrash2,
//   FiChevronLeft,
//   FiChevronRight,
// } from "react-icons/fi";
// import DeleteModal from "../components/DeleteModal";

// const NewsList = () => {
//   const navigate = useNavigate();
//   const [news, setNews] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Pagination
//   const [currentPage, setCurrentPage] = useState(1);
//   const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
//   const itemsPerPage = isMobile ? 6 : 9;

//   // Delete modal
//   const [deleteModal, setDeleteModal] = useState({
//     isOpen: false,
//     id: null,
//     title: "",
//   });

//   useEffect(() => {
//     const handleResize = () => setIsMobile(window.innerWidth < 768);
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   const fetchNews = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/api/news");
//       setNews(res.data);
//     } catch (error) {
//       alert("Yangiliklar yuklanmadi");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchNews();
//   }, []);

//   const totalPages = Math.ceil(news.length / itemsPerPage);
//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const currentNews = news.slice(startIndex, startIndex + itemsPerPage);

//   const handlePageChange = (page) => {
//     if (page < 1 || page > totalPages) return;
//     setCurrentPage(page);
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   const openDeleteModal = (id, title) => {
//     setDeleteModal({ isOpen: true, id, title: title || "yangilik" });
//   };

//   const closeDeleteModal = () => {
//     setDeleteModal({ isOpen: false, id: null, title: "" });
//   };

//   const handleDelete = async () => {
//     try {
//       await axios.delete(`http://localhost:5000/api/news/${deleteModal.id}`);
//       setNews((prev) => prev.filter((n) => n._id !== deleteModal.id));
//       closeDeleteModal();
//       if (currentNews.length === 1 && currentPage > 1) {
//         setCurrentPage((prev) => prev - 1);
//       }
//     } catch (error) {
//       alert("O'chirishda xatolik");
//     }
//   };

//   const formatDate = (date) =>
//     new Date(date).toLocaleDateString("uz-UZ", {
//       year: "numeric",
//       month: "long",
//       day: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//     });

//   return (
//     <div className="space-y-12 px-5">
//       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-8">
//         <h1 className="text-5xl font-bold text-gray-800 dark:text-white">
//           Barcha Yangiliklar ({news.length})
//         </h1>
//         <button
//           onClick={() => navigate("/add-news")}
//           className="btn-success flex items-center gap-4 text-xl px-10 py-5"
//         >
//           Yangi Yangilik
//         </button>
//       </div>

//       {loading ? (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {[1, 2, 3, 4, 5, 6].map((i) => (
//             <div key={i} className="glass-card animate-pulse">
//               <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded-3xl mb-6"></div>
//               <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
//               <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
//             </div>
//           ))}
//         </div>
//       ) : news.length === 0 ? (
//         <div className="text-center py-32">
//           <p className="text-4xl text-gray-500 dark:text-gray-400">
//             Hali yangilik qo'shilmagan
//           </p>
//         </div>
//       ) : (
//         <>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
//             {currentNews.map((item) => (
//               <div
//                 key={item._id}
//                 className=" group hover:scale-105 transition-all duration-500"
//               >
//                 {item.image ? (
//                   <img
//                     src={`http://localhost:5000${item.image}`}
//                     alt={item.title}
//                     className="w-full h-72 object-cover rounded-3xl mb-8 shadow-2xl group-hover:shadow-3xl transition-shadow"
//                   />
//                 ) : (
//                   <div className="w-full h-72 bg-gradient-to-br from-indigo-400 to-purple-600 rounded-3xl mb-8 flex items-center justify-center shadow-2xl">
//                     <svg
//                       className="w-32 h-32 text-white"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
//                       />
//                     </svg>
//                   </div>
//                 )}

//                 <h3 className="text-3xl font-bold text-gray-800 dark:text-white mb-4 line-clamp-2">
//                   {item.title}
//                 </h3>
//                 <p className="text-gray-600 dark:text-gray-300 mb-6 line-clamp-3 text-lg">
//                   {item.description}
//                 </p>
//                 <p className="text-gray-500 dark:text-gray-400 mb-8 flex items-center gap-3 text-lg">
//                   <svg
//                     className="w-6 h-6"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
//                     />
//                   </svg>
//                   {formatDate(item.createdAt)}
//                 </p>

//                 <div className="flex justify-end gap-6">
//                   <button
//                     onClick={() => navigate(`/add-news?id=${item._id}`)}
//                     className="p-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl shadow-xl hover:shadow-2xl transition"
//                   >
//                     <FiEdit size={24} />
//                   </button>
//                   <button
//                     onClick={() => openDeleteModal(item._id, item.title)}
//                     className="p-4 bg-red-600 hover:bg-red-700 text-white rounded-2xl shadow-xl hover:shadow-2xl transition"
//                   >
//                     <FiTrash2 size={24} />
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Pagination */}
//           {totalPages > 1 && (
//             <div className="flex justify-center items-center gap-4 mt-16">
//               <button
//                 onClick={() => handlePageChange(currentPage - 1)}
//                 disabled={currentPage === 1}
//                 className="p-5 bg-gray-200 dark:bg-gray-700 rounded-2xl disabled:opacity-50 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
//               >
//                 <FiChevronLeft size={28} />
//               </button>

//               {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
//                 <button
//                   key={p}
//                   onClick={() => handlePageChange(p)}
//                   className={`px-6 py-4 text-xl font-bold rounded-2xl transition ${
//                     p === currentPage
//                       ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-2xl"
//                       : "bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
//                   }`}
//                 >
//                   {p}
//                 </button>
//               ))}

//               <button
//                 onClick={() => handlePageChange(currentPage + 1)}
//                 disabled={currentPage === totalPages}
//                 className="p-5 bg-gray-200 dark:bg-gray-700 rounded-2xl disabled:opacity-50 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
//               >
//                 <FiChevronRight size={28} />
//               </button>
//             </div>
//           )}
//         </>
//       )}

//       {/* Delete Modal */}
//       <DeleteModal
//         isOpen={deleteModal.isOpen}
//         onClose={closeDeleteModal}
//         onConfirm={handleDelete}
//         itemName={deleteModal.title || "yangilik"}
//       />
//     </div>
//   );
// };

// export default NewsList;


















import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  FiEdit,
  FiTrash2,
  FiChevronLeft,
  FiChevronRight,
  FiPlus,
  FiClock,
  FiImage,
} from "react-icons/fi";
import DeleteModal from "../components/DeleteModal";

const NewsList = () => {
  const navigate = useNavigate();
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  // Pagination & Responsive settings
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const itemsPerPage = isMobile ? 6 : 9;

  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    id: null,
    title: "",
  });

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const fetchNews = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/news");
      // Eng oxirgi qo'shilganlarni birinchi ko'rsatish uchun sort qilamiz
      const sortedNews = res.data.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setNews(sortedNews);
    } catch (error) {
      console.error("Yangiliklar yuklanmadi");
      alert(error)
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const totalPages = Math.ceil(news.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentNews = news.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const openDeleteModal = (id, title) => {
    setDeleteModal({ isOpen: true, id, title: title || "yangilik" });
  };

  const closeDeleteModal = () => {
    setDeleteModal({ isOpen: false, id: null, title: "" });
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/news/${deleteModal.id}`);
      setNews((prev) => prev.filter((n) => n._id !== deleteModal.id));
      closeDeleteModal();
      if (currentNews.length === 1 && currentPage > 1) {
        setCurrentPage((prev) => prev - 1);
      }
    } catch (error) {
      alert("O'chirishda xatolik", error);
      
    }
  };

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("uz-UZ", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  return (
    <div className="min-h-screen pb-20 px-10 animate-fade-in">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12 px-2">
        <div>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tight">
            Yangiliklar{" "}
            <span className="text-indigo-600 dark:text-indigo-400">
              ({news.length})
            </span>
          </h1>
          <p className="text-lg text-gray-500 dark:text-gray-400 mt-2">
            Barcha yangiliklarni boshqarish va tahrirlash
          </p>
        </div>
        <button
          onClick={() => navigate("/add-news")}
          className="group flex items-center gap-3 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-2xl font-bold text-xl shadow-xl shadow-indigo-500/30 transition-all active:scale-95"
        >
          <FiPlus className="text-2xl group-hover:rotate-90 transition-transform" />
          Yangi Qo'shish
        </button>
      </div>

      {loading ? (
        /* Skeleton Loading */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="bg-white/50 dark:bg-gray-800/50 rounded-[2.5rem] p-6 animate-pulse border border-white/20"
            >
              <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded-[2rem] mb-6"></div>
              <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded-xl w-3/4 mb-4"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-xl w-full mb-2"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-xl w-2/3"></div>
            </div>
          ))}
        </div>
      ) : news.length === 0 ? (
        <div className="text-center py-40 bg-white/30 dark:bg-gray-800/30 rounded-[3rem] backdrop-blur-md border border-dashed border-gray-300 dark:border-gray-700">
          <FiImage className="mx-auto text-8xl text-gray-300 dark:text-gray-600 mb-6" />
          <p className="text-3xl font-bold text-gray-400 dark:text-gray-500">
            Hozircha yangiliklar yo'q
          </p>
        </div>
      ) : (
        <>
          {/* News Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {currentNews.map((item) => (
              <div
                key={item._id}
                className="group relative bg-white/80 dark:bg-gray-800/60 backdrop-blur-xl rounded-[2.5rem] p-5 border border-white/20 dark:border-gray-700/30 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] transition-all duration-500 hover:-translate-y-2 flex flex-col"
              >
                {/* Image Wrapper */}
                <div className="relative h-64 w-full mb-6 overflow-hidden rounded-[2rem] shadow-inner">
                  {item.image ? (
                    <img
                      src={`http://localhost:5000${item.image}`}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                      <FiImage size={64} className="text-white/20" />
                    </div>
                  )}
                  {/* Badge */}
                  <div className="absolute top-4 left-4 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md px-4 py-2 rounded-full text-xs font-black uppercase tracking-wider text-indigo-600 dark:text-indigo-400 shadow-lg">
                    Yangilik
                  </div>
                </div>

                {/* Content */}
                <div className="px-2 flex-1 flex flex-col">
                  <h3 className="text-2xl font-black text-gray-800 dark:text-white mb-3 line-clamp-2 leading-tight group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 mb-6 line-clamp-3 text-base flex-1">
                    {item.description}
                  </p>

                  <div className="flex items-center justify-between mt-auto pt-6 border-t border-gray-100 dark:border-gray-700/50">
                    <div className="flex items-center gap-2 text-gray-400 dark:text-gray-500 text-sm font-medium">
                      <FiClock />
                      {formatDate(item.createdAt)}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                      <button
                        onClick={() => navigate(`/add-news?id=${item._id}`)}
                        className="p-3 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-xl hover:bg-blue-600 hover:text-white transition-all duration-300 shadow-sm"
                        title="Tahrirlash"
                      >
                        <FiEdit size={20} />
                      </button>
                      <button
                        onClick={() => openDeleteModal(item._id, item.title)}
                        className="p-3 bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400 rounded-xl hover:bg-rose-600 hover:text-white transition-all duration-300 shadow-sm"
                        title="O'chirish"
                      >
                        <FiTrash2 size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Section */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-3 mt-20">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-4 bg-white/50 dark:bg-gray-800/50 border border-white/20 rounded-2xl disabled:opacity-30 hover:bg-indigo-600 hover:text-white transition-all shadow-md active:scale-90"
              >
                <FiChevronLeft size={24} />
              </button>

              <div className="flex gap-2 px-4 py-2 bg-white/30 dark:bg-gray-800/30 backdrop-blur-md rounded-3xl border border-white/20">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (p) => (
                    <button
                      key={p}
                      onClick={() => handlePageChange(p)}
                      className={`w-12 h-12 text-lg font-black rounded-xl transition-all duration-300 ${
                        p === currentPage
                          ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/40 rotate-12"
                          : "hover:bg-indigo-50 dark:hover:bg-indigo-900/30 text-gray-500"
                      }`}
                    >
                      {p}
                    </button>
                  )
                )}
              </div>

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-4 bg-white/50 dark:bg-gray-800/50 border border-white/20 rounded-2xl disabled:opacity-30 hover:bg-indigo-600 hover:text-white transition-all shadow-md active:scale-90"
              >
                <FiChevronRight size={24} />
              </button>
            </div>
          )}
        </>
      )}

      {/* Delete Modal Component */}
      <DeleteModal
        isOpen={deleteModal.isOpen}
        onClose={closeDeleteModal}
        onConfirm={handleDelete}
        itemName={deleteModal.title}
      />
    </div>
  );
};

export default NewsList;