import Room from './Room';
import { useEffect, useState } from 'react';
import { useSelector} from 'react-redux';
import io from 'socket.io-client';
import 'tailwindcss/tailwind.css';

const socket = io.connect("http://localhost:5000");

function App() {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);
  const {user,room}  = useSelector(store => store.room)

  const sendmsg = (e) => {
    e.preventDefault();
    if (message.trim() && room && user) {
      socket.emit("chat", { room, user, content: message });
      setMessage('');
    }
  }

  useEffect(() => {
    socket.on("chat", (message) => {
      
      setChat(prevChat => [message, ...prevChat]);
    });

    return () => {
      socket.off("chat");
    };
  }, []);



  return (
    <div className="App min-h-screen bg-gray-900 text-white flex flex-col items-center  h-full justify-between">
      <Room socket={socket}/>
      <div className="App-header w-full max-w-xl p-4 fixed bottom-0 h-4/5 md:h-96 flex flex-col justify-end">
      
      <div className="flex flex-col-reverse mb-4 max-h-full md:max-h-72 overflow-y-auto chat-container">
      {chat.map((msg, index) => (
        <p key={index} className="bg-gray-800 p-2 rounded my-2">
          <strong>{msg.user}:</strong> {msg.content}
        </p>
      ))}
    </div>
        
        <form onSubmit={sendmsg} className="flex items-center space-x-4">
          <input 
            type="text" 
            placeholder="Enter Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1 p-2 rounded bg-gray-700 border border-gray-600 text-white"
          />
          <button 
            type="submit" 
            className="p-2 bg-blue-600 hover:bg-blue-700 rounded"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
