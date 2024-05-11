import Header from './components/Header';
import CardHistorico from './components/CardHistorico';
import { useEffect, useState } from 'react';
import { useEntradas } from '@/hooks/useQueryEntradas';
import { useStore } from '@/store';
import SplashLoading from '@/components/SplashLoading';
import Filtro from '@/components/Filtro';
import { FiltroMes } from '@/types/Filters';
import { Timestamp } from 'firebase/firestore';
import { useGastos } from '@/hooks/useQueryGastos';
export interface HistoricoType {
  CATEGORIA:
    | 'Salario'
    | 'Extra'
    | 'Outros'
    | 'Comida'
    | 'Pessoal'
    | 'Fixo'
    | 'Outros';
  DATA: Timestamp;
  DESCRICAO: string | null;
  VALOR: string;
  TIPO: 'ENTRADA' | 'SAIDA';
}

export default function Home() {
  const token = useStore.use.token();
  const [historicos, setHistoricos] = useState<HistoricoType[]>([]);
  const [saldoTotal, setSaldoTotal] = useState<number>(0);
  const [filter, setFilter] = useState<FiltroMes>();

  const { data, status } = useEntradas(token);
  const { data: dataGasto, status: statusGasto } = useGastos(token);

  useEffect(() => {
    if (data && dataGasto) {
      const HISTORICO: HistoricoType[] = [];

      const HISTORICO_ENTRADA: HistoricoType[] = data.body.map((item) => {
        return { ...item, TIPO: 'ENTRADA' } as HistoricoType;
      });

      HISTORICO.push(...HISTORICO_ENTRADA);

      const HISTORICO_SAIDA: HistoricoType[] = dataGasto.body.map((item) => {
        return { ...item, TIPO: 'SAIDA' } as HistoricoType;
      });

      HISTORICO.push(...HISTORICO_SAIDA);

      setHistoricos(
        HISTORICO.filter((entrada) => {
          const MES = entrada.DATA.toDate().getMonth();
          return filter === undefined || MES === filter;
        })
      );

      const VALOR_TOTAL_ENTRADA = HISTORICO_ENTRADA.filter((entrada) => {
        const MES = entrada.DATA.toDate().getMonth();
        return filter === undefined || MES === filter;
      }).reduce((total, dado) => Number(total) + Number(dado.VALOR), 0);

      const VALOR_TOTAL_SAIDA = HISTORICO_SAIDA.filter((saida) => {
        const MES = saida.DATA.toDate().getMonth();
        return filter === undefined || MES === filter;
      }).reduce((total, dado) => Number(total) + Number(dado.VALOR), 0);

      setSaldoTotal(VALOR_TOTAL_ENTRADA - VALOR_TOTAL_SAIDA);
    }
  }, [data, dataGasto, filter]);

  if ((status || statusGasto) === 'pending') {
    return (
      <div className="flex items-center w-full h-full bg-primary-500">
        <SplashLoading />
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <Header VALOR={saldoTotal} />
      <section className="relative p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-bold">Histórico</h1>
          <Filtro setState={setFilter} state={filter} />
        </div>
        <div className="relative mt-2">
          <div className="h-[420px] overflow-auto flex flex-col divide-y divide-neutral-50">
            {historicos.map((historico, index) => (
              <CardHistorico key={index} {...historico} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
