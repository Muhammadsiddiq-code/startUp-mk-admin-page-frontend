import { createContext, useContext, useEffect, useState } from "react";
import io from "socket.io-client";

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const newSocket = io("http://localhost:5000"); // backend URL

    newSocket.on("connect", () => {
      console.log("Socket ulandi");
    });

    newSocket.on("new-notification", (notif) => {
      setNotifications((prev) => [notif, ...prev].slice(0, 20));
    });

    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket, notifications }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);
