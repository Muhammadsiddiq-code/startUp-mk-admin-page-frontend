import { useState, useEffect } from "react";
import { FiTrash2, FiX } from "react-icons/fi";

const DeleteModal = ({
  isOpen,
  onClose,
  onConfirm,
  itemName = "bu element",
}) => {
  const [countdown, setCountdown] = useState(7);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (isOpen && !isDeleting) {
      setCountdown(7);
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            handleAutoDelete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [isOpen, isDeleting]);

  const handleAutoDelete = () => {
    setIsDeleting(true);
    onConfirm();
    setTimeout(() => {
      onClose();
      setIsDeleting(false);
    }, 800);
  };

  const handleImmediateDelete = () => {
    setIsDeleting(true);
    onConfirm();
    setTimeout(() => {
      onClose();
      setIsDeleting(false);
    }, 800);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed min-w-full min-h-full inset-0 bg-black/60 backdrop-blur-sm z-50"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed  inset-0 z-50 flex items-center justify-center p-4">
        <div
          className="glass-card w-full max-w-md p-8 animate-in fade-in zoom-in-95 duration-300"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-3xl font-bold text-red-600 flex items-center gap-4">
              <FiTrash2 size={36} />
              O'chirishni tasdiqlang
            </h3>
            <button
              onClick={onClose}
              className="p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition"
            >
              <FiX size={28} />
            </button>
          </div>

          <p className="text-xl text-white dark:text-gray-300 mb-10">
            <span className="font-bold">"{itemName}"</span> ni o'chirishni
            xohlaysizmi?
          </p>

          <div className="space-y-6">
            {/* Countdown progress */}
            <div className="relative pt-1">
              <div className="flex mb-2 items-center justify-between">
                <span className="text-lg font-medium text-red-600">
                  Avtomatik o'chirish: {countdown} soniya
                </span>
              </div>
              <div className="overflow-hidden h-4 text-xs flex rounded-full bg-gray-200 dark:bg-gray-700">
                <div
                  style={{ width: `${((7 - countdown) / 7) * 100}%` }}
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-red-500 to-pink-500 transition-all duration-1000 ease-linear"
                />
              </div>
            </div>

            {/* Tugmalar */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={onClose}
                className="flex-1 btn-secondary text-xl py-5 bg-white rounded-2xl"
                disabled={isDeleting}
              >
                Cancel
              </button>
              <button
                onClick={handleImmediateDelete}
                disabled={isDeleting}
                className="flex-1 btn-danger text-xl py-5 flex items-center justify-center gap-3"
              >
                {isDeleting ? (
                  <>
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                    O'chirilmoqda...
                  </>
                ) : (
                  "Delete Now"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteModal;
