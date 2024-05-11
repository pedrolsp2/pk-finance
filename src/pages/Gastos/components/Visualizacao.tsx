import { useStore } from '@/store';
import { valueReal } from '@/utils/stringFormatter';
import { Timestamp } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import Card from './Card';
import { Skeleton } from '@/components/ui/skeleton';
import { FiltroMes } from '@/types/Filters';
import { useGastos } from '@/hooks/useQueryGastos';

export interface GastosType {
  CATEGORIA: 'Comida' | 'Pessoal' | 'Fixo' | 'Outros' | 'Cartao';
  DATA: Timestamp;
  DESCRICAO: string | null;
  VALOR: string;
}

export default function Visualizacao({
  state,
}: {
  state: FiltroMes | undefined;
}) {
  const token = useStore.use.token();

  const [itemVisualizacao, setItemVisualizacao] = useState<GastosType[]>([]);

  const { data, status } = useGastos(token);

  useEffect(() => {
    if (data) {
      setItemVisualizacao(data.body);
    }
  }, [data]);

  const VALOR_TOTAL_GASTOS = itemVisualizacao
    .filter((gasto) => {
      const MES = gasto.DATA.toDate().getMonth();
      return state === undefined || MES === state;
    })
    .reduce((total, dado) => Number(total) + Number(dado.VALOR), 0);

  return (
    <div className="p-4 bg-white rounded-lg shadow-lg">
      <div className="flex justify-between mb-4">
        <h2 className="text-lg font-semibold">Gasto total</h2>
        <strong className="text-xl font-semibold text-red-500">
          {valueReal(VALOR_TOTAL_GASTOS)}
        </strong>
      </div>
      {status === 'pending' ? (
        <Skeleton className="flex flex-col gap-1 p-2 border-b last:border-b-0">
          <div className="flex items-center justify-between">
            <Skeleton className="w-20 h-4 mb-1 bg-neutral-200" />
            <Skeleton className="w-8 h-8 p-3 rounded-full bg-neutral-200" />
          </div>
          <Skeleton className="w-32 h-6 mb-1 bg-neutral-200" />
          <Skeleton className="h-4 mb-1 w-52 bg-neutral-200" />
        </Skeleton>
      ) : (
        itemVisualizacao
          .filter((gasto) => {
            const MES = gasto.DATA.toDate().getMonth();
            return state === undefined || MES === state;
          })
          .map((item, index) => <Card key={index} {...item} />)
      )}
    </div>
  );
}
