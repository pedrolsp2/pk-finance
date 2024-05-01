import Badge from './Badge';

interface CardHistoricoProps {
  tipo: string;
  valor: string;
  data: string;
  descricao: string;
}

export default function CardHistorico({
  descricao,
  tipo,
  valor,
}: CardHistoricoProps) {
  return (
    <div className="grid grid-cols-[auto,1fr,auto] gap-2 items-center">
      <Badge tipo={tipo} />
      <div className="flex flex-col">
        <span className="text-neutral-950">{tipo}</span>
        <span className="text-neutral-500">{descricao}</span>
      </div>
      <span className="text-bold">{valor}</span>
    </div>
  );
}
