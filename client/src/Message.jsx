import { Reply } from "lucide-react";
const Message = ({ msg, handleReply, isOwnMessage }) => (
    <div className={`mb-4 ${isOwnMessage ? 'ml-auto' : 'mr-auto'}`}>
      <div className={`max-w-xs lg:max-w-md ${isOwnMessage ? 'ml-auto' : ''}`}>
        {msg.replyTo && (
          <div className="bg-gray-100 p-2 rounded-t-lg text-sm text-gray-600 border-l-4 border-blue-500">
            <p className="font-semibold">Replying to:</p>
            <p className="truncate">{msg.replyTo}</p>
          </div>
        )}
        <div
          className={`p-3 rounded-lg ${
            isOwnMessage
              ? 'bg-blue-500 text-white'
              : 'bg-gray-100 text-gray-800'
          }`}
        >
          <p className="font-semibold text-sm">{msg.user}</p>
          <p className="mt-1">{msg.content}</p>
        </div>
        <button
          onClick={() => handleReply(msg)}
          className="text-gray-500 text-sm mt-1 hover:text-blue-500 flex items-center gap-1"
        >
          <Reply className="w-4 h-4" />
          Reply
        </button>
      </div>
    </div>
  );

  export default Message