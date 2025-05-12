import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3, ShoppingBag } from 'lucide-react';

interface ResultCardProps {
  title: string;
  value: string | number;
  description: string;
  icon: 'chart' | 'shopping';
}

export function ResultCard({
  title,
  value,
  description,
  icon,
}: ResultCardProps) {
  return (
    <Card className="gap-2">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-md font-medium">{title}</CardTitle>
        {icon === 'chart' ? (
          <BarChart3 className="h-5 w-5 text-blue-500" />
        ) : (
          <ShoppingBag className="h-5 w-5 text-green-500" />
        )}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}
