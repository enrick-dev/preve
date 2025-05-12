import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

export const schema = z.object({
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
export type FormData = z.infer<typeof schema>;

type OtbCalculatorProps = {
  mode: 'reais' | 'unidades';
  setMode: (mode: 'reais' | 'unidades') => void;
  onSubmit: (values: FormData) => void;
  clearForm: () => void;
  form: ReturnType<typeof useForm<FormData>>;
  formatBRL: (value: number) => string;
};

export const OtbCalculator: React.FC<OtbCalculatorProps> = ({
  mode,
  setMode,
  onSubmit,
  clearForm,
  form,
  formatBRL,
}) => {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card>
          <CardHeader>
            <CardTitle>Dados de Entrada</CardTitle>
            <CardDescription>
              Preencha os campos abaixo para calcular o estoque ideal
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RadioGroup
              value={mode}
              onValueChange={(v) =>
                v === 'reais' || v === 'unidades' ? setMode(v) : null
              }
              className="flex gap-2 w-full"
            >
              <div
                className={cn(
                  'flex items-center gap-2 flex-1 px-4 py-3 rounded-xl border cursor-pointer',
                  mode === 'reais' &&
                    'bg-primary/10 border border-primary text-primary',
                )}
              >
                <RadioGroupItem
                  value="reais"
                  id="reais"
                  className="border-primary"
                />
                <Label htmlFor="reais">Reais</Label>
              </div>
              <div
                className={cn(
                  'flex items-center gap-2 flex-1 px-4 py-3 rounded-xl border',
                  mode === 'unidades' &&
                    'bg-primary/10 border border-primary text-primary',
                )}
              >
                <RadioGroupItem value="unidades" id="unidades" />
                <Label htmlFor="unidades">Unidades</Label>
              </div>
            </RadioGroup>
            <div className="grid gap-4 mt-4">
              <FormField
                control={form.control}
                name="expectedSales"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Vendas Esperadas ({mode === 'reais' ? 'R$' : 'unidades'})
                    </FormLabel>
                    <FormControl>
                      {mode === 'reais' ? (
                        <Input
                          value={formatBRL(field.value)}
                          onChange={(e) => {
                            const raw = e.target.value.replace(/\D/g, '');
                            const num = raw ? parseInt(raw, 10) / 100 : 0;
                            field.onChange(num);
                          }}
                        />
                      ) : (
                        <Input
                          {...field}
                          type="number"
                          onChange={(e) =>
                            field.onChange(parseFloat(e.target.value))
                          }
                        />
                      )}
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
                    <FormLabel>
                      Estoque Atual ({mode === 'reais' ? 'R$' : 'unidades'})
                    </FormLabel>
                    <FormControl>
                      {mode === 'reais' ? (
                        <Input
                          value={formatBRL(field.value)}
                          onChange={(e) => {
                            const raw = e.target.value.replace(/\D/g, '');
                            const num = raw ? parseInt(raw, 10) / 100 : 0;
                            field.onChange(num);
                          }}
                        />
                      ) : (
                        <Input
                          {...field}
                          type="number"
                          onChange={(e) =>
                            field.onChange(parseFloat(e.target.value))
                          }
                        />
                      )}
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
                        onChange={(e) =>
                          field.onChange(parseInt(e.target.value, 10))
                        }
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
      </form>
    </Form>
  );
};
