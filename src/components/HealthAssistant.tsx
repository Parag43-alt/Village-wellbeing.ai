
import { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from 'lucide-react';
import { ChatMessage, healthFAQs, initialChatMessages } from '@/data/healthData';
import { useToast } from "@/hooks/use-toast";

const HealthAssistant = () => {
  const [messages, setMessages] = useState<ChatMessage[]>(initialChatMessages);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim()) return;

    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      message: input,
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response (with a delay for realism)
    setTimeout(() => {
      const response = generateResponse(input.toLowerCase());
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        message: response,
        timestamp: new Date().toISOString()
      };

      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const generateResponse = (query: string): string => {
    // Check if the message contains emergency keywords
    const emergencyKeywords = ['emergency', 'urgent', 'critical', 'severe', 'accident', 'bleeding', 'unconscious', 'breathe', 'heart attack', 'stroke'];
    
    if (emergencyKeywords.some(keyword => query.includes(keyword))) {
      toast({
        title: "Medical Emergency",
        description: "Please call emergency services immediately at 108 or visit the nearest hospital.",
        variant: "destructive",
      });
      
      return "This sounds like an emergency situation. Please call emergency services immediately at 108 or visit the nearest hospital. I've highlighted this as urgent.";
    }
    
    // Check for common health queries
    for (const [keyword, response] of Object.entries(healthFAQs)) {
      if (query.includes(keyword)) {
        return response;
      }
    }
    
    // If no specific match found, provide a general response
    return `Thank you for your question about "${query}". This may require a doctor's attention. Would you like me to help you book an appointment with a healthcare professional?`;
  };

  return (
    <div className="flex flex-col h-[600px] md:h-[700px] bg-white rounded-lg shadow-md">
      {/* Header */}
      <div className="bg-health-primary text-white p-4 rounded-t-lg flex items-center">
        <div className="bg-white rounded-full p-1 mr-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-health-primary"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
            <path d="M12 17h.01" />
          </svg>
        </div>
        <h2 className="text-lg font-medium">Health Assistant</h2>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-lg p-3 ${
                msg.sender === 'user'
                  ? 'bg-health-primary text-white rounded-tr-none'
                  : 'bg-gray-100 text-gray-800 rounded-tl-none'
              }`}
            >
              {msg.message}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-gray-100 rounded-lg p-3 rounded-tl-none">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-100"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-200"></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200">
        <div className="flex">
          <Input
            type="text"
            placeholder="Type your health query..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 rounded-r-none focus-visible:ring-health-primary focus-visible:ring-offset-health-primary"
          />
          <Button 
            type="submit" 
            className="bg-health-primary hover:bg-health-dark text-white rounded-l-none"
          >
            <Send size={18} />
          </Button>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          This virtual assistant provides general guidance only. For emergencies, please call 108 or visit the nearest hospital.
        </p>
      </form>
    </div>
  );
};

export default HealthAssistant;
