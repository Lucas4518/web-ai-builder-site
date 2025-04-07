
import React from 'react';
import { BrainIcon } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-card border-t py-12">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <a href="#" className="flex items-center gap-2 text-xl font-bold">
              <BrainIcon className="h-6 w-6 text-ai-purple" />
              <span>NOVA<span className="text-ai-purple">IA</span></span>
            </a>
            <p className="mt-4 text-muted-foreground">
              Transformando negócios com soluções de inteligência artificial avançadas que impulsionam o crescimento e a eficiência operacional.
            </p>
            <div className="mt-4 flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-ai-purple transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
              <a href="#" className="text-muted-foreground hover:text-ai-purple transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                </svg>
              </a>
              <a href="#" className="text-muted-foreground hover:text-ai-purple transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                </svg>
              </a>
              <a href="#" className="text-muted-foreground hover:text-ai-purple transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect width="4" height="12" x="2" y="9"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </a>
            </div>
          </div>
          
          <div>
            <h5 className="font-semibold mb-4">Enlaces Rápidos</h5>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-muted-foreground hover:text-ai-purple transition-colors">Início</a>
              </li>
              <li>
                <a href="#recursos" className="text-muted-foreground hover:text-ai-purple transition-colors">Recursos</a>
              </li>
              <li>
                <a href="#como-funciona" className="text-muted-foreground hover:text-ai-purple transition-colors">Como Funciona</a>
              </li>
              <li>
                <a href="#planos" className="text-muted-foreground hover:text-ai-purple transition-colors">Planos</a>
              </li>
              <li>
                <a href="#contato" className="text-muted-foreground hover:text-ai-purple transition-colors">Contato</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h5 className="font-semibold mb-4">Legal</h5>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-muted-foreground hover:text-ai-purple transition-colors">Termos de Serviço</a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-ai-purple transition-colors">Política de Privacidade</a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-ai-purple transition-colors">Política de Cookies</a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-ai-purple transition-colors">Diretrizes de IA</a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t mt-12 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} NOVAIA. Todos os direitos reservados.
          </p>
          <div className="mt-4 md:mt-0">
            <ul className="flex space-x-4 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-ai-purple transition-colors">Termos</a>
              </li>
              <li>
                <a href="#" className="hover:text-ai-purple transition-colors">Privacidade</a>
              </li>
              <li>
                <a href="#" className="hover:text-ai-purple transition-colors">Cookies</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
