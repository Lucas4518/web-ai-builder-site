
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ShieldCheck } from 'lucide-react';
import { useAdmin } from '@/hooks/useAdmin';

const AdminButton = () => {
  const navigate = useNavigate();
  const { isAdmin } = useAdmin();
  
  if (!isAdmin) return null;
  
  return (
    <Button 
      variant="default"
      size="lg"
      className="fixed bottom-4 right-4 z-50 flex items-center gap-2 shadow-md bg-primary text-primary-foreground hover:bg-primary/90 animate-pulse"
      onClick={() => navigate('/admin')}
    >
      <ShieldCheck className="h-5 w-5" />
      Painel Admin
    </Button>
  );
};

export default AdminButton;
