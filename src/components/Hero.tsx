
import React from 'react';
import { Button } from "@/components/ui/button";
import { Zap } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative pt-24 md:pt-32 pb-16 md:pb-24 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-1/4 -right-20 w-72 h-72 rounded-full bg-ai-purple/10 blur-3xl" />
      <div className="absolute bottom-1/4 -left-20 w-72 h-72 rounded-full bg-ai-blue/10 blur-3xl" />
      
      <div className="container relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-block mb-6 animate-float">
            <div className="flex items-center gap-2 bg-white dark:bg-gray-800 shadow-md px-4 py-2 rounded-full">
              <Zap size={16} className="text-ai-purple animate-pulse-glow" />
              <span className="text-sm font-medium">Inteligência artificial de última geração</span>
            </div>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
            A <span className="text-gradient">Inteligência Artificial</span> para potencializar seu negócio
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Nossa plataforma de IA oferece soluções inteligentes que transformam dados em insights valiosos para crescer seu negócio.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <a href="#ai-chat">
              <Button size="lg" className="bg-ai-purple hover:bg-ai-purple-dark text-white">
                Começar Agora
              </Button>
            </a>
            <Button size="lg" variant="outline">
              Ver Demonstração
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
