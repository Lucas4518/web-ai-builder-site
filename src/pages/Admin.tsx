import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PlusCircle, Edit, Trash2 } from 'lucide-react';
import { toast } from "sonner";
import UsersManagement from '@/components/UsersManagement';

// Dados simulados para produtos
const initialProducts = [
  { id: 1, name: 'Análise de Dados Básica', price: 'R$ 1.500', category: 'Serviço' },
  { id: 2, name: 'Consultoria de IA', price: 'R$ 3.000', category: 'Serviço' },
  { id: 3, name: 'Licença de Software', price: 'R$ 500/mês', category: 'Produto' },
  { id: 4, name: 'Treinamento Personalizado', price: 'R$ 2.000', category: 'Serviço' },
];

// Dados simulados para serviços
const initialServices = [
  { id: 1, name: 'Integração de Sistemas', duration: '2 semanas', complexity: 'Média' },
  { id: 2, name: 'Implantação de IA', duration: '4 semanas', complexity: 'Alta' },
  { id: 3, name: 'Suporte Técnico', duration: 'Contínuo', complexity: 'Baixa' },
  { id: 4, name: 'Consultoria Estratégica', duration: 'Variável', complexity: 'Alta' },
];

const Admin = () => {
  const navigate = useNavigate();
  const [products, setProducts] = React.useState(initialProducts);
  const [services, setServices] = React.useState(initialServices);
  
  // Estado para formulário de produto
  const [newProduct, setNewProduct] = React.useState({ name: '', price: '', category: '' });
  const [editingProduct, setEditingProduct] = React.useState<number | null>(null);
  
  // Estado para formulário de serviço
  const [newService, setNewService] = React.useState({ name: '', duration: '', complexity: '' });
  const [editingService, setEditingService] = React.useState<number | null>(null);

  // Funções para gerenciar produtos
  const addProduct = () => {
    if (newProduct.name && newProduct.price && newProduct.category) {
      if (editingProduct !== null) {
        // Atualizar produto existente
        setProducts(products.map(product => 
          product.id === editingProduct 
          ? { ...product, name: newProduct.name, price: newProduct.price, category: newProduct.category }
          : product
        ));
        toast.success("Produto atualizado com sucesso!");
        setEditingProduct(null);
      } else {
        // Adicionar novo produto
        const id = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
        setProducts([...products, { id, ...newProduct }]);
        toast.success("Produto adicionado com sucesso!");
      }
      setNewProduct({ name: '', price: '', category: '' });
    } else {
      toast.error("Por favor, preencha todos os campos.");
    }
  };

  const editProduct = (id: number) => {
    const product = products.find(p => p.id === id);
    if (product) {
      setNewProduct({ name: product.name, price: product.price, category: product.category });
      setEditingProduct(id);
    }
  };

  const deleteProduct = (id: number) => {
    setProducts(products.filter(product => product.id !== id));
    toast.success("Produto removido com sucesso!");
  };

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
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Painel de Administração</h1>
        <Button variant="outline" onClick={() => navigate('/')}>Voltar para o Site</Button>
      </div>

      <Tabs defaultValue="products" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="products">Produtos</TabsTrigger>
          <TabsTrigger value="services">Serviços</TabsTrigger>
          <TabsTrigger value="users">Usuários (Supabase)</TabsTrigger>
        </TabsList>

        <TabsContent value="products">
          <Card>
            <CardHeader>
              <CardTitle>Gerenciar Produtos</CardTitle>
              <CardDescription>
                Adicione, edite ou remova produtos do sistema.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="product-name">Nome do Produto</Label>
                  <Input 
                    id="product-name" 
                    value={newProduct.name} 
                    onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                    placeholder="Nome do produto"
                  />
                </div>
                <div>
                  <Label htmlFor="product-price">Preço</Label>
                  <Input 
                    id="product-price" 
                    value={newProduct.price} 
                    onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                    placeholder="Ex: R$ 1.500"
                  />
                </div>
                <div>
                  <Label htmlFor="product-category">Categoria</Label>
                  <Input 
                    id="product-category" 
                    value={newProduct.category} 
                    onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                    placeholder="Categoria"
                  />
                </div>
              </div>
              
              <Button onClick={addProduct} className="flex items-center gap-2">
                <PlusCircle className="h-4 w-4" />
                {editingProduct !== null ? 'Atualizar Produto' : 'Adicionar Produto'}
              </Button>
              
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Preço</TableHead>
                    <TableHead>Categoria</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center">Nenhum produto cadastrado</TableCell>
                    </TableRow>
                  ) : (
                    products.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell>{product.name}</TableCell>
                        <TableCell>{product.price}</TableCell>
                        <TableCell>{product.category}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="icon" onClick={() => editProduct(product.id)}>
                              <Edit className="h-4 w-4" />
                              <span className="sr-only">Editar</span>
                            </Button>
                            <Button variant="ghost" size="icon" onClick={() => deleteProduct(product.id)}>
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
        </TabsContent>

        <TabsContent value="services">
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
        </TabsContent>

        <TabsContent value="users">
          <UsersManagement />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Admin;
