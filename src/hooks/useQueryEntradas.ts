import { buscarEntradas } from '@/api/business/entrada';
import { useQuery } from '@tanstack/react-query';

export const useEntradas = (token: string | null) => {
  return useQuery({
    queryFn: () => buscarEntradas({ TOKEN: token || '' }),
    enabled: !!token,
    queryKey: [`ENTRADA|${token}`],
  });
};
