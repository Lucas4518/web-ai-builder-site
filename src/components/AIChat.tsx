
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { ScrollArea } from "@/components/ui/scroll-area";

const AIChat = () => {
  const DEFAULT_API_KEY = "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"; 
  
  const [message, setMessage] = useState('');
  const [conversation, setConversation] = useState<{ role: 'user' | 'ai', content: string }[]>([
    { role: 'ai', content: 'Olá! Como posso ajudar você hoje?' }
  ]);
  const [loading, setLoading] = useState(false);
  const [apiKey, setApiKey] = useState(() => {
    const savedKey = localStorage.getItem('ai-api-key');
    return savedKey || DEFAULT_API_KEY;
  });
  const [showApiInput, setShowApiInput] = useState(!localStorage.getItem('ai-api-key'));

  const saveApiKey = () => {
    if (apiKey.trim()) {
      localStorage.setItem('ai-api-key', apiKey.trim());
      setShowApiInput(false);
      toast.success("API Key salva com sucesso!");
    } else {
      toast.error("Por favor, insira uma API Key válida");
    }
  };

  const clearApiKey = () => {
    localStorage.removeItem('ai-api-key');
    setApiKey('');
    setShowApiInput(true);
    toast.info("API Key removida");
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    if (!apiKey) {
      setShowApiInput(true);
      toast.error("Por favor, configure sua API Key primeiro");
      return;
    }

    // Adicionar mensagem do usuário
    const userMessage = { role: 'user' as const, content: message };
    setConversation(prev => [...prev, userMessage]);
    
    // Limpar campo de input
    setMessage('');
    
    // Iniciar carregamento
    setLoading(true);
    
    try {
      // Configuração correta para chat completions API
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: "gpt-4o-mini", // Modelo moderno mais acessível
          messages: [
            { role: "system", content: "Você é um assistente útil e amigável." },
            ...conversation.map(msg => ({ 
              role: msg.role === 'user' ? 'user' : 'assistant', 
              content: msg.content 
            })),
            { role: "user", content: message }
          ],
          max_tokens: 300
        })
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Erro na API: ${response.status} - ${errorData.error?.message || 'Erro desconhecido'}`);
      }
      
      const data = await response.json();
      const aiResponse = data.choices[0].message.content;
      
      setConversation(prev => [...prev, { role: 'ai', content: aiResponse }]);
    } catch (error) {
      console.error("Erro ao comunicar com a API:", error);
      setConversation(prev => [...prev, { 
        role: 'ai', 
        content: 'Desculpe, ocorreu um erro ao processar sua mensagem. Verifique sua API Key ou tente novamente mais tarde.' 
      }]);
      
      toast.error(`Erro ao comunicar com a API: ${error instanceof Error ? error.message : 'Erro desconhecido'}`);
    } finally {
      setLoading(false);
    }
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
        
        {showApiInput && (
          <div className="max-w-xl mx-auto mb-8 p-4 border rounded-lg bg-card/50">
            <h3 className="text-lg font-medium mb-2">Configure sua API Key</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Para usar o chat com IA, insira sua chave de API abaixo. Ela será salva apenas no seu navegador.
            </p>
            <div className="flex gap-2">
              <Input
                type="password"
                value={apiKey}
                onChange={e => setApiKey(e.target.value)}
                placeholder="Insira sua API Key"
                className="flex-1"
              />
              <Button onClick={saveApiKey} className="bg-ai-purple hover:bg-ai-purple-dark">
                Salvar
              </Button>
            </div>
          </div>
        )}
        
        <div className="max-w-3xl mx-auto bg-card border rounded-xl shadow-lg p-4">
          <div className="flex flex-col h-[400px]">
            <ScrollArea className="flex-1 mb-4 p-4">
              <div className="space-y-4">
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
            </ScrollArea>
            
            <form onSubmit={handleSendMessage} className="flex gap-2">
              <Input
                type="text"
                placeholder="Digite sua mensagem..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                disabled={loading || showApiInput}
                className="flex-1"
              />
              <Button 
                type="submit" 
                className="bg-ai-purple hover:bg-ai-purple-dark"
                disabled={loading || showApiInput}
              >
                {loading ? 'Enviando...' : 'Enviar'}
              </Button>
            </form>
            
            {!showApiInput && (
              <div className="mt-3 text-right">
                <button 
                  onClick={clearApiKey}
                  className="text-xs text-muted-foreground hover:text-foreground"
                >
                  Alterar API Key
                </button>
              </div>
            )}
          </div>
          
          <div className="mt-4 text-xs text-muted-foreground text-center">
            <p>O chat usa sua própria chave de API para comunicação com a IA. <a href="https://platform.openai.com/account/api-keys" target="_blank" rel="noopener noreferrer" className="underline">Obtenha uma aqui</a>.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIChat;
