import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import "./index.css"; // agar CSS faylingiz bo'lsa (ixtiyoriy)
import { SocketProvider } from "./context/SocketContext.jsx";

// React 18 uchun yangi API
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <SocketProvider>
        <App />
      </SocketProvider>
    </AuthProvider>
  </React.StrictMode>
);
