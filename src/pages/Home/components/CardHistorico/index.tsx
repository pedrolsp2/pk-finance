import { valueReal } from '@/utils/stringFormatter';
import { HistoricoType } from '../..';
import Badge from './Badge';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export default function CardHistorico({
  DESCRICAO,
  TIPO,
  VALOR,
  CATEGORIA,
  DATA,
}: HistoricoType) {
  return (
    <div className="grid grid-cols-[auto,1fr,auto] gap-2 items-center py-3">
      <Badge tipo={TIPO} />
      <div className="flex flex-col">
        <span className="text-neutral-600">{CATEGORIA}</span>
        <span className="text-neutral-500">{DESCRICAO}</span>
        <small className="text-neutral-400">
          {format(DATA.toDate(), 'PPP', { locale: ptBR })}
        </small>
      </div>
      <span className="font-semibold text-bold">
        {valueReal(Number(VALOR))}
      </span>
    </div>
  );
}
