import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addUser } from './redux/roomSlice';

const Room = ({socket}) => {
  const [user, setUser] = useState('');
  const [room, setRoom] = useState('');
  const [msg, setMsg] = useState('');

  const dispatch = useDispatch();

  const handleJoinRoom = () => {
    dispatch(addUser({user, room}));
    if (user.trim() && room.trim()) {
      socket.emit('join_room', { user, room });
    }
  };

  useEffect(() => {
    const handleJoinRoomMessage = (message) => {
      setMsg(message);
    };

    socket.on("join_room", handleJoinRoomMessage);

    // Cleanup function to remove the event listener
    return () => {
      socket.off("join_room", handleJoinRoomMessage);
    };
  }, [socket]);

  return (
    <div className='fixed left-0 flex flex-col bg-gray-700 p-3 md:p-5 w-1/2 md:w-60'>
      <input
        className='px-2 rounded bg-gray-500 text-white text-sm md:text-lg'
        placeholder='User Name'
        type="text"
        value={user}
        onChange={(e) => setUser(e.target.value)}
      />
      
      <input
        className='my-3 px-1 rounded bg-gray-500 text-white text-sm md:text-lg'
        placeholder='Room Name'
        type="text"
        value={room}
        onChange={(e) => setRoom(e.target.value)}
      />
      
      <button
        className='bg-slate-900 rounded hover:bg-slate-800 md:py-1 text-white'
        onClick={handleJoinRoom}
      >
        Join
      </button>
      <span className=' text-xs md:text-lg mt-2 text-center'>{msg}</span>
    </div>
  );
};

export default Room;
