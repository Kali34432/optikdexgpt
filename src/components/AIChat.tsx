import React, { useState } from 'react';
import { Send, Bot, User, Sparkles } from 'lucide-react';

export default function AIChat() {
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      content: "Hi! I'm your crypto AI assistant. I can help you analyze market trends, explain DeFi concepts, and provide trading insights. What would you like to know?",
      timestamp: new Date().toLocaleTimeString(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      type: 'user',
      content: inputMessage,
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages(prev => [...prev, userMessage]);

    // Simulate AI response
    setTimeout(() => {
      const botResponse = {
        type: 'bot',
        content: "I understand you're interested in crypto analysis. Based on current market conditions, I'd recommend focusing on fundamental analysis and risk management. Would you like me to explain any specific trading strategies or market indicators?",
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);

    setInputMessage('');
  };

  const suggestedQuestions = [
    "What's the current market sentiment?",
    "Explain DeFi yield farming",
    "Best tokens to watch today?",
    "How to analyze a new token?",
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl overflow-hidden">
        {/* Chat Header */}
        <div className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 p-4 border-b border-gray-700/50">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-purple-500 to-blue-500 p-2 rounded-lg">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white">AI Crypto Assistant</h2>
              <p className="text-gray-400 text-sm">Powered by advanced language models</p>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="h-96 overflow-y-auto p-4 space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex items-start space-x-3 ${
                message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''
              }`}
            >
              <div className={`p-2 rounded-lg ${
                message.type === 'user' 
                  ? 'bg-blue-600/20 border border-blue-500/30' 
                  : 'bg-purple-600/20 border border-purple-500/30'
              }`}>
                {message.type === 'user' ? (
                  <User className="w-4 h-4 text-blue-400" />
                ) : (
                  <Bot className="w-4 h-4 text-purple-400" />
                )}
              </div>
              <div className={`flex-1 ${message.type === 'user' ? 'text-right' : ''}`}>
                <div className={`inline-block p-3 rounded-lg max-w-xs lg:max-w-md ${
                  message.type === 'user'
                    ? 'bg-blue-600/30 text-white'
                    : 'bg-gray-700/50 text-gray-100'
                }`}>
                  <p className="text-sm">{message.content}</p>
                </div>
                <p className="text-xs text-gray-500 mt-1">{message.timestamp}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Suggested Questions */}
        <div className="p-4 border-t border-gray-700/50">
          <p className="text-gray-400 text-sm mb-2">Suggested questions:</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {suggestedQuestions.map((question, index) => (
              <button
                key={index}
                onClick={() => setInputMessage(question)}
                className="px-3 py-1 bg-gray-700/50 hover:bg-gray-600/50 text-gray-300 hover:text-white rounded-full text-sm transition-all duration-200 border border-gray-600/30 hover:border-gray-500/50"
              >
                {question}
              </button>
            ))}
          </div>

          {/* Input */}
          <div className="flex space-x-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Ask me anything about crypto..."
              className="flex-1 bg-gray-700/50 border border-gray-600/50 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20"
            />
            <button
              onClick={handleSendMessage}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white p-2 rounded-lg transition-all duration-200 shadow-lg hover:shadow-purple-500/25"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}