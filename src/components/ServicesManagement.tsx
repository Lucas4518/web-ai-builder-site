
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PlusCircle, Edit, Trash2, Loader2, RefreshCcw } from 'lucide-react';
import { toast } from "sonner";
import { supabase } from '@/integrations/supabase/client';

// Updated interface to match our database schema
interface Servico {
  id: number;
  created_at: string;
}

const ServicesManagement = () => {
  const [services, setServices] = useState<Servico[]>([]);
  const [newService, setNewService] = useState({ nome: '', duracao: '', complexidade: '' });
  const [editingService, setEditingService] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchServices = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('Serviços')
        .select('*')
        .order('id', { ascending: false });
      
      if (error) throw error;
      setServices(data || []);
      toast.success("Serviços carregados com sucesso!");
    } catch (error) {
      console.error('Erro ao carregar serviços:', error);
      toast.error(`Erro ao carregar serviços: ${(error as any).message}`);
    } finally {
      setLoading(false);
    }
  };

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
        
        <Button 
          variant="outline"
          onClick={fetchServices} 
          disabled={loading}
          className="flex items-center gap-2"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCcw className="h-4 w-4" />}
          Atualizar Lista
        </Button>
        
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Data de Criação</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={2} className="text-center py-8">
                  <div className="flex justify-center items-center">
                    <Loader2 className="h-6 w-6 animate-spin mr-2" />
                    <span>Carregando serviços...</span>
                  </div>
                </TableCell>
              </TableRow>
            ) : services.length === 0 ? (
              <TableRow>
                <TableCell colSpan={2} className="text-center">Nenhum serviço cadastrado</TableCell>
              </TableRow>
            ) : (
              services.map((service) => (
                <TableRow key={service.id}>
                  <TableCell>{service.id}</TableCell>
                  <TableCell>{new Date(service.created_at).toLocaleString('pt-BR')}</TableCell>
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
