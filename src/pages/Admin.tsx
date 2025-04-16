import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PlusCircle, Edit, Trash2, Loader2 } from 'lucide-react';
import { toast } from "sonner";
import UsersManagement from '@/components/UsersManagement';
import { supabase } from '@/integrations/supabase/client';
import ServicesManagement from '@/components/ServicesManagement';

// Product type definition
interface Product {
  id: number;
  nome: string;
  preco: number;
  descricao: string;
}

const Admin = () => {
  const navigate = useNavigate();
  const [products, setProducts] = React.useState<Product[]>([]);
  const [loadingProducts, setLoadingProducts] = React.useState(false);
  
  // Estado para formulário de produto
  const [newProduct, setNewProduct] = React.useState({ nome: '', preco: '', descricao: '' });
  const [editingProduct, setEditingProduct] = React.useState<number | null>(null);
  
  // Estado para formulário de serviço
  const [services, setServices] = React.useState([
    { id: 1, name: 'Integração de Sistemas', duration: '2 semanas', complexity: 'Média' },
    { id: 2, name: 'Implantação de IA', duration: '4 semanas', complexity: 'Alta' },
    { id: 3, name: 'Suporte Técnico', duration: 'Contínuo', complexity: 'Baixa' },
    { id: 4, name: 'Consultoria Estratégica', duration: 'Variável', complexity: 'Alta' },
  ]);
  const [newService, setNewService] = React.useState({ name: '', duration: '', complexity: '' });
  const [editingService, setEditingService] = React.useState<number | null>(null);

  // Fetch products from Supabase
  const fetchProducts = async () => {
    setLoadingProducts(true);
    try {
      const { data, error } = await supabase
        .from('produtos')
        .select('*')
        .order('id', { ascending: false });
      
      if (error) {
        throw error;
      }
      
      setProducts(data || []);
    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error(`Erro ao carregar produtos: ${(error as any).message}`);
    } finally {
      setLoadingProducts(false);
    }
  };

  // Load products on component mount
  useEffect(() => {
    fetchProducts();
  }, []);

  // Add or update product
  const addProduct = async () => {
    if (newProduct.nome && newProduct.preco) {
      try {
        if (editingProduct !== null) {
          // Update existing product
          const { error } = await supabase
            .from('produtos')
            .update({ 
              nome: newProduct.nome, 
              preco: parseFloat(newProduct.preco),
              descricao: newProduct.descricao 
            })
            .eq('id', editingProduct);
          
          if (error) throw error;
          toast.success("Produto atualizado com sucesso!");
          setEditingProduct(null);
        } else {
          // Add new product
          const { error } = await supabase
            .from('produtos')
            .insert({ 
              nome: newProduct.nome, 
              preco: parseFloat(newProduct.preco),
              descricao: newProduct.descricao 
            });
          
          if (error) throw error;
          toast.success("Produto adicionado com sucesso!");
        }
        
        // Reset form and reload products
        setNewProduct({ nome: '', preco: '', descricao: '' });
        fetchProducts();
      } catch (error) {
        console.error('Error handling product:', error);
        toast.error(`Erro ao processar produto: ${(error as any).message}`);
      }
    } else {
      toast.error("Por favor, preencha os campos nome e preço.");
    }
  };

  // Edit product
  const editProduct = (id: number) => {
    const product = products.find(p => p.id === id);
    if (product) {
      setNewProduct({ 
        nome: product.nome, 
        preco: product.preco.toString(), 
        descricao: product.descricao || '' 
      });
      setEditingProduct(id);
    }
  };

  // Delete product
  const deleteProduct = async (id: number) => {
    try {
      const { error } = await supabase
        .from('produtos')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      toast.success("Produto removido com sucesso!");
      fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
      toast.error(`Erro ao remover produto: ${(error as any).message}`);
    }
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
                    value={newProduct.nome} 
                    onChange={(e) => setNewProduct({...newProduct, nome: e.target.value})}
                    placeholder="Nome do produto"
                  />
                </div>
                <div>
                  <Label htmlFor="product-price">Preço</Label>
                  <Input 
                    id="product-price" 
                    value={newProduct.preco} 
                    onChange={(e) => setNewProduct({...newProduct, preco: e.target.value})}
                    placeholder="Ex: 1500.00"
                    type="number"
                    step="0.01"
                  />
                </div>
                <div className="md:col-span-3">
                  <Label htmlFor="product-description">Descrição</Label>
                  <Textarea 
                    id="product-description" 
                    value={newProduct.descricao} 
                    onChange={(e) => setNewProduct({...newProduct, descricao: e.target.value})}
                    placeholder="Descrição do produto"
                    className="h-24"
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
                    <TableHead>Descrição</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loadingProducts ? (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center py-8">
                        <div className="flex justify-center items-center">
                          <Loader2 className="h-6 w-6 animate-spin mr-2" />
                          <span>Carregando produtos...</span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : products.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center">Nenhum produto cadastrado</TableCell>
                    </TableRow>
                  ) : (
                    products.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell>{product.nome}</TableCell>
                        <TableCell>R$ {product.preco.toFixed(2)}</TableCell>
                        <TableCell className="truncate max-w-xs">{product.descricao}</TableCell>
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
          <ServicesManagement />
        </TabsContent>

        <TabsContent value="users">
          <UsersManagement />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Admin;
