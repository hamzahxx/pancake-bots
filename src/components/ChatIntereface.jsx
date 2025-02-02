import { useState, useRef } from "react";
import { FiMessageSquare, FiX, FiSend } from "react-icons/fi";

const ChatInterface = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages([...messages, { text: newMessage, isUser: true }]);
      setNewMessage("");
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          { text: "This is a dummy response", isUser: false },
        ]);
      }, 1000);
    }
  };

  return (
    <div className="absolute inset-0 pointer-events-none">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`absolute bottom-4 right-4 z-10 p-4 rounded-full shadow-lg transition-all duration-300 ${
          isOpen ? "bg-red-500 rotate-90" : "bg-blue-500"
        } pointer-events-auto`}
      >
        {isOpen ? (
          <FiX className="text-white text-xl" />
        ) : (
          <FiMessageSquare className="text-white text-xl" />
        )}
      </button>
      <div
        className={`absolute bottom-20 right-4 w-70 md:w-80 bg-white rounded-lg shadow-xl transition-all duration-300 transform ${
          isOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-4 pointer-events-none"
        } pointer-events-auto`}
      >
        <div className="flex flex-col h-96">
          <div className="bg-blue-500 text-white p-4 rounded-t-lg flex justify-between items-center">
            <h3 className="font-semibold">Chat Support</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-blue-400 rounded-full p-1"
            >
              <FiX className="text-lg" />
            </button>
          </div>
          <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.isUser ? "justify-end" : "justify-start"
                } mb-4`}
              >
                <div
                  className={`max-w-[70%] rounded-lg p-3 ${
                    message.isUser
                      ? "bg-blue-500 text-white"
                      : "bg-white border border-gray-200"
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <div className="p-4 border-t border-gray-200">
            <div className="flex gap-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                placeholder="Type your message..."
                className="flex-1 border border-gray-300 rounded-lg w-1 md:w-auto pl-2 md:px-4 py-2 focus:outline-none focus:border-blue-500"
              />
              <button
                onClick={handleSendMessage}
                className="bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600 transition-colors"
              >
                <FiSend />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
