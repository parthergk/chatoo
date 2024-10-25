// Room.js
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "./redux/roomSlice";
import { MessageCircle, User } from "lucide-react";

const Room = ({ socket }) => {
  const [user, setUser] = useState("");
  const [room, setRoom] = useState("");
  const [msg, setMsg] = useState("");
  const dispatch = useDispatch();

  const handleJoinRoom = () => {
    if (user.trim() && room.trim()) {
      dispatch(addUser({ user, room }));
      socket.emit("join_room", { user, room });
    }
  };

  useEffect(() => {
    const handleJoinRoomMessage = (message) => setMsg(message);

    socket.on("join_room", handleJoinRoomMessage);
    return () => socket.off("join_room", handleJoinRoomMessage);
  }, [socket]);

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <MessageCircle className="w-6 h-6" />
          Join Chat Room
        </h2>
        <div className="space-y-3">
          <div className="relative">
            <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Username"
              type="text"
              value={user}
              onChange={(e) => setUser(e.target.value)}
            />
          </div>
          <div className="relative">
            <MessageCircle className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Room Name"
              type="text"
              value={room}
              onChange={(e) => setRoom(e.target.value)}
            />
          </div>
          <button
            onClick={handleJoinRoom}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
          >
            Join Room
          </button>
        </div>
        {msg && <p className="text-sm text-gray-600 mt-2">{msg}</p>}
      </div>
    </div>
  );
};

export default Room;
