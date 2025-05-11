import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <h1 className="text-9xl font-bold mb-2">404</h1>
        <p className="text-2xl text-muted-foreground mb-4 font-light">
          Ops! Pagina não encontrada
        </p>
        <Link to="/" className="cursor-pointer">
          <Button>Voltar para pagina inicial</Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
