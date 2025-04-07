
import React from 'react';
import { BrainIcon, Database, Code, Search, CloudIcon, ZapIcon } from 'lucide-react';

const featureItems = [
  {
    icon: <BrainIcon className="h-8 w-8 text-ai-purple" />,
    title: "Processamento de Linguagem Natural",
    description: "Nossa IA entende e gera texto como um humano, perfeita para chatbots e análise de sentimentos."
  },
  {
    icon: <Database className="h-8 w-8 text-ai-purple" />,
    title: "Análise de Big Data",
    description: "Processe grandes volumes de dados para extrair insights valiosos e tomar decisões melhores."
  },
  {
    icon: <Code className="h-8 w-8 text-ai-purple" />,
    title: "Automação Inteligente",
    description: "Automatize tarefas repetitivas com nossa IA para aumentar a produtividade da sua equipe."
  },
  {
    icon: <Search className="h-8 w-8 text-ai-purple" />,
    title: "Pesquisa Avançada",
    description: "Encontre informações específicas em segundos com nossos algoritmos de busca otimizados por IA."
  },
  {
    icon: <CloudIcon className="h-8 w-8 text-ai-purple" />,
    title: "IA na Nuvem",
    description: "Acesse nossos serviços de IA de qualquer lugar, com escalabilidade conforme sua necessidade."
  },
  {
    icon: <ZapIcon className="h-8 w-8 text-ai-purple" />,
    title: "Aprendizado de Máquina",
    description: "Nossa IA aprende continuamente, melhorando com cada interação para entregar resultados superiores."
  }
];

const Features = () => {
  return (
    <section id="recursos" className="py-16 md:py-24 relative">
      <div className="absolute inset-0 bg-gradient opacity-30" />
      <div className="container relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Recursos <span className="text-gradient">Poderosos</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Nossa plataforma de IA oferece uma ampla gama de recursos para impulsionar seu negócio e automatizar processos complexos.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featureItems.map((feature, index) => (
            <div 
              key={index}
              className="card-hover bg-card border rounded-xl p-6"
            >
              <div className="mb-4 p-3 rounded-lg inline-block bg-primary/10">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
