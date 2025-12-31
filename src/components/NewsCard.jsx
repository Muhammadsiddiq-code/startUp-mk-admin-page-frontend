import { useState } from "react";
import axios from "axios";
import { FiEdit, FiTrash2 } from "react-icons/fi";

const NewsCard = ({ news, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(news.title);
  const [description, setDescription] = useState(news.description);
  const [image, setImage] = useState(null);

  const date = new Date(news.createdAt);
  const formattedDate = date.toLocaleDateString("uz-UZ", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const handleDelete = async () => {
    if (window.confirm("Bu yangilikni o'chirishni xohlaysizmi?")) {
      try {
        await axios.delete(`http://localhost:5000/api/news/${news._id}`);
        onDelete(news._id);
      } catch (err) {
        alert("O'chirishda xatolik");
      }
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    if (image) formData.append("image", image);

    try {
      const res = await axios.put(
        `http://localhost:5000/api/news/${news._id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      onEdit(res.data);
      setIsEditing(false);
    } catch (err) {
      alert("Tahrirlashda xatolik");
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300">
      {news.image && (
        <img
          src={`http://localhost:5000${news.image}`}
          alt={news.title}
          className="w-full h-48 object-cover"
        />
      )}

      <div className="p-6">
        {isEditing ? (
          <form onSubmit={handleEdit} className="space-y-4">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
              required
            />
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="4"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
              required
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              className="w-full p-2 border rounded-lg"
            />
            <div className="flex gap-2">
              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
              >
                Saqlash
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg"
              >
                Bekor qilish
              </button>
            </div>
          </form>
        ) : (
          <>
            <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2">
              {news.title}
            </h3>
            <p className="text-gray-600 mb-4 line-clamp-3">
              {news.description}
            </p>
            <p className="text-sm text-gray-500 mb-4">
              Qo‘shilgan: {formattedDate}
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsEditing(true)}
                className="p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
                title="Tahrirlash"
              >
                <FiEdit size={20} />
              </button>
              <button
                onClick={handleDelete}
                className="p-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition"
                title="O'chirish"
              >
                <FiTrash2 size={20} />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default NewsCard;