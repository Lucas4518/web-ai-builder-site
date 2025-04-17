
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PlusCircle, Edit, Trash2, Loader2, RefreshCcw } from 'lucide-react';
import { toast } from "sonner";
import { supabase } from '@/integrations/supabase/client';

// Interface para serviços baseada na tabela do Supabase
interface Servico {
  id: number;
  created_at: string;
  nome?: string;
  duracao?: string;
  complexidade?: string;
}

const ServicesManagement = () => {
  const [services, setServices] = useState<Servico[]>([]);
  const [newService, setNewService] = useState({ nome: '', duracao: '', complexidade: '' });
  const [editingService, setEditingService] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  // Função para buscar serviços do Supabase
  const fetchServices = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('Serviços')
        .select('*')
        .order('id', { ascending: false });
      
      if (error) {
        throw error;
      }
      
      console.log('Serviços carregados:', data);
      setServices(data || []);
      toast.success("Serviços carregados com sucesso!");
    } catch (error) {
      console.error('Erro ao carregar serviços:', error);
      toast.error(`Erro ao carregar serviços: ${(error as any).message}`);
    } finally {
      setLoading(false);
    }
  };

  // Funções para gerenciar serviços
  const addService = async () => {
    if (newService.nome && newService.duracao && newService.complexidade) {
      try {
        if (editingService !== null) {
          // Atualizar serviço existente
          const { error } = await supabase
            .from('Serviços')
            .update({
              nome: newService.nome,
              duracao: newService.duracao,
              complexidade: newService.complexidade
            })
            .eq('id', editingService);
          
          if (error) throw error;
          toast.success("Serviço atualizado com sucesso!");
          setEditingService(null);
        } else {
          // Adicionar novo serviço
          const { error } = await supabase
            .from('Serviços')
            .insert({
              nome: newService.nome,
              duracao: newService.duracao,
              complexidade: newService.complexidade
            });
          
          if (error) throw error;
          toast.success("Serviço adicionado com sucesso!");
        }
        
        // Limpar formulário e recarregar serviços
        setNewService({ nome: '', duracao: '', complexidade: '' });
        fetchServices();
      } catch (error) {
        console.error('Erro ao processar serviço:', error);
        toast.error(`Erro: ${(error as any).message}`);
      }
    } else {
      toast.error("Por favor, preencha todos os campos.");
    }
  };

  const editService = (id: number) => {
    const service = services.find(s => s.id === id);
    if (service) {
      setNewService({
        nome: service.nome || '',
        duracao: service.duracao || '',
        complexidade: service.complexidade || ''
      });
      setEditingService(id);
    }
  };

  const deleteService = async (id: number) => {
    try {
      const { error } = await supabase
        .from('Serviços')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      toast.success("Serviço removido com sucesso!");
      fetchServices();
    } catch (error) {
      console.error('Erro ao remover serviço:', error);
      toast.error(`Erro ao remover serviço: ${(error as any).message}`);
    }
  };

  // Carregar serviços quando o componente montar
  useEffect(() => {
    fetchServices();
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Gerenciar Serviços</CardTitle>
        <CardDescription>
          Adicione, edite ou remova serviços do sistema.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="service-name">Nome do Serviço</Label>
            <Input 
              id="service-name" 
              value={newService.nome} 
              onChange={(e) => setNewService({...newService, nome: e.target.value})}
              placeholder="Nome do serviço"
            />
          </div>
          <div>
            <Label htmlFor="service-duration">Duração</Label>
            <Input 
              id="service-duration" 
              value={newService.duracao} 
              onChange={(e) => setNewService({...newService, duracao: e.target.value})}
              placeholder="Ex: 2 semanas"
            />
          </div>
          <div>
            <Label htmlFor="service-complexity">Complexidade</Label>
            <Input 
              id="service-complexity" 
              value={newService.complexidade} 
              onChange={(e) => setNewService({...newService, complexidade: e.target.value})}
              placeholder="Baixa, Média, Alta"
            />
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <Button onClick={addService} className="flex items-center gap-2">
            <PlusCircle className="h-4 w-4" />
            {editingService !== null ? 'Atualizar Serviço' : 'Adicionar Serviço'}
          </Button>
          
          <Button 
            variant="outline"
            onClick={fetchServices} 
            disabled={loading}
            className="flex items-center gap-2"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCcw className="h-4 w-4" />}
            Atualizar Lista
          </Button>
        </div>
        
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Duração</TableHead>
              <TableHead>Complexidade</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-8">
                  <div className="flex justify-center items-center">
                    <Loader2 className="h-6 w-6 animate-spin mr-2" />
                    <span>Carregando serviços...</span>
                  </div>
                </TableCell>
              </TableRow>
            ) : services.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center">Nenhum serviço cadastrado</TableCell>
              </TableRow>
            ) : (
              services.map((service) => (
                <TableRow key={service.id}>
                  <TableCell>{service.nome || 'N/A'}</TableCell>
                  <TableCell>{service.duracao || 'N/A'}</TableCell>
                  <TableCell>{service.complexidade || 'N/A'}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" onClick={() => editService(service.id)}>
                        <Edit className="h-4 w-4" />
                        <span className="sr-only">Editar</span>
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => deleteService(service.id)}>
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Excluir</span>
                      </Button>
                    </div>
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

export default ServicesManagement;
