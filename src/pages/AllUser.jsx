// import { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { FiPlus, FiEdit, FiTrash2, FiUser, FiSearch } from "react-icons/fi";
// import DeleteModal from "../components/DeleteModal"; // Modal komponent

// const AllUsers = () => {
//   const navigate = useNavigate();
//   const [users, setUsers] = useState([]);
//   const [filteredUsers, setFilteredUsers] = useState([]);
//   const [showForm, setShowForm] = useState(false);
//   const [editingUser, setEditingUser] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const [searchQuery, setSearchQuery] = useState("");
//   const [roleFilter, setRoleFilter] = useState("all");

//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     role: "user",
//   });

//   // Delete modal state
//   const [deleteModal, setDeleteModal] = useState({
//     isOpen: false,
//     id: null,
//     name: "",
//   });

//   const getAuthHeaders = () => {
//     const token = localStorage.getItem("token");
//     return token ? { headers: { Authorization: `Bearer ${token}` } } : {};
//   };

//   const fetchUsers = async () => {
//     setLoading(true);
//     try {
//       const res = await axios.get(
//         "http://localhost:5000/api/users",
//         getAuthHeaders()
//       );
//       setUsers(res.data);
//       setFilteredUsers(res.data);
//     } catch (err) {
//       alert(err.response?.data?.message || "Foydalanuvchilar yuklanmadi");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   // Qidiruv va filtr
//   useEffect(() => {
//     let result = users;

//     if (searchQuery.trim()) {
//       const query = searchQuery.toLowerCase();
//       result = result.filter(
//         (u) =>
//           u.name.toLowerCase().includes(query) ||
//           u.email.toLowerCase().includes(query)
//       );
//     }

//     if (roleFilter !== "all") {
//       result = result.filter((u) => u.role === roleFilter);
//     }

//     setFilteredUsers(result);
//   }, [searchQuery, roleFilter, users]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       if (editingUser) {
//         const res = await axios.put(
//           `http://localhost:5000/api/users/${editingUser._id}`,
//           formData,
//           getAuthHeaders()
//         );
//         setUsers(users.map((u) => (u._id === editingUser._id ? res.data : u)));
//       } else {
//         const res = await axios.post(
//           "http://localhost:5000/api/users",
//           formData,
//           getAuthHeaders()
//         );
//         setUsers([...users, res.data]);
//       }

//       setShowForm(false);
//       setEditingUser(null);
//       setFormData({ name: "", email: "", password: "", role: "user" });
//     } catch (err) {
//       alert(err.response?.data?.message || "Xatolik");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleEdit = (user) => {
//     setEditingUser(user);
//     setFormData({
//       name: user.name,
//       email: user.email,
//       password: "",
//       role: user.role || "user",
//     });
//     setShowForm(true);
//   };

//   const openDeleteModal = (id, name) => {
//     setDeleteModal({ isOpen: true, id, name });
//   };

//   const closeDeleteModal = () => {
//     setDeleteModal({ isOpen: false, id: null, name: "" });
//   };

//   const handleDelete = async () => {
//     try {
//       await axios.delete(
//         `http://localhost:5000/api/users/${deleteModal.id}`,
//         getAuthHeaders()
//       );
//       setUsers(users.filter((u) => u._id !== deleteModal.id));
//       closeDeleteModal();
//     } catch (err) {
//       alert("O'chirishda xatolik");
//       console.log(err)
//     }
//   };

//   const cancelForm = () => {
//     setShowForm(false);
//     setEditingUser(null);
//     setFormData({ name: "", email: "", password: "", role: "user" });
//   };

//   return (
//     <div className="space-y-12">
//       {/* Sarlavha */}
//       <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
//         <h1 className="text-5xl font-bold text-gray-800 dark:text-white">
//           Barcha Foydalanuvchilar ({filteredUsers.length})
//         </h1>
//         <button
//           onClick={() => setShowForm(true)}
//           className="btn-success flex items-center gap-4 text-xl px-10 py-5"
//         >
//           <FiPlus size={28} />
//           Yangi Foydalanuvchi
//         </button>
//       </div>

//       {/* Qidiruv va Filtr */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//         <div className="relative">
//           <FiSearch className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-500 text-2xl" />
//           <input
//             type="text"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             placeholder="Ism yoki email bo'yicha qidirish..."
//             className="input pl-16 text-xl"
//           />
//         </div>

//         <select
//           value={roleFilter}
//           onChange={(e) => setRoleFilter(e.target.value)}
//           className="input text-xl"
//         >
//           <option value="all">Barchasi</option>
//           <option value="admin">Admin</option>
//           <option value="user">User</option>
//         </select>
//       </div>

//       {/* Forma */}
//       {showForm && (
//         <div className="glass-card">
//           <h3 className="text-4xl font-bold text-center mb-12">
//             {editingUser ? "Tahrirlash" : "Yangi Foydalanuvchi"}
//           </h3>

//           <form
//             onSubmit={handleSubmit}
//             className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto"
//           >
//             <div>
//               <label className="block text-2xl font-semibold mb-5">Ism</label>
//               <input
//                 type="text"
//                 value={formData.name}
//                 onChange={(e) =>
//                   setFormData({ ...formData, name: e.target.value })
//                 }
//                 required
//                 className="input text-xl"
//               />
//             </div>
//             <div>
//               <label className="block text-2xl font-semibold mb-5">Email</label>
//               <input
//                 type="email"
//                 value={formData.email}
//                 onChange={(e) =>
//                   setFormData({ ...formData, email: e.target.value })
//                 }
//                 required
//                 className="input text-xl"
//               />
//             </div>
//             <div>
//               <label className="block text-2xl font-semibold mb-5">
//                 Parol {editingUser && "(bo'sh qoldirsangiz o'zgarmaydi)"}
//               </label>
//               <input
//                 type="password"
//                 value={formData.password}
//                 onChange={(e) =>
//                   setFormData({ ...formData, password: e.target.value })
//                 }
//                 required={!editingUser}
//                 className="input text-xl"
//               />
//             </div>
//             <div>
//               <label className="block text-2xl font-semibold mb-5">Rol</label>
//               <select
//                 value={formData.role}
//                 onChange={(e) =>
//                   setFormData({ ...formData, role: e.target.value })
//                 }
//                 className="input text-xl"
//               >
//                 <option value="user">User</option>
//                 <option value="admin">Admin</option>
//               </select>
//             </div>

//             <div className="md:col-span-2 flex flex-col sm:flex-row gap-8 justify-center">
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="btn-success text-2xl px-16 py-6"
//               >
//                 {loading
//                   ? "Saqlanmoqda..."
//                   : editingUser
//                   ? "Yangilash"
//                   : "Qo'shish"}
//               </button>
//               <button
//                 type="button"
//                 onClick={cancelForm}
//                 className="btn-danger text-2xl px-16 py-6"
//               >
//                 Bekor qilish
//               </button>
//             </div>
//           </form>
//         </div>
//       )}

//       {/* Ro'yxat */}
//       {loading ? (
//         <div className="text-center py-32 text-3xl text-gray-500">
//           Yuklanmoqda...
//         </div>
//       ) : filteredUsers.length === 0 ? (
//         <div className="text-center py-32">
//           <p className="text-4xl text-gray-500 dark:text-gray-400">
//             {searchQuery || roleFilter !== "all"
//               ? "Hech narsa topilmadi"
//               : "Hali foydalanuvchi yo'q"}
//           </p>
//         </div>
//       ) : (
//         <>
//           {/* Desktop */}
//           <div className="hidden md:block glass-card overflow-x-auto">
//             <table className="w-full">
//               <thead className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
//                 <tr>
//                   <th className="p-8 text-left text-xl">Ism</th>
//                   <th className="p-8 text-left text-xl">Email</th>
//                   <th className="p-8 text-left text-xl">Rol</th>
//                   <th className="p-8 text-center text-xl">Amallar</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {filteredUsers.map((user) => (
//                   <tr
//                     key={user._id}
//                     className="border-b hover:bg-white/50 dark:hover:bg-gray-700/50 transition"
//                   >
//                     <td className="p-8 text-lg font-medium">{user.name}</td>
//                     <td className="p-8 text-lg text-gray-600 dark:text-gray-400">
//                       {user.email}
//                     </td>
//                     <td className="p-8">
//                       <span
//                         className={`px-6 py-3 rounded-full text-lg font-bold ${
//                           user.role === "admin"
//                             ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
//                             : "bg-gradient-to-r from-blue-500 to-cyan-500 text-white"
//                         }`}
//                       >
//                         {user.role.toUpperCase()}
//                       </span>
//                     </td>
//                     <td className="p-8">
//                       <div className="flex justify-center gap-6">
//                         <button
//                           onClick={() => navigate(`/user-profile/${user._id}`)}
//                           className="p-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl shadow-lg hover:shadow-xl transition"
//                           title="Profil"
//                         >
//                           <FiUser size={24} />
//                         </button>
//                         <button
//                           onClick={() => handleEdit(user)}
//                           className="p-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl shadow-lg hover:shadow-xl transition"
//                           title="Tahrirlash"
//                         >
//                           <FiEdit size={24} />
//                         </button>
//                         <button
//                           onClick={() => openDeleteModal(user._id, user.name)}
//                           className="p-4 bg-red-600 hover:bg-red-700 text-white rounded-2xl shadow-lg hover:shadow-xl transition"
//                           title="O'chirish"
//                         >
//                           <FiTrash2 size={24} />
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>

//           {/* Mobile */}
//           <div className="block md:hidden space-y-8">
//             {filteredUsers.map((user) => (
//               <div
//                 key={user._id}
//                 className="glass-card hover:scale-105 transition-all duration-300"
//               >
//                 <div className="flex justify-between items-start mb-8">
//                   <div>
//                     <h3 className="text-3xl font-bold">{user.name}</h3>
//                     <p className="text-xl text-gray-600 dark:text-gray-400 mt-3">
//                       {user.email}
//                     </p>
//                   </div>
//                   <span
//                     className={`px-6 py-3 rounded-full text-lg font-bold ${
//                       user.role === "admin"
//                         ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
//                         : "bg-gradient-to-r from-blue-500 to-cyan-500 text-white"
//                     }`}
//                   >
//                     {user.role.toUpperCase()}
//                   </span>
//                 </div>

//                 <div className="flex justify-center gap-8">
//                   <button
//                     onClick={() => navigate(`/user-profile/${user._id}`)}
//                     className="p-5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl shadow-2xl"
//                   >
//                     <FiUser size={28} />
//                   </button>
//                   <button
//                     onClick={() => handleEdit(user)}
//                     className="p-5 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl shadow-2xl"
//                   >
//                     <FiEdit size={28} />
//                   </button>
//                   <button
//                     onClick={() => openDeleteModal(user._id, user.name)}
//                     className="p-5 bg-red-600 hover:bg-red-700 text-white rounded-2xl shadow-2xl"
//                   >
//                     <FiTrash2 size={28} />
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </>
//       )}

//       {/* Delete Modal */}
//       <DeleteModal
//         isOpen={deleteModal.isOpen}
//         onClose={closeDeleteModal}
//         onConfirm={handleDelete}
//         itemName={deleteModal.name || "foydalanuvchi"}
//       />
//     </div>
//   );
// };

// export default AllUsers;

























import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  FiPlus,
  FiEdit,
  FiTrash2,
  FiUser,
  FiSearch,
  FiFilter,
} from "react-icons/fi";
import DeleteModal from "../components/DeleteModal";

const AllUsers = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    id: null,
    name: "",
  });

  const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return token ? { headers: { Authorization: `Bearer ${token}` } } : {};
  };

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        "http://localhost:5000/api/users",
        getAuthHeaders()
      );
      setUsers(res.data);
      setFilteredUsers(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    let result = users;
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (u) =>
          u.name.toLowerCase().includes(query) ||
          u.email.toLowerCase().includes(query)
      );
    }
    if (roleFilter !== "all") {
      result = result.filter((u) => u.role === roleFilter);
    }
    setFilteredUsers(result);
  }, [searchQuery, roleFilter, users]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editingUser) {
        const res = await axios.put(
          `http://localhost:5000/api/users/${editingUser._id}`,
          formData,
          getAuthHeaders()
        );
        setUsers(users.map((u) => (u._id === editingUser._id ? res.data : u)));
      } else {
        const res = await axios.post(
          "http://localhost:5000/api/users",
          formData,
          getAuthHeaders()
        );
        setUsers([...users, res.data]);
      }
      cancelForm();
    } catch (err) {
      alert("Xatolik yuz berdi");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      password: "",
      role: user.role || "user",
    });
    setShowForm(true);
  };

  const cancelForm = () => {
    setShowForm(false);
    setEditingUser(null);
    setFormData({ name: "", email: "", password: "", role: "user" });
  };

  const openDeleteModal = (id, name) =>
    setDeleteModal({ isOpen: true, id, name });
  const closeDeleteModal = () =>
    setDeleteModal({ isOpen: false, id: null, name: "" });

  const handleDelete = async () => {
    try {
      await axios.delete(
        `http://localhost:5000/api/users/${deleteModal.id}`,
        getAuthHeaders()
      );
      setUsers(users.filter((u) => u._id !== deleteModal.id));
      closeDeleteModal();
    } catch (err) {
      alert("O'chirishda xatolik");
    }
  };

  return (
    <div className="min-h-screen p-4 md:p-8 text-gray-800 dark:text-gray-100 transition-colors duration-500">
      {/* --- HEADER SECTION --- */}
      <div className="max-w-7xl px-5 mx-auto mb-12 flex flex-col md:flex-row justify-between items-center gap-6 animate-fade-in">
        <div>
          <h1 className="text-4xl md:text-6xl font-black bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
            Foydalanuvchilar
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2 text-lg font-medium">
            Jami:{" "}
            <span className="text-indigo-500">{filteredUsers.length} ta</span>{" "}
            faol profil
          </p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="group relative px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold text-xl shadow-[0_10px_20px_rgba(79,70,229,0.3)] transition-all hover:-translate-y-1 active:scale-95 flex items-center gap-3"
        >
          <FiPlus className="text-2xl group-hover:rotate-90 transition-transform" />
          Yangi qo'shish
        </button>
      </div>

      {/* --- FILTER & SEARCH --- */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="md:col-span-2 relative group">
          <FiSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 text-2xl group-focus-within:text-indigo-500 transition-colors" />
          <input
            type="text"
            placeholder="Ism yoki email bo'yicha qidirish..."
            className="w-full pl-14 pr-6 py-5 bg-white/50 dark:bg-gray-800/50 backdrop-blur-xl border-2 border-transparent focus:border-indigo-500 rounded-3xl outline-none shadow-lg transition-all text-lg"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="relative">
          <FiFilter className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 text-2xl" />
          <select
            className="w-full pl-14 pr-6 py-5 bg-white/50 dark:bg-gray-800/50 backdrop-blur-xl border-2 border-transparent focus:border-indigo-500 rounded-3xl outline-none shadow-lg appearance-none text-lg cursor-pointer"
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
          >
            <option value="all">Barcha rollar</option>
            <option value="admin">Adminlar</option>
            <option value="user">Foydalanuvchilar</option>
          </select>
        </div>
      </div>

      {/* --- FORM (MODAL STYLE) --- */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white dark:bg-gray-900 w-full max-w-2xl rounded-[2.5rem] p-10 shadow-2xl border border-white/20 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-indigo-500 to-pink-500"></div>
            <h3 className="text-3xl font-bold mb-8 text-center">
              {editingUser ? "Profilni tahrirlash" : "Yangi foydalanuvchi"}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input
                  placeholder="Ism"
                  className="w-full px-6 py-4 bg-gray-100 dark:bg-gray-800 rounded-2xl outline-none focus:ring-2 ring-indigo-500 transition-all"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                />
                <input
                  placeholder="Email"
                  type="email"
                  className="w-full px-6 py-4 bg-gray-100 dark:bg-gray-800 rounded-2xl outline-none focus:ring-2 ring-indigo-500 transition-all"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                />
                <input
                  placeholder="Parol"
                  type="password"
                  className="w-full px-6 py-4 bg-gray-100 dark:bg-gray-800 rounded-2xl outline-none focus:ring-2 ring-indigo-500 transition-all"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  required={!editingUser}
                />
                <select
                  className="w-full px-6 py-4 bg-gray-100 dark:bg-gray-800 rounded-2xl outline-none focus:ring-2 ring-indigo-500 transition-all"
                  value={formData.role}
                  onChange={(e) =>
                    setFormData({ ...formData, role: e.target.value })
                  }
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  className="flex-1 py-4 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-500/30"
                >
                  {loading ? "Saqlanmoqda..." : "Tasdiqlash"}
                </button>
                <button
                  type="button"
                  onClick={cancelForm}
                  className="flex-1 py-4 bg-gray-200 dark:bg-gray-700 rounded-2xl font-bold hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                >
                  Bekor qilish
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- TABLE / CARDS --- */}
      <div className="max-w-7xl mx-auto">
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredUsers.map((user) => (
              <div
                key={user._id}
                className="group relative bg-white/70 dark:bg-gray-800/50 backdrop-blur-md p-8 rounded-[2rem] border border-white/20 dark:border-gray-700/30 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden"
              >
                <div
                  className={`absolute top-0 right-0 px-6 py-2 rounded-bl-2xl font-bold text-xs uppercase tracking-widest text-white shadow-lg ${
                    user.role === "admin"
                      ? "bg-gradient-to-r from-purple-600 to-pink-600"
                      : "bg-gradient-to-r from-blue-600 to-cyan-600"
                  }`}
                >
                  {user.role}
                </div>

                <div className="flex items-center gap-5 mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900 dark:to-purple-900 flex items-center justify-center text-indigo-600 dark:text-indigo-300 text-3xl font-bold">
                    {user.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold truncate max-w-[150px]">
                      {user.name}
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400 text-sm truncate max-w-[180px]">
                      {user.email}
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 pt-4 border-t border-gray-100 dark:border-gray-700">
                  <button
                    onClick={() => navigate(`/user-profile/${user._id}`)}
                    className="flex-1 flex justify-center py-3 rounded-xl bg-gray-100 dark:bg-gray-700 hover:bg-indigo-500 hover:text-white transition-all"
                  >
                    <FiUser size={20} />
                  </button>
                  <button
                    onClick={() => handleEdit(user)}
                    className="flex-1 flex justify-center py-3 rounded-xl bg-gray-100 dark:bg-gray-700 hover:bg-blue-500 hover:text-white transition-all"
                  >
                    <FiEdit size={20} />
                  </button>
                  <button
                    onClick={() => openDeleteModal(user._id, user.name)}
                    className="flex-1 flex justify-center py-3 rounded-xl bg-gray-100 dark:bg-gray-700 hover:bg-red-500 hover:text-white transition-all"
                  >
                    <FiTrash2 size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <DeleteModal
        isOpen={deleteModal.isOpen}
        onClose={closeDeleteModal}
        onConfirm={handleDelete}
        itemName={deleteModal.name}
      />
    </div>
  );
};

export default AllUsers;  