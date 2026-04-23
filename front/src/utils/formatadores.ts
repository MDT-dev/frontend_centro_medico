// utils/formatadores.ts
export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-AO', { style: 'currency', currency: 'AOA' }).format(value);
};

export const formatDate = (date: Date) => {
  return new Date(date).toLocaleDateString('pt-PT', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

export const formatDateShort = (date: Date) => {
  return new Date(date).toLocaleDateString('pt-PT');
};