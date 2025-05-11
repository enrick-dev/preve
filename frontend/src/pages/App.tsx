import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

function App() {
  return (
    <div className="flex justify-center items-center h-full">
      <div className="gap-2 flex flex-col items-center">
        <h1>
          Exemplo de pagina inicial, acesse o OTB pela barra de navegação ou
          clicando aqui...
        </h1>
        <Link to="/otb">
          <Button>OTB</Button>
        </Link>
      </div>
    </div>
  );
}

export default App;
