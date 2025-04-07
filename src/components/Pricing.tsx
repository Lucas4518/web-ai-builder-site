
import React from 'react';
import { Button } from "@/components/ui/button";
import { Check } from 'lucide-react';

const plans = [
  {
    name: "Básico",
    price: "R$99",
    period: "/mês",
    description: "Perfeito para pequenas empresas que estão começando com IA",
    features: [
      "1 projeto de IA",
      "5.000 consultas mensais",
      "Suporte por e-mail",
      "Dados básicos & Analytics",
    ],
    buttonText: "Começar Grátis",
    variant: "outline" as const,
    popular: false
  },
  {
    name: "Profissional",
    price: "R$299",
    period: "/mês",
    description: "Para empresas em crescimento que precisam de mais recursos",
    features: [
      "5 projetos de IA",
      "50.000 consultas mensais",
      "Suporte prioritário",
      "Dados avançados & Analytics",
      "API personalizada"
    ],
    buttonText: "Escolher Plano",
    variant: "default" as const,
    popular: true
  },
  {
    name: "Empresarial",
    price: "Entre em contato",
    period: "",
    description: "Para grandes empresas com necessidades específicas",
    features: [
      "Projetos ilimitados",
      "Consultas ilimitadas",
      "Suporte 24/7",
      "Analytics em tempo real",
      "API personalizada",
      "Implementação dedicada"
    ],
    buttonText: "Falar com Vendas",
    variant: "outline" as const,
    popular: false
  }
];

const Pricing = () => {
  return (
    <section id="planos" className="py-16 md:py-24 bg-gradient">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Escolha seu <span className="text-gradient">Plano</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Temos planos para atender desde startups até grandes corporações. Escolha o que melhor se adapta às suas necessidades.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <div 
              key={index}
              className={`card-hover relative rounded-xl border p-6 ${
                plan.popular ? 'border-ai-purple shadow-lg shadow-ai-purple/10' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-ai-purple px-3 py-1 rounded-full text-white text-xs font-medium">
                  Mais Popular
                </div>
              )}
              
              <div className="mb-6">
                <h3 className="text-xl font-semibold">{plan.name}</h3>
                <div className="mt-2 flex items-baseline">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  <span className="ml-1 text-muted-foreground">{plan.period}</span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  {plan.description}
                </p>
              </div>
              
              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center">
                    <Check className="h-4 w-4 text-ai-purple mr-2" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Button 
                variant={plan.variant} 
                className={plan.popular ? 'bg-ai-purple hover:bg-ai-purple-dark w-full' : 'w-full'}
              >
                {plan.buttonText}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
