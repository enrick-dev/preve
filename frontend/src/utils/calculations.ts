export interface PurchaseScenario {
  id: string;
  name: string;
  expectedSales: number;
  currentInventory: number;
  desiredCoverage: number;
  idealInventory?: number;
  purchaseSuggestion?: number;
  status?: 'adequate' | 'need-to-buy' | 'excess' | 'critical-need-to-buy';
}

export interface CalculationResult {
  idealInventory: number;
  purchaseSuggestion: number;
  status: 'adequate' | 'need-to-buy' | 'excess' | 'critical-need-to-buy';
}

export const calculatePurchase = (
  expectedSales: number,
  currentInventory: number,
  desiredCoverage: number,
): CalculationResult => {
  const ES = expectedSales;
  const CI = currentInventory;
  const weeklySales = ES;

  const idealInventory = weeklySales * desiredCoverage;

  const purchaseSuggestion = idealInventory - CI;

  let status: 'adequate' | 'need-to-buy' | 'excess' | 'critical-need-to-buy';

  if (purchaseSuggestion <= 0) {
    if (CI > idealInventory * 1.5) {
      status = 'excess';
    } else {
      status = 'adequate';
    }
  } else {
    if (purchaseSuggestion > idealInventory * 0.5) {
      status = 'critical-need-to-buy';
    } else {
      status = 'need-to-buy';
    }
  }

  return {
    idealInventory,
    purchaseSuggestion: Math.max(0, purchaseSuggestion),
    status,
  };
};
export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};
