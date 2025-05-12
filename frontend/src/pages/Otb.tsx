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
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Info } from 'lucide-react';
import React from 'react';

const Otb = () => {
  const [activeTab, setActiveTab] = React.useState('calculator');

  return (
    <Tabs
      value={activeTab}
      onValueChange={setActiveTab}
      className="size-full px-10 py-10 items-center"
    >
      <TabsList className="grid w-full max-w-6xl grid-cols-2 mb-6">
        <TabsTrigger value="calculator">Calculadora</TabsTrigger>
        <TabsTrigger value="scenarios">Cenários Salvos</TabsTrigger>
      </TabsList>
      <TabsContent value="calculator" className="w-full max-w-6xl">
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Dados de Entrada</CardTitle>
              <CardDescription>
                Preencha os campos abaixo para calcular o estoque ideal
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="expectedSales">
                    Valor de Vendas Esperadas (R$)
                  </Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                      R$
                    </span>
                    <Input
                      id="expectedSales"
                      placeholder="0,00"
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="currentInventory">Estoque Atual (R$)</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                      R$
                    </span>
                    <Input
                      id="currentInventory"
                      placeholder="0,00"
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="desiredCoverage">
                    Cobertura Desejada (semanas)
                  </Label>
                  <Input id="desiredCoverage" placeholder="4" />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Limpar</Button>
              <Button>Calcular</Button>
            </CardFooter>
          </Card>

          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-center h-full">
              <div className="text-center p-6 bg-gray-50 rounded-lg border border-gray-200">
                <Info className="h-12 w-12 text-blue-500 mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">Sem Cálculos</h3>
                <p className="text-gray-600">
                  Preencha os campos ao lado e clique em "Calcular" para ver os
                  resultados.
                </p>
              </div>
            </div>
          </div>
        </div>
      </TabsContent>
      <TabsContent value="scenarios"></TabsContent>
    </Tabs>
  );
};

export default Otb;
