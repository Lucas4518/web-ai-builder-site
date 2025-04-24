
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { InfoIcon, Loader2 } from "lucide-react";

const Auth = () => {
  const [email, setEmail] = useState("admin@admin.com");
  const [password, setPassword] = useState("admin");
  const [loading, setLoading] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Check if user is already authenticated
  useEffect(() => {
    const checkUser = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          // If already authenticated, check if admin
          const { data } = await supabase
            .from('user_roles')
            .select('role')
            .eq('user_id', user.id)
            .single();
            
          if (data?.role === 'admin') {
            toast({
              title: "Autenticado como administrador",
              description: "Redirecionando para o painel admin...",
            });
            navigate("/admin");
          }
        }
      } catch (error) {
        console.error("Erro ao verificar autenticação:", error);
      } finally {
        setCheckingAuth(false);
      }
    };
    
    checkUser();
  }, [navigate, toast]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      console.log("Tentando login com:", { email, password });
      
      // Primeiro, faça logout para garantir uma sessão limpa
      await supabase.auth.signOut();
      
      // Tente fazer login
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error("Erro de autenticação:", error);
        throw error;
      }

      console.log("Login bem-sucedido:", data);

      // Aguarde um momento para garantir que a sessão seja estabelecida
      await new Promise(resolve => setTimeout(resolve, 500));

      // Check if user is admin
      const { data: roleData, error: roleError } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', data.user.id)
        .single();
      
      console.log("Dados de função do usuário:", roleData);
        
      if (roleError) {
        console.error("Erro ao verificar função de usuário:", roleError);
        toast({
          title: "Acesso não autorizado",
          description: "Sua conta não tem permissões de administrador",
          variant: "destructive",
        });
        return;
      }
      
      if (roleData?.role === 'admin') {
        toast({
          title: "Login realizado com sucesso!",
          description: "Bem-vindo ao painel de administração!",
        });
        navigate("/admin");
      } else {
        toast({
          title: "Acesso não autorizado",
          description: "Sua conta não tem permissões de administrador",
          variant: "destructive",
        });
      }
    } catch (error: any) {
      console.error("Erro completo:", error);
      toast({
        title: "Erro ao fazer login",
        description: error.message || "Credenciais inválidas",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            role: 'user' // Definindo um papel padrão
          }
        }
      });

      if (error) throw error;

      toast({
        title: "Cadastro realizado com sucesso!",
        description: "Verifique seu email para confirmar o cadastro.",
      });
    } catch (error: any) {
      toast({
        title: "Erro ao criar conta",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (checkingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p>Verificando autenticação...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md p-8 space-y-6 bg-card rounded-lg shadow-lg">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Bem-vindo</h1>
          <p className="text-muted-foreground">Faça login ou crie sua conta</p>
        </div>

        <Alert className="bg-yellow-50 border-yellow-200">
          <InfoIcon className="h-4 w-4 text-yellow-600" />
          <AlertDescription className="text-yellow-800 font-medium">
            Para acessar o painel admin, use:<br />
            Email: admin@admin.com<br />
            Senha: admin
          </AlertDescription>
        </Alert>

        <form className="space-y-4" onSubmit={handleLogin}>
          <div className="space-y-2">
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              className="bg-white"
            />
          </div>
          <div className="space-y-2">
            <Input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              className="bg-white"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <Button 
              type="submit"
              disabled={loading}
              className="w-full text-base py-5"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Carregando...
                </>
              ) : "Entrar"}
            </Button>
            <Button 
              onClick={handleSignUp}
              variant="outline" 
              disabled={loading}
              className="w-full"
              type="button"
            >
              Criar conta
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Auth;
