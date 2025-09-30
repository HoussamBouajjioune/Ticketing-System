import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../store/auth";

export default function LogoutButton() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();          
    navigate("/login"); 
  };

  return (
    <button onClick={handleLogout} className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 hover:cursor-pointer">
      Logout
    </button>
  );
}
