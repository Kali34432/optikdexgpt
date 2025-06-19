import React, { useState } from 'react';
import { Send, Bot, User, Sparkles } from 'lucide-react';

type Message = {
  type: 'bot' | 'user';
  content: string;
  timestamp: string;
};

export default function AIChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      type: 'bot',
      content:
        "Hi! I'm your crypto AI assistant. I can help you analyze market trends, explain DeFi concepts, and provide trading insights. What would you like to know?",
      timestamp: new Date().toLocaleTimeString(),
    },
  ]);

  const [inputMessage, setInputMessage] = useState('');
  const [mode, setMode] = useState<'lite' | 'power'>('lite');
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      type: 'user',
      content: inputMessage,
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    const systemPrompt = {
      role: 'system',
      content: `You are Optik GPT, a crypto AI assistant providing financial strategies, DeFi guidance, and market insights.`,
    };

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        body: JSON.stringify({
          messages: [systemPrompt, { role: 'user', content: inputMessage }],
          mode,
        }),
      });

      const data = await res.json();

      const botMessage: Message = {
        type: 'bot',
        content: data.response,
        timestamp: new Date().toLocaleTimeString(),
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (err) {
      console.error('GPT Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const suggestedQuestions = [
    "What's the current market sentiment?",
    'Explain DeFi yield farming',
    'Best tokens to watch today?',
    'How to analyze a new token?',
  ];

  return (
    <div className="max-w-4xl mx-auto font-[Comic_Sans_MS]">
      {/* Mode Toggle */}
      <div className="mb-4 flex justify-end">
        <select
          value={mode}
          onChange={e => setMode(e.target.value as 'lite' | 'power')}
          className="bg-black border border-yellow-400 rounded-xl px-3 py-1 text-yellow-200 text-sm"
        >
          <option value="lite">Lite (1 $OPTIK) – GPT-3.5</option>
          <option value="power">Power (2 $OPTIK) – GPT-4</option>
        </select>
      </div>

      {/* Chat Box */}
      <div className="bg-black/70 border border-yellow-400/30 rounded-xl overflow-hidden shadow-lg">
        {/* Header */}
        <div className="bg-yellow-500/10 p-4 border-b border-yellow-300/30 flex items-center space-x-3">
          <div className="bg-yellow-300 p-2 rounded-lg">
            <Sparkles className="w-5 h-5 text-black" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-yellow-200">AI Crypto Assistant</h2>
            <p className="text-yellow-400 text-sm">Powered by Optik GPT</p>
          </div>
        </div>

        {/* Messages */}
        <div className="h-96 overflow-y-auto p-4 space-y-4 bg-black">
          {messages.map((m, i) => (
            <div
              key={i}
              className={`flex items-start space-x-3 ${m.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}
            >
              <div
                className={`p-2 rounded-lg ${
                  m.type === 'user'
                    ? 'bg-yellow-400/10 border border-yellow-300/30'
                    : 'bg-yellow-300/10 border border-yellow-200/30'
                }`}
              >
                {m.type === 'user' ? (
                  <User className="w-4 h-4 text-yellow-400" />
                ) : (
                  <Bot className="w-4 h-4 text-yellow-300" />
                )}
              </div>
              <div className={`flex-1 ${m.type === 'user' ? 'text-right' : ''}`}>
                <div
                  className={`inline-block p-3 rounded-2xl max-w-xs lg:max-w-md ${
                    m.type === 'user'
                      ? 'bg-yellow-400/20 text-yellow-100'
                      : 'bg-black/50 text-yellow-200'
                  }`}
                >
                  <p className="text-sm">{m.content}</p>
                </div>
                <p className="text-xs text-yellow-500 mt-1">{m.timestamp}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Suggested Prompts */}
        <div className="p-4 border-t border-yellow-400/30 bg-black">
          <p className="text-yellow-400 text-sm mb-2">Suggested questions:</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {suggestedQuestions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setInputMessage(q);
                  sendMessage();
                }}
                className="px-3 py-1 bg-yellow-500/10 hover:bg-yellow-400/20 text-yellow-300 hover:text-white rounded-full text-sm border border-yellow-300/30"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input */}
          <div className="flex space-x-2">
            <input
              type="text"
              value={inputMessage}
              onChange={e => setInputMessage(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && sendMessage()}
              placeholder="Ask anything about crypto..."
              className="flex-1 bg-black border border-yellow-300/30 rounded-2xl px-4 py-2 text-yellow-200 placeholder-yellow-500"
            />
            <button
              onClick={sendMessage}
              disabled={isLoading}
              className="bg-yellow-400 hover:bg-yellow-300 text-black p-2 rounded-2xl"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
