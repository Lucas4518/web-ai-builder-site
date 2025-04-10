
import React from 'react';
import { BrainIcon, Code, Database, Zap } from 'lucide-react';

const steps = [
  {
    number: 1,
    icon: <BrainIcon className="h-6 w-6" />,
    title: "Conecte sua base de dados",
    description: "Integre facilmente nossa IA com suas fontes de dados existentes em poucos minutos."
  },
  {
    number: 2,
    icon: <Code className="h-6 w-6" />,
    title: "Configure sua IA",
    description: "Personalize os parâmetros da IA para atender às necessidades específicas do seu negócio."
  },
  {
    number: 3,
    icon: <Database className="h-6 w-6" />,
    title: "Processe os dados",
    description: "Nossa IA analisa seus dados e extrai insights valiosos automaticamente."
  },
  {
    number: 4,
    icon: <Zap className="h-6 w-6" />,
    title: "Receba resultados",
    description: "Visualize relatórios e insights acionáveis para tomar decisões melhores."
  }
];

const HowItWorks = () => {
  return (
    <section id="como-funciona" className="py-16 md:py-24">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Como <span className="text-gradient">Funciona</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Implementar nossa solução de IA é simples. Siga estes passos para começar a transformar seu negócio.
          </p>
        </div>
        
        <div className="relative">
          {/* Connector Line removed */}
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div 
                key={index} 
                className="relative flex flex-col items-center text-center"
              >
                <div className="w-16 h-16 rounded-full bg-ai-purple text-white flex items-center justify-center mb-6 relative z-10">
                  {step.icon}
                </div>
                
                <div className="absolute top-8 font-bold text-4xl text-ai-purple/10">
                  {step.number}
                </div>
                
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
