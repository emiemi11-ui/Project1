'use client';
import { useState } from 'react';
import Card from '@/components/ui/Card';
import { mockMessages, mockConversations } from '@/lib/mockData';
import { Send } from 'lucide-react';

export default function MessagesPage() {
  const [activeConv, setActiveConv] = useState('c1');
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState(mockMessages);

  const activeContact = mockConversations.find(c => c.id === activeConv);

  const convMessages = activeConv === 'c1'
    ? messages.filter(m =>
        (m.from === 'Dr. Elena Marinescu' || m.to === 'Dr. Elena Marinescu') &&
        (m.from === 'Cpl. R. Stanescu' || m.to === 'Cpl. R. Stanescu' || m.fromRole === 'physician')
      )
    : activeConv === 'c2'
    ? messages.filter(m => m.from === 'Psych. Ana Voicu' || m.to === 'Psych. Ana Voicu')
    : activeConv === 'c3'
    ? messages.filter(m => m.from === 'Trainer Mihai Costin' || m.to === 'Trainer Mihai Costin')
    : messages.filter(m => m.from === 'Cdr. Bogdan Avram' || m.to === 'Cdr. Bogdan Avram');

  const handleSend = () => {
    if (!newMessage.trim()) return;
    const msg = {
      id: `m${Date.now()}`,
      from: 'You',
      fromRole: 'user',
      to: activeContact?.name || '',
      content: newMessage,
      timestamp: new Date().toISOString(),
      read: true,
    };
    setMessages([...messages, msg]);
    setNewMessage('');
  };

  return (
    <div className="space-y-6">
      <h1 className="font-syne text-2xl font-bold text-white">Messages</h1>

      <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-6 h-[calc(100vh-200px)]">
        {/* Conversations sidebar */}
        <Card variant="default" padding="none" className="overflow-auto">
          <div className="p-4 border-b border-white/5">
            <span className="text-xs font-mono text-ice3">CONVERSATIONS</span>
          </div>
          {mockConversations.map(conv => (
            <button
              key={conv.id}
              onClick={() => setActiveConv(conv.id)}
              className={`w-full flex items-center gap-3 p-4 border-b border-white/5 transition-colors text-left ${
                activeConv === conv.id ? 'bg-cyan/5' : 'hover:bg-white/[0.02]'
              }`}
            >
              <div className="w-10 h-10 rounded-full bg-cold/20 flex items-center justify-center shrink-0">
                <span className="text-xs font-bold text-cold2">{conv.avatar}</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between">
                  <span className="text-sm text-ice2 font-medium truncate">{conv.name}</span>
                  <span className="text-[10px] text-ice3 font-mono">{conv.timestamp}</span>
                </div>
                <div className="flex justify-between mt-0.5">
                  <span className="text-xs text-ice3 truncate">{conv.lastMessage}</span>
                  {conv.unread > 0 && (
                    <span className="w-4 h-4 bg-cyan rounded-full text-[8px] flex items-center justify-center text-ink font-bold shrink-0">
                      {conv.unread}
                    </span>
                  )}
                </div>
                <span className="text-[9px] font-mono text-ice3/50">{conv.role}</span>
              </div>
            </button>
          ))}
        </Card>

        {/* Chat area */}
        <Card variant="default" padding="none" className="flex flex-col">
          {/* Header */}
          <div className="p-4 border-b border-white/5 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-cold/20 flex items-center justify-center">
              <span className="text-xs font-bold text-cold2">{activeContact?.avatar}</span>
            </div>
            <div>
              <span className="text-sm text-ice2 font-medium">{activeContact?.name}</span>
              <span className="text-[10px] text-ice3 font-mono block">{activeContact?.role}</span>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-auto p-4 space-y-4">
            {convMessages.map(msg => {
              const isSent = msg.fromRole === 'user' || msg.from === 'You';
              return (
                <div key={msg.id} className={`flex ${isSent ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] ${isSent ? 'order-1' : ''}`}>
                    <div className={`rounded-2xl px-4 py-3 ${
                      isSent
                        ? 'bg-cold/20 text-ice2 rounded-br-md'
                        : 'bg-white/5 text-ice2 rounded-bl-md'
                    }`}>
                      <p className="text-sm">{msg.content}</p>
                    </div>
                    {msg.contextSnapshot && (
                      <div className="mt-1 flex gap-2 px-2">
                        {msg.contextSnapshot.readiness && (
                          <span className="text-[9px] font-mono text-signal bg-signal/10 px-1.5 py-0.5 rounded">
                            R:{msg.contextSnapshot.readiness}
                          </span>
                        )}
                        {msg.contextSnapshot.hrv && (
                          <span className="text-[9px] font-mono text-violet bg-violet/10 px-1.5 py-0.5 rounded">
                            HRV:{msg.contextSnapshot.hrv}
                          </span>
                        )}
                        {msg.contextSnapshot.stress && (
                          <span className="text-[9px] font-mono text-amber bg-amber/10 px-1.5 py-0.5 rounded">
                            S:{msg.contextSnapshot.stress}
                          </span>
                        )}
                        {msg.contextSnapshot.sleep && (
                          <span className="text-[9px] font-mono text-cold2 bg-cold/10 px-1.5 py-0.5 rounded">
                            Slp:{msg.contextSnapshot.sleep}
                          </span>
                        )}
                      </div>
                    )}
                    <span className="text-[9px] text-ice3/50 font-mono px-2 mt-1 block">
                      {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-white/5">
            <div className="flex gap-2">
              <input
                type="text"
                value={newMessage}
                onChange={e => setNewMessage(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSend()}
                placeholder="Type a message..."
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-ice outline-none focus:border-cyan/30"
              />
              <button
                onClick={handleSend}
                className="w-10 h-10 bg-cyan rounded-xl flex items-center justify-center hover:bg-cyan/80 transition-colors"
              >
                <Send size={16} className="text-ink" />
              </button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
