
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ShieldCheck } from 'lucide-react';
import { useAdmin } from '@/hooks/useAdmin';
import { supabase } from '@/integrations/supabase/client';

const AdminButton = () => {
  const navigate = useNavigate();
  const { isAdmin, loading } = useAdmin();
  const [user, setUser] = useState(null);
  
  // Verificar se o usuário está autenticado
  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    
    getUser();
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
      getUser();
    });
    
    return () => subscription.unsubscribe();
  }, []);
  
  if (loading) return null;
  
  // Se não for admin ou não estiver autenticado, mostrar botão para login
  if (!isAdmin) {
    return (
      <Button 
        variant="outline"
        size="lg"
        className="fixed bottom-4 right-4 z-50 flex items-center gap-2 shadow-md"
        onClick={() => navigate('/auth')}
      >
        <ShieldCheck className="h-5 w-5" />
        Login Admin
      </Button>
    );
  }
  
  return (
    <Button 
      variant="default"
      size="lg"
      className="fixed bottom-4 right-4 z-50 flex items-center gap-2 shadow-md bg-primary text-primary-foreground hover:bg-primary/90"
      onClick={() => navigate('/admin')}
    >
      <ShieldCheck className="h-5 w-5" />
      Painel Admin
    </Button>
  );
};

export default AdminButton;
