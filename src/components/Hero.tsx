
import React from 'react';
import { Button } from "@/components/ui/button";
import { BrainIcon, Zap, Code } from 'lucide-react';

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
            <Button size="lg" className="bg-ai-purple hover:bg-ai-purple-dark text-white">
              Começar Agora
            </Button>
            <Button size="lg" variant="outline">
              Ver Demonstração
            </Button>
          </div>
          
          <div className="relative mx-auto max-w-3xl">
            <div className="glassmorphism rounded-xl overflow-hidden shadow-xl">
              <div className="w-full h-12 bg-gray-100 dark:bg-gray-800 flex items-center px-4 gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <div className="flex-1 flex justify-center">
                  <div className="w-1/2 h-6 bg-gray-200 dark:bg-gray-700 rounded-full" />
                </div>
              </div>
              <div className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 p-6">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-ai-purple flex items-center justify-center">
                    <BrainIcon className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="w-full h-4 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse" />
                    <div className="w-3/4 h-4 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse" />
                    <div className="w-2/3 h-4 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse" />
                  </div>
                </div>
                <div className="mt-6 flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
                    <Code className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="w-full h-4 bg-blue-100 dark:bg-blue-900/30 rounded-full animate-pulse" />
                    <div className="w-5/6 h-4 bg-blue-100 dark:bg-blue-900/30 rounded-full animate-pulse" />
                    <div className="w-3/4 h-4 bg-blue-100 dark:bg-blue-900/30 rounded-full animate-pulse" />
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-4 -right-4 bg-white dark:bg-gray-800 shadow-lg p-2 rounded-lg transform rotate-6 animate-float">
              <Code className="w-6 h-6 text-ai-purple" />
            </div>
            <div className="absolute -top-4 -left-4 bg-white dark:bg-gray-800 shadow-lg p-2 rounded-lg transform -rotate-3 animate-float delay-300">
              <BrainIcon className="w-6 h-6 text-ai-blue" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
