import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Sidebare from "../components/Sidebare";
import { RootState, AppDispatch } from "../redux/store";
import { fetchrooms } from "../redux/apiCalls/roomApiCall";

interface Room {
  _id: string;
  title: string;
  numberOfPlaces: number;
  Users: { _id: string; name: string }[];
  createdAt: string;
  Videos: { file: string }[];
}
const Rooms = () => {
  const dispatch = useDispatch<AppDispatch>();

  const userData = JSON.parse(localStorage.getItem("userData") || "{}");
  const userId = userData._id; // L'ID de l'utilisateur actuel

  const { rooms, isPending, isError, error } = useSelector(
    (state: RootState) => state.rooms
  );

  const [currentRoomIndex, setCurrentRoomIndex] = useState(0);

  useEffect(() => {
    dispatch(fetchrooms());
  }, [dispatch]);

  // Filtrer les chambres où l'ID de l'utilisateur existe dans la liste des utilisateurs
  const filteredRooms: Room[] = rooms.filter((room: Room) =>
    room.Users?.some((Users: any) => Users === userId)
  );

  // Logique pour changer la chambre actuelle (index)
  const nextRoom = () => {
    if (currentRoomIndex < filteredRooms.length - 1) {
      setCurrentRoomIndex(currentRoomIndex + 1);
    }
  };

  const prevRoom = () => {
    if (currentRoomIndex > 0) {
      setCurrentRoomIndex(currentRoomIndex - 1);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebare />
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-4">
          List of Session {filteredRooms.length}
        </h1>
        {isPending && <p>Loading rooms...</p>}
        {isError && <p>Error: {error}</p>}

        {filteredRooms.length > 0 ? (
          <div className="flex flex-col items-center">
            <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6 mb-6">
              {/* Carte de la chambre actuelle */}
              <h2 className="text-xl font-bold mb-2">
                {filteredRooms[currentRoomIndex].title}
              </h2>

              {/* Affichage de la vidéo */}
              <video
                controls
                src={`http://localhost:4000/uploads/${
                  filteredRooms[currentRoomIndex].Videos[0] || "No film"
                }`}
                className="w-full mb-4"
              >
                Your browser does not support the video tag.
              </video>

              <p>
                <strong>Number of Places :</strong>{" "}
                {filteredRooms[currentRoomIndex].numberOfPlaces}
              </p>
              <p>
                <strong>Created At:</strong>{" "}
                {new Date(
                  filteredRooms[currentRoomIndex].createdAt
                ).toLocaleDateString()}
              </p>
            </div>

            {/* Flèches pour naviguer */}
            <div className="flex justify-between w-full max-w-md">
              <button
                onClick={prevRoom}
                className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
                disabled={currentRoomIndex === 0}
              >
                Prev
              </button>
              <button
                onClick={nextRoom}
                className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
                disabled={currentRoomIndex === filteredRooms.length - 1}
              >
                Next
              </button>
            </div>
          </div>
        ) : (
          <p>No rooms available</p>
        )}
      </div>
      {/* Sidebar droite */}
      <aside className="w-1/4 bg-white shadow-lg p-4">
        <h2 className="text-lg font-bold mb-4">
          Users {filteredRooms[currentRoomIndex].Users?.length}
        </h2>
        <ul className="space-y-2">
          <li>
            {" "}
            {filteredRooms[currentRoomIndex].Users?.join(", ") || "No users"}
          </li>
        </ul>
      </aside>
    </div>
  );
};

export default Rooms;
