import { buscarEntradas } from '@/api/business/entrada';
import { useStore } from '@/store';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

export interface VisualizacaoType {
  CATEGORIA: string;
  DATA: Date;
  DESCRICAO: string | null;
  VALOR: string;
}

export default function Visualizacao() {
  const token = useStore.use.token();

  const [itemVisualizacao, setItemVisualizacao] = useState<VisualizacaoType[]>(
    []
  );

  const { data, status } = useQuery({
    queryFn: () => buscarEntradas({ TOKEN: token || '' }),
    enabled: !!token,
    queryKey: [`ENTRADA|${token}`],
  });

  useEffect(() => {
    if (data) {
      setItemVisualizacao(data.body);
    }
  }, [data]);

  const VALOR_TOTAL_ENTRADA = itemVisualizacao.reduce(
    (total, dado) => Number(total) + Number(dado.VALOR),
    0
  );

  if (status === 'pending') {
    return <h1>Carregando...</h1>;
  }

  return (
    <div className="flex flex-col p-2">
      <strong>{VALOR_TOTAL_ENTRADA}</strong>
      {itemVisualizacao.map((item, index) => (
        <div className="flex gap-2 p-2 border" key={index}>
          <strong>{item.DESCRICAO}</strong>
          <strong>{item.CATEGORIA}</strong>
          <strong>{item.VALOR}</strong>
        </div>
      ))}
    </div>
  );
}
