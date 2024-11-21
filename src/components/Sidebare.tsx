import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Sidebare = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Supprimer le token et les autres données du localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("userData"); // Si vous avez aussi stocké les données utilisateur

    // Rediriger vers la page de connexion
    navigate("/");
  };

  return (
    <div className="w-64 bg-gray-900 flex flex-col justify-between text-white p-6">
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <nav className="mt-8">
        <ul>
          <li>
            <Link
              to="/Dashboard"
              className="block py-2 px-4 text-white hover:bg-gray-500 rounded"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/CreateRoom"
              className="block py-2 px-4 text-white hover:bg-gray-500 rounded"
            >
              Create Room
            </Link>
          </li>
          <li>
            <Link
              to="/CreateVideo"
              className="block py-2 px-4 text-white hover:bg-gray-500 rounded"
            >
              Create Video
            </Link>
          </li>
          <li>
            <Link
              to="/Listvideo"
              className="block py-2 px-4 text-white hover:bg-gray-500 rounded"
            >
              List Video
            </Link>
          </li>
          <li>
            <Link
              to="/Room"
              className="block py-2 px-4 text-white hover:bg-gray-500 rounded"
            >
              Rooms
            </Link>
          </li>
        </ul>
      </nav>
      <button
        onClick={handleLogout}
        className="mt-8 w-full py-2 px-4 text-white bg-red-600 hover:bg-red-500 rounded"
      >
        Logout
      </button>
    </div>
  );
};

export default Sidebare;
