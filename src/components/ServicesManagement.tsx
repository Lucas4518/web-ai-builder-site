
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PlusCircle, Edit, Trash2 } from 'lucide-react';
import { toast } from "sonner";

// Dados simulados para serviços
const initialServices = [
  { id: 1, name: 'Integração de Sistemas', duration: '2 semanas', complexity: 'Média' },
  { id: 2, name: 'Implantação de IA', duration: '4 semanas', complexity: 'Alta' },
  { id: 3, name: 'Suporte Técnico', duration: 'Contínuo', complexity: 'Baixa' },
  { id: 4, name: 'Consultoria Estratégica', duration: 'Variável', complexity: 'Alta' },
];

const ServicesManagement = () => {
  const [services, setServices] = useState(initialServices);
  const [newService, setNewService] = useState({ name: '', duration: '', complexity: '' });
  const [editingService, setEditingService] = useState<number | null>(null);

  // Funções para gerenciar serviços
  const addService = () => {
    if (newService.name && newService.duration && newService.complexity) {
      if (editingService !== null) {
        // Atualizar serviço existente
        setServices(services.map(service => 
          service.id === editingService 
          ? { ...service, name: newService.name, duration: newService.duration, complexity: newService.complexity }
          : service
        ));
        toast.success("Serviço atualizado com sucesso!");
        setEditingService(null);
      } else {
        // Adicionar novo serviço
        const id = services.length > 0 ? Math.max(...services.map(s => s.id)) + 1 : 1;
        setServices([...services, { id, ...newService }]);
        toast.success("Serviço adicionado com sucesso!");
      }
      setNewService({ name: '', duration: '', complexity: '' });
    } else {
      toast.error("Por favor, preencha todos os campos.");
    }
  };

  const editService = (id: number) => {
    const service = services.find(s => s.id === id);
    if (service) {
      setNewService({ name: service.name, duration: service.duration, complexity: service.complexity });
      setEditingService(id);
    }
  };

  const deleteService = (id: number) => {
    setServices(services.filter(service => service.id !== id));
    toast.success("Serviço removido com sucesso!");
  };

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
              value={newService.name} 
              onChange={(e) => setNewService({...newService, name: e.target.value})}
              placeholder="Nome do serviço"
            />
          </div>
          <div>
            <Label htmlFor="service-duration">Duração</Label>
            <Input 
              id="service-duration" 
              value={newService.duration} 
              onChange={(e) => setNewService({...newService, duration: e.target.value})}
              placeholder="Ex: 2 semanas"
            />
          </div>
          <div>
            <Label htmlFor="service-complexity">Complexidade</Label>
            <Input 
              id="service-complexity" 
              value={newService.complexity} 
              onChange={(e) => setNewService({...newService, complexity: e.target.value})}
              placeholder="Baixa, Média, Alta"
            />
          </div>
        </div>
        
        <Button onClick={addService} className="flex items-center gap-2">
          <PlusCircle className="h-4 w-4" />
          {editingService !== null ? 'Atualizar Serviço' : 'Adicionar Serviço'}
        </Button>
        
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
            {services.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center">Nenhum serviço cadastrado</TableCell>
              </TableRow>
            ) : (
              services.map((service) => (
                <TableRow key={service.id}>
                  <TableCell>{service.name}</TableCell>
                  <TableCell>{service.duration}</TableCell>
                  <TableCell>{service.complexity}</TableCell>
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
