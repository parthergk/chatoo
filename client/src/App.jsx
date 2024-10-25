// App.js
import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import io from "socket.io-client";
import Room from "./Room";
import { MessageCircle, Send, X, Reply } from "lucide-react";
import Message from "./Message";


const socket = io.connect("https://chatoo-eovs.onrender.com/");

function App() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [replyTo, setReplyTo] = useState(null);
  const { user, room } = useSelector((store) => store.room);
  const chatEndRef = useRef(null);

  const sendmsg = (e) => {
    e.preventDefault();
    if (message.trim() && room && user) {
      const messageData = {
        room: room,
        user: user,
        content: message,
        replyTo: replyTo ? replyTo.content : null,
      };
      socket.emit("chat", messageData);
      setMessage("");
      setReplyTo(null);
    }
  };

  useEffect(() => {
    socket.on("chat", (message) => setChat((prevChat) => [...prevChat, message]));
    return () => socket.off("chat");
  }, []);

  // Auto-scroll to the latest message
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  if (!room) return <Room socket={socket} />;

  return (
    <div className="max-w-4xl mx-auto h-screen flex flex-col">
      {/* Chat room header */}
      <div className="bg-white shadow-sm p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MessageCircle className="w-6 h-6 text-blue-500" />
          <h2 className="font-semibold text-lg">{room}</h2>
        </div>
        <div className="text-sm text-gray-600">
          Logged in as <span className="font-semibold">{user}</span>
        </div>
      </div>

      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {chat.map((msg, index) => (
          <Message
            key={index}
            msg={msg}
            handleReply={setReplyTo}
            isOwnMessage={msg.user === user}
          />
        ))}
        <div ref={chatEndRef} />
      </div>

      {/* Reply indicator */}
      {replyTo && (
        <div className="bg-gray-50 p-2 border-t flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Reply className="w-4 h-4" />
            <span>Replying to: {replyTo.content}</span>
          </div>
          <button
            onClick={() => setReplyTo(null)}
            className="text-gray-500 hover:text-red-500"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* Message input */}
      <form onSubmit={sendmsg} className="p-4 border-t bg-white">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center gap-2"
          >
            <Send className="w-4 h-4" />
            Send
          </button>
        </div>
      </form>
    </div>
  );
}

export default App;
