import { AlertTriangle, CheckCircle, Info, ShoppingCart } from 'lucide-react';

export const getStatusInfo = (status: string) => {
  switch (status) {
    case 'critical-need-to-buy':
      return {
        icon: <ShoppingCart className="h-5 w-5 text-red-800" />,
        title: 'Precisa Comprar Urgente',
        description:
          'O estoque atual está muito abaixo do ideal podendo atrapalhar a operação.',
        color: 'bg-red-50 border-red-200 text-red-800',
      };
    case 'need-to-buy':
      return {
        icon: <ShoppingCart className="h-5 w-5 text-red-800" />,
        title: 'Precisa Comprar',
        description:
          'O estoque atual está abaixo do ideal para a cobertura desejada.',
        color: 'bg-red-50 border-red-200 text-red-800',
      };
    case 'excess':
      return {
        icon: <AlertTriangle className="h-5 w-5 text-amber-500" />,
        title: 'Estoque Excedente',
        description:
          'O estoque atual está significativamente acima do necessário.',
        color: 'bg-amber-50 border-amber-200 text-amber-800',
      };
    case 'adequate':
      return {
        icon: <CheckCircle className="h-5 w-5 text-green-800" />,
        title: 'Estoque Adequado',
        description: 'O estoque atual está dentro dos parâmetros ideais.',
        color: 'bg-green-50 border-green-200 text-green-800',
      };
    default:
      return {
        icon: <Info className="h-5 w-5" />,
        title: 'Informação',
        description: 'Preencha os campos e calcule para ver o resultado.',
        color: 'bg-text-primary border-text-primary text-primary',
      };
  }
};
