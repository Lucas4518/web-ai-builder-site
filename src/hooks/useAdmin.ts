
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

export const useAdmin = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAdminStatus = async () => {
      try {
        setLoading(true);
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) {
          console.log("Nenhum usuário logado");
          setIsAdmin(false);
          return;
        }

        console.log("Verificando status de administrador para o usuário:", user.id);

        // Teste direto para o usuário admin@admin.com
        if (user.email === 'admin@admin.com') {
          console.log("Email é admin@admin.com, definindo como administrador");
          setIsAdmin(true);
          return;
        }

        const { data, error } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', user.id)
          .single();

        if (error) {
          console.error('Erro ao verificar status de administrador:', error);
          setIsAdmin(false);
          return;
        }
        
        console.log("Dados de função do usuário:", data);
        setIsAdmin(data?.role === 'admin');
      } catch (error) {
        console.error('Erro ao verificar status de administrador:', error);
        setIsAdmin(false);
      } finally {
        setLoading(false);
      }
    };

    checkAdminStatus();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
      checkAdminStatus();
    });

    return () => subscription.unsubscribe();
  }, []);

  return { isAdmin, loading };
};
