import { buscarGastos } from '@/api/business/entrada';
import { useQuery } from '@tanstack/react-query';

export const useGastos = (token: string | null) => {
  return useQuery({
    queryFn: () => buscarGastos({ TOKEN: token || '' }),
    enabled: !!token,
    queryKey: [`GASTOS|${token}`],
  });
};
