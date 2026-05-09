import { useState } from 'react';
import { Send, Bot, User, Sparkles } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

const SUGGESTED_QUESTIONS = [
  "What are the transfer requirements for UC Berkeley?",
  "When should I apply for transfer?",
  "What is IGETC?",
  "How do I check if my classes transfer?",
];

const SAMPLE_RESPONSES: Record<string, string> = {
  "What are the transfer requirements for UC Berkeley?": "To transfer to UC Berkeley, you'll need: (1) Complete 60 semester units by spring before transfer, (2) Minimum 3.0 GPA (though admitted students average 3.7+), (3) Complete all major prerequisites, (4) Finish IGETC or campus-specific general education, (5) Complete two English composition courses. UC Berkeley is highly competitive, so focus on achieving strong grades in your major prep courses!",
  "When should I apply for transfer?": "The UC application period is November 1-30 for fall admission. CSU applications open October 1 and close November 30 for most campuses. You'll be applying during your second year of community college, about 9-10 months before you plan to transfer. Start preparing your application materials in summer!",
  "What is IGETC?": "IGETC (Intersegmental General Education Transfer Curriculum) is a series of courses that you can complete to satisfy lower-division general education requirements at all UC and CSU campuses. Completing IGETC means you won't have to take additional GE courses after transferring, allowing you to focus on your major. It includes English, math, arts & humanities, social sciences, and physical & biological sciences.",
  "How do I check if my classes transfer?": "Use ASSIST.org - it's the official transfer course articulation system for California's public colleges and universities. Simply select your community college, the UC or CSU campus you're interested in, and your intended major. ASSIST will show you exactly which courses transfer and how they satisfy requirements at your target school.",
};

export function AIAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hi! I'm your AI Transfer Assistant. I'm here to help you navigate the transfer process from California Community College to UC or CSU. Ask me anything about requirements, deadlines, or the application process!",
    },
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
    };

    setMessages(prev => [...prev, userMessage]);

    // Simulate AI response
    setTimeout(() => {
      const response = SAMPLE_RESPONSES[input] ||
        "That's a great question! While I'm a demo AI assistant, I can help you with general transfer guidance. For specific questions, I recommend visiting ASSIST.org, speaking with your college counselor, or checking the admission requirements on your target university's website. What else would you like to know about the transfer process?";

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
      };
      setMessages(prev => [...prev, assistantMessage]);
    }, 1000);

    setInput('');
  };

  const handleSuggestedQuestion = (question: string) => {
    setInput(question);
  };

  return (
    <section id="assistant" className="py-20 px-4 bg-white">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full mb-4">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm">AI-Powered Guidance</span>
          </div>
          <h2 className="text-4xl mb-4 text-gray-900">Ask Your Transfer Questions</h2>
          <p className="text-lg text-gray-600">Get instant answers about requirements, deadlines, and applications</p>
        </div>

        <div className="bg-gray-50 rounded-2xl border border-gray-200 overflow-hidden">
          {/* Messages */}
          <div className="h-96 overflow-y-auto p-6 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  message.role === 'user' ? 'bg-blue-600' : 'bg-purple-600'
                }`}>
                  {message.role === 'user' ? (
                    <User className="w-4 h-4 text-white" />
                  ) : (
                    <Bot className="w-4 h-4 text-white" />
                  )}
                </div>
                <div className={`max-w-[80%] p-4 rounded-2xl ${
                  message.role === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white border border-gray-200 text-gray-900'
                }`}>
                  {message.content}
                </div>
              </div>
            ))}
          </div>

          {/* Suggested Questions */}
          {messages.length === 1 && (
            <div className="px-6 py-4 border-t border-gray-200 bg-white">
              <p className="text-sm text-gray-600 mb-3">Try asking:</p>
              <div className="flex flex-wrap gap-2">
                {SUGGESTED_QUESTIONS.map((question) => (
                  <button
                    key={question}
                    onClick={() => handleSuggestedQuestion(question)}
                    className="text-sm bg-gray-100 text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="p-4 border-t border-gray-200 bg-white">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask about transfer requirements, deadlines, or anything else..."
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleSend}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
