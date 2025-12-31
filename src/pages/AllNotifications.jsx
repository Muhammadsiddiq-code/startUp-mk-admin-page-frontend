import { useSocket } from "../context/SocketContext";
import { FiArrowLeft } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const AllNotifications = () => {
  const { notifications } = useSocket();
  const navigate = useNavigate();

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("uz-UZ", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getIconAndColor = (type) => {
    if (type === "user") {
      return {
        icon: "👤",
        color: "bg-indigo-100 text-indigo-600 dark:bg-indigo-900/50",
      };
    }
    return {
      icon: "📰",
      color: "bg-purple-100 text-purple-600 dark:bg-purple-900/50",
    };
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex items-center gap-6 mb-10">
        <button
          onClick={() => navigate(-1)}
          className="p-4 bg-gray-100 dark:bg-gray-700 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition"
        >
          <FiArrowLeft size={28} />
        </button>
        <h1 className="text-5xl font-bold text-gray-800 dark:text-white">
          Barcha Bildirishnomalar
        </h1>
      </div>

      {notifications.length === 0 ? (
        <div className="text-center py-32">
          <p className="text-3xl text-gray-500 dark:text-gray-400">
            Hozircha bildirishnoma yo'q
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {notifications.map((notif, index) => {
            const { icon, color } = getIconAndColor(notif.type);
            return (
              <div
                key={index}
                className="glass-card p-8 flex items-start gap-6 hover:scale-105 transition-all duration-300"
              >
                <div className={`p-5 rounded-3xl text-3xl ${color}`}>
                  {icon}
                </div>
                <div className="flex-1">
                  <p className="text-2xl font-semibold text-gray-800 dark:text-white mb-3">
                    {notif.message}
                  </p>
                  <p className="text-lg text-gray-600 dark:text-gray-400 flex items-center gap-3">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    {formatDate(notif.createdAt)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AllNotifications;
