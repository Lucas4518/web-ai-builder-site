
import React, { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Loader2, RefreshCcw } from 'lucide-react';

// Interface atualizada conforme as colunas da tabela usuários no Supabase
interface Usuario {
  id: number;
  created_at: string;
  Pedro: string | null; // Campo conforme visualizado no seu esquema de banco de dados
  [key: string]: any; // Para outros campos que possam existir
}

const UsersManagement = () => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchUsuarios = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('usuários') // Nome correto da tabela com acento
        .select('*');
      
      if (error) {
        throw error;
      }
      
      setUsuarios(data || []);
      toast.success('Usuários carregados com sucesso!');
      console.log('Dados carregados:', data); // Log para debug
    } catch (error) {
      console.error('Erro ao carregar usuários:', error);
      toast.error(`Erro ao carregar usuários: ${(error as any).message}`);
    } finally {
      setLoading(false);
    }
  };

  // Carregar dados automaticamente quando o componente montar
  React.useEffect(() => {
    fetchUsuarios();
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Gerenciar Usuários</CardTitle>
        <CardDescription>
          Visualize e gerencie os usuários cadastrados no sistema.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Button 
          onClick={fetchUsuarios} 
          disabled={loading}
          className="flex items-center gap-2"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCcw className="h-4 w-4" />}
          Atualizar Usuários
        </Button>
        
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Data de Criação</TableHead>
              <TableHead>Nome</TableHead>
              <TableHead>Detalhes</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {usuarios.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center">
                  {loading ? 'Carregando usuários...' : 'Nenhum usuário encontrado. Adicione usuários no Supabase.'}
                </TableCell>
              </TableRow>
            ) : (
              usuarios.map((usuario) => (
                <TableRow key={usuario.id}>
                  <TableCell>{usuario.id}</TableCell>
                  <TableCell>{new Date(usuario.created_at).toLocaleString('pt-BR')}</TableCell>
                  <TableCell>{usuario.Pedro || 'N/A'}</TableCell>
                  <TableCell>
                    <pre className="text-xs overflow-auto max-h-20 p-2 bg-gray-100 rounded">
                      {JSON.stringify(usuario, null, 2)}
                    </pre>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default UsersManagement;
