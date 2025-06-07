import { useState } from 'react';
import { Send, Bot, User } from 'lucide-react';

export default function ChatSection() {
  const [prompt, setPrompt] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    const userMessage = { type: 'user', content: prompt };
    setMessages(prev => [...prev, userMessage]);
    setLoading(true);

    try {
      const response = await fetch(`http://localhost:3510/api/v1.0/ask-ai?prompt=${encodeURIComponent(prompt)}`);
      const aiResponse = await response.text();
      
      setMessages(prev => [...prev, { type: 'ai', content: aiResponse }]);
    } catch (error) {
      setMessages(prev => [...prev, { type: 'ai', content: 'Sorry, I encountered an error. Please try again.' }]);
    } finally {
      setLoading(false);
      setPrompt('');
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 h-full">
      <div className="flex items-center space-x-3 mb-8">
        <div className="bg-gradient-to-r from-purple-500 to-blue-500 p-3 rounded-2xl">
          <Bot className="text-white" size={24} />
        </div>
        <h2 className="text-2xl font-bold text-white">AI Assistant</h2>
      </div>

      <div className="h-96 overflow-y-auto mb-6 space-y-4 pr-4">
        {messages.length === 0 && (
          <div className="text-center text-white/60 py-16">
            <Bot className="mx-auto mb-4 text-white/40\" size={48} />
            <p className="text-lg">Ask me anything! I'm here to help.</p>
          </div>
        )}
        
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex items-start space-x-3 animate-fade-in ${
              message.type === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            {message.type === 'ai' && (
              <div className="bg-gradient-to-r from-purple-500 to-blue-500 p-2 rounded-xl">
                <Bot className="text-white\" size={20} />
              </div>
            )}
            <div
              className={`max-w-md p-4 rounded-2xl ${
                message.type === 'user'
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                  : 'bg-white/20 text-white border border-white/20'
              }`}
            >
              <p className="leading-relaxed">{message.content}</p>
            </div>
            {message.type === 'user' && (
              <div className="bg-white/20 p-2 rounded-xl">
                <User className="text-white" size={20} />
              </div>
            )}
          </div>
        ))}
        
        {loading && (
          <div className="flex items-start space-x-3">
            <div className="bg-gradient-to-r from-purple-500 to-blue-500 p-2 rounded-xl">
              <Bot className="text-white" size={20} />
            </div>
            <div className="bg-white/20 border border-white/20 p-4 rounded-2xl">
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="flex space-x-4">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Ask me anything..."
          className="flex-1 bg-white/10 border border-white/20 rounded-2xl px-6 py-4 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
          disabled={loading}
        />
        <button
          type="submit"
          disabled={loading || !prompt.trim()}
          className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 disabled:opacity-50 text-white p-4 rounded-2xl transition-all duration-300 hover:scale-105 disabled:hover:scale-100"
        >
          <Send size={20} />
        </button>
      </form>
    </div>
  );
}