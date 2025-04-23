
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
      variant="outline"
      size="sm" 
      className="fixed bottom-4 right-4 z-50 flex items-center gap-2 shadow-md"
      onClick={() => navigate('/admin')}
    >
      <ShieldCheck className="h-4 w-4" />
      Painel Admin
    </Button>
  );
};

export default AdminButton;
