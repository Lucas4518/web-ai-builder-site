import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { BrainIcon, Menu, X } from 'lucide-react';
import AuthButton from './AuthButton';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed w-full bg-background/80 backdrop-blur-md z-50 py-4 border-b border-border">
      <div className="container flex items-center justify-between">
        <a href="#" className="flex items-center gap-2 text-xl font-bold">
          <BrainIcon className="h-6 w-6 text-ai-purple" />
          <span>NOVA<span className="text-ai-purple">IA</span></span>
        </a>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <a href="#recursos" className="text-sm font-medium hover:text-ai-purple transition-colors">
            Recursos
          </a>
          <a href="#como-funciona" className="text-sm font-medium hover:text-ai-purple transition-colors">
            Como Funciona
          </a>
          <a href="#planos" className="text-sm font-medium hover:text-ai-purple transition-colors">
            Planos
          </a>
          <a href="#contato" className="text-sm font-medium hover:text-ai-purple transition-colors">
            Contato
          </a>
          <AuthButton />
        </div>
        
        <div className="hidden md:flex items-center gap-4">
          <Button variant="outline" size="sm">Entrar</Button>
          <Button size="sm" className="bg-ai-purple hover:bg-ai-purple-dark">Começar Grátis</Button>
        </div>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? 
            <X className="h-6 w-6" /> : 
            <Menu className="h-6 w-6" />
          }
        </button>
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-16 inset-x-0 bg-background border-b border-border p-4 flex flex-col gap-4 animate-fade-in">
          <a href="#recursos" 
            className="text-sm font-medium p-2 hover:bg-muted rounded-md"
            onClick={() => setMobileMenuOpen(false)}
          >
            Recursos
          </a>
          <a href="#como-funciona" 
            className="text-sm font-medium p-2 hover:bg-muted rounded-md"
            onClick={() => setMobileMenuOpen(false)}
          >
            Como Funciona
          </a>
          <a href="#planos" 
            className="text-sm font-medium p-2 hover:bg-muted rounded-md"
            onClick={() => setMobileMenuOpen(false)}
          >
            Planos
          </a>
          <a href="#contato" 
            className="text-sm font-medium p-2 hover:bg-muted rounded-md"
            onClick={() => setMobileMenuOpen(false)}
          >
            Contato
          </a>
          <AuthButton />
        </div>
      )}
    </nav>
  );
};

export default Navbar;
