import { ResultCard } from '@/components/result-card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { calculatePurchase, formatCurrency } from '@/utils/calculations';
import { AlertTriangle, CheckCircle, Info, ShoppingCart } from 'lucide-react';
import React from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';

const schema = z.object({
  expectedSales: z
    .number({
      required_error: 'Obrigatório',
      invalid_type_error: 'Valor inválido',
    })
    .min(1, 'Insira um valor acima de zero'),
  currentInventory: z
    .number({
      required_error: 'Obrigatório',
      invalid_type_error: 'Valor inválido',
    })
    .min(1, 'Insira um valor acima de zero'),
  desiredCoverage: z.number({
    required_error: 'Obrigatório',
    invalid_type_error: 'Valor inválido',
  }),
});

type FormData = z.infer<typeof schema>;

type CalculationResult = {
  idealInventory: number;
  purchaseSuggestion: number;
  status: 'adequate' | 'need-to-buy' | 'excess' | 'critical-need-to-buy';
};

const Otb = () => {
  const [result, setResult] = React.useState<CalculationResult | null>(null);
  const [scenarios, setScenarios] = React.useState<
    Array<{ id: number; inputs: FormData; result: CalculationResult }>
  >([]);
  const [activeTab, setActiveTab] = React.useState('calculator');

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      expectedSales: 0,
      currentInventory: 0,
      desiredCoverage: 4,
    },
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
      { id: Date.now(), inputs: values, result: newResult },
    ]);
  };

  const clearForm = () => {
    form.reset();
    setResult(null);
  };

  const getStatusInfo = (status: string) => {
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
  const formatBRL = (value: number) =>
    value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });

  return (
    <Tabs
      value={activeTab}
      onValueChange={setActiveTab}
      className="w-full px-10 py-10 items-center"
    >
      <TabsList className="grid w-full max-w-5xl grid-cols-2 mb-6">
        <TabsTrigger value="calculator">Calculadora</TabsTrigger>
        <TabsTrigger value="scenarios">Cenários Salvos</TabsTrigger>
      </TabsList>

      <TabsContent value="calculator" className="w-full max-w-5xl">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid gap-6 md:grid-cols-2"
          >
            <Card>
              <CardHeader>
                <CardTitle>Dados de Entrada</CardTitle>
                <CardDescription>
                  Preencha os campos abaixo para calcular o estoque ideal
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  <FormField
                    control={form.control}
                    name="expectedSales"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Valor de Vendas Esperadas (R$)</FormLabel>
                        <FormControl>
                          <Input
                            value={formatBRL(field.value)}
                            onChange={(e) => {
                              const raw = e.target.value.replace(/\D/g, '');
                              const number = raw ? parseInt(raw, 10) / 100 : 0;
                              field.onChange(number);
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="currentInventory"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Estoque Atual (R$)</FormLabel>
                        <FormControl>
                          <Input
                            value={formatBRL(field.value)}
                            onChange={(e) => {
                              const raw = e.target.value.replace(/\D/g, '');
                              const number = raw ? parseInt(raw, 10) / 100 : 0;
                              field.onChange(number);
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="desiredCoverage"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Cobertura Desejada (semanas)</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="number"
                            onChange={(e) => {
                              field.onChange(parseInt(e.target.value, 10));
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" type="button" onClick={clearForm}>
                  Limpar
                </Button>
                <Button type="submit">Calcular</Button>
              </CardFooter>
            </Card>

            <div className="flex flex-col gap-4">
              {result ? (
                <>
                  <ResultCard
                    title="Estoque Ideal"
                    value={formatCurrency(result.idealInventory)}
                    description="Baseado nas vendas esperadas e cobertura desejada"
                    icon="chart"
                  />
                  <ResultCard
                    title="Sugestão de Compra"
                    value={formatCurrency(result.purchaseSuggestion)}
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
                </>
              ) : (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center p-6 bg-gray-50 rounded-lg border border-gray-200">
                    <Info className="h-12 w-12 text-primary mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">Sem Cálculos</h3>
                    <p className="text-gray-600">
                      Preencha os campos ao lado e clique em "Calcular" para ver
                      os resultados.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </form>
        </Form>
      </TabsContent>

      <TabsContent value="scenarios"></TabsContent>
    </Tabs>
  );
};

export default Otb;
