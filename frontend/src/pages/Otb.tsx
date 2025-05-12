import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { calculatePurchase, formatCurrency } from '@/utils/calculations';
import { Info } from 'lucide-react';
import {
  OtbCalculator,
  schema,
  type FormData,
} from '@/components/otb/otb-calculator';
import { OtbScenarios } from '@/components/otb/otb-scenarios';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ResultCard } from '@/components/result-card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { getStatusInfo } from '@/utils/statusInfo';

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

const DEFAULT_VALUES: FormData = {
  expectedSales: 0,
  currentInventory: 0,
  desiredCoverage: 4,
};

const Otb = () => {
  const [result, setResult] = React.useState<CalculationResult | null>(null);
  const [scenarios, setScenarios] = React.useState<Scenario[]>([]);
  const [activeTab, setActiveTab] = React.useState('calculator');
  const [mode, setMode] = React.useState<'reais' | 'unidades'>('reais');

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: DEFAULT_VALUES,
  });

  const onSubmit = (values: FormData) => {
    const newResult = calculatePurchase(
      values.expectedSales,
      values.currentInventory,
      values.desiredCoverage,
    );
    setResult(newResult);
    setScenarios((prev) => [
      ...prev,
      { id: Date.now(), inputs: values, result: newResult, mode },
    ]);
  };

  const clearForm = () => {
    form.reset(DEFAULT_VALUES);
    setMode('reais');
    setResult(null);
  };

  const loadScenario = (scenario: Scenario) => {
    form.reset(scenario.inputs);
    setMode(scenario.mode);
    setResult(scenario.result);
    setActiveTab('calculator');
  };

  const formatBRL = (value: number) =>
    value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  return (
    <Tabs
      value={activeTab}
      onValueChange={setActiveTab}
      className="w-full px-10 py-10 items-center max-md:px-3 max-md:py-4"
    >
      <TabsList className="grid w-full max-w-5xl grid-cols-2 mb-6 max-md:mb-1">
        <TabsTrigger value="calculator">Calculadora</TabsTrigger>
        <TabsTrigger value="scenarios">Cenários Salvos</TabsTrigger>
      </TabsList>

      <TabsContent
        value="calculator"
        className="w-full max-w-5xl grid gap-6 md:grid-cols-2"
      >
        <OtbCalculator
          mode={mode}
          setMode={setMode}
          onSubmit={onSubmit}
          clearForm={clearForm}
          form={form}
          formatBRL={formatBRL}
        />
        {result ? (
          <div className="mt-6 flex flex-col gap-4">
            <ResultCard
              title="Estoque Ideal"
              value={
                mode == 'reais'
                  ? formatCurrency(result.idealInventory)
                  : result.idealInventory
              }
              description="Baseado nas vendas esperadas e cobertura desejada"
              icon="chart"
            />
            <ResultCard
              title="Sugestão de Compra"
              value={
                mode == 'reais'
                  ? formatCurrency(result.purchaseSuggestion)
                  : result.purchaseSuggestion
              }
              description={
                result.purchaseSuggestion > 0
                  ? 'Valor recomendado para compra'
                  : 'Não é necessário comprar no momento'
              }
              icon="shopping"
            />
            <Alert className={getStatusInfo(result.status).color}>
              <AlertTitle className="flex gap-2">
                {getStatusInfo(result.status).icon}
                {getStatusInfo(result.status).title}
              </AlertTitle>
              <AlertDescription>
                {getStatusInfo(result.status).description}
              </AlertDescription>
            </Alert>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-center p-6 bg-muted/80 rounded-lg border ">
              <Info className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">Sem Cálculos</h3>
              <p className="text-muted-foreground">
                Preencha os campos e clique em "Calcular" para ver os
                resultados.
              </p>
            </div>
          </div>
        )}
      </TabsContent>

      <TabsContent value="scenarios" className="w-full max-w-5xl">
        <OtbScenarios scenarios={scenarios} loadScenario={loadScenario} />
      </TabsContent>
    </Tabs>
  );
};

export default Otb;
