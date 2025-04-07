
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const AIChat = () => {
  const [message, setMessage] = useState('');
  const [conversation, setConversation] = useState<{ role: 'user' | 'ai', content: string }[]>([
    { role: 'ai', content: 'Olá! Como posso ajudar você hoje?' }
  ]);
  const [loading, setLoading] = useState(false);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    // Adicionar mensagem do usuário
    const userMessage = { role: 'user' as const, content: message };
    setConversation(prev => [...prev, userMessage]);
    
    // Limpar campo de input
    setMessage('');
    
    // Simular resposta da IA (para demonstração)
    setLoading(true);
    
    setTimeout(() => {
      const responses = [
        "Isso é uma ótima pergunta! Posso ajudar você com isso.",
        "Entendi o que você precisa. Vamos resolver isso juntos.",
        "De acordo com minha análise, existem várias abordagens possíveis para isso.",
        "Interessante! Deixe-me processar essa informação e responder adequadamente.",
        "Meus algoritmos indicam que a melhor solução para sua questão seria..."
      ];
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      setConversation(prev => [...prev, { role: 'ai', content: randomResponse }]);
      setLoading(false);
    }, 1500);
  };

  return (
    <section id="ai-chat" className="py-16 md:py-24 bg-gradient-to-b from-background to-background/80">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Converse com nossa <span className="text-gradient">IA</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Experimente nossa inteligência artificial e faça suas perguntas. Nossa IA está pronta para ajudar você.
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto bg-card border rounded-xl shadow-lg p-4">
          <div className="flex flex-col h-[400px]">
            <div className="flex-1 overflow-y-auto mb-4 p-4 space-y-4">
              {conversation.map((msg, index) => (
                <div 
                  key={index}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg px-4 py-2 ${
                      msg.role === 'user' 
                        ? 'bg-ai-purple text-white rounded-br-none' 
                        : 'bg-muted rounded-bl-none'
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-muted rounded-lg rounded-bl-none px-4 py-2 max-w-[80%]">
                    <div className="flex space-x-1">
                      <div className="h-2 w-2 bg-muted-foreground rounded-full animate-bounce"></div>
                      <div className="h-2 w-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      <div className="h-2 w-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <form onSubmit={handleSendMessage} className="flex gap-2">
              <Input
                type="text"
                placeholder="Digite sua mensagem..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                disabled={loading}
                className="flex-1"
              />
              <Button 
                type="submit" 
                className="bg-ai-purple hover:bg-ai-purple-dark"
                disabled={loading}
              >
                {loading ? 'Enviando...' : 'Enviar'}
              </Button>
            </form>
          </div>
          
          <div className="mt-4 text-xs text-muted-foreground text-center">
            <p>Nota: Esta é uma demonstração. Para uma IA funcional, será necessário conectar a um serviço de IA.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIChat;
