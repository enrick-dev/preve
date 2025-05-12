import React from 'react';
import { Separator } from '@/components/ui/separator';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { formatCurrency } from '@/utils/calculations';
import { AlertTriangle, CheckCircle, Info, ShoppingCart } from 'lucide-react';

export type FormData = {
  expectedSales: number;
  currentInventory: number;
  desiredCoverage: number;
};

export type CalculationResult = {
  idealInventory: number;
  purchaseSuggestion: number;
  status: 'adequate' | 'need-to-buy' | 'excess' | 'critical-need-to-buy';
};

type Scenario = {
  id: number;
  inputs: FormData;
  result: CalculationResult;
  mode: 'reais' | 'unidades';
};

type OtbScenariosProps = {
  scenarios: Scenario[];
  loadScenario: (scenario: Scenario) => void;
};

const getStatusInfo = (status: string) => {
  switch (status) {
    case 'critical-need-to-buy':
      return {
        icon: <ShoppingCart className="h-5 w-5 text-red-800" />,
        title: 'Precisa Comprar Urgente',
        color: 'bg-red-50',
      };
    case 'need-to-buy':
      return {
        icon: <ShoppingCart className="h-5 w-5 text-red-800" />,
        title: 'Precisa Comprar',
        color: 'bg-red-50',
      };
    case 'excess':
      return {
        icon: <AlertTriangle className="h-5 w-5 text-amber-500" />,
        title: 'Estoque Excedente',
        color: 'bg-amber-50',
      };
    case 'adequate':
      return {
        icon: <CheckCircle className="h-5 w-5 text-green-800" />,
        title: 'Estoque Adequado',
        color: 'bg-green-50',
      };
    default:
      return {
        icon: <Info className="h-5 w-5" />,
        title: 'Informação',
        color: 'bg-text-primary',
      };
  }
};

export const OtbScenarios: React.FC<OtbScenariosProps> = ({
  scenarios,
  loadScenario,
}) => {
  return (
    <Card className="py-3">
      <CardHeader>
        <CardTitle>Cenários Salvos</CardTitle>
        <CardDescription>
          Histórico de cálculos realizados nesta sessão
        </CardDescription>
      </CardHeader>
      <CardContent className="px-2">
        {scenarios.length > 0 ? (
          <div className="grid gap-4">
            {scenarios.map((scenario, index) => (
              <div
                key={scenario.id}
                className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer"
                onClick={() => loadScenario(scenario)}
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium">Cenário {index + 1}</h3>
                  <span
                    className={`text-sm px-2 py-1 rounded-full ${
                      getStatusInfo(scenario.result.status).color
                    }`}
                  >
                    {getStatusInfo(scenario.result.status).title}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <p className="text-gray-500">Vendas Esperadas:</p>
                    <p>
                      {scenario.mode === 'reais' && 'R$ '}
                      {scenario.inputs.expectedSales}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500">Estoque Atual:</p>
                    <p>
                      {scenario.mode === 'reais' && 'R$ '}
                      {scenario.inputs.currentInventory}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500">Cobertura (semanas):</p>
                    <p>{scenario.inputs.desiredCoverage}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Sugestão de Compra:</p>
                    <p>
                      {scenario.mode === 'reais'
                        ? formatCurrency(scenario.result.purchaseSuggestion)
                        : scenario.result.purchaseSuggestion}
                    </p>
                  </div>
                </div>
                <Separator className="my-2" />
                <div className="text-sm text-blue-600">
                  Clique para carregar este cenário
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center p-6">
            <p className="text-gray-500">
              Nenhum cenário salvo ainda. Faça cálculos na aba Calculadora para
              salvá-los aqui.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
