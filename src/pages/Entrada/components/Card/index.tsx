import { valueReal } from '@/utils/stringFormatter';
import { VisualizacaoType } from '../Visualizacao';
import { Coins, DollarSign, HandCoins } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

type IconVariant = 'Salario' | 'Extra' | 'Outros';

interface IconType extends React.SVGAttributes<SVGSVGElement> {
  variant: IconVariant;
  size?: string | number;
}

export default function Card({
  CATEGORIA,
  DESCRICAO,
  VALOR,
  DATA,
}: VisualizacaoType) {
  const Icon: React.FC<IconType> = ({ variant, size = 18, ...rest }) => {
    const LucideIcons: Record<IconVariant, React.ElementType> = {
      Salario: DollarSign,
      Extra: Coins,
      Outros: HandCoins,
    };

    const SelectedIcon = LucideIcons[variant];

    if (!SelectedIcon) {
      return null;
    }

    return <SelectedIcon size={size} {...rest} />;
  };

  return (
    <div className="flex flex-col gap-1 p-2 border-b last:border-b-0">
      <div className="flex items-center justify-between">
        <p className="mb-1 text-sm text-gray-600">{CATEGORIA}</p>
        <div className="p-3 rounded-full bg-neutral-50">
          <Icon size={18} variant={CATEGORIA} className="text-emerald-500" />
        </div>
      </div>
      <div className="flex items-center justify-between">
        <p className="font-semibold text-gray-900 text-[1.1rem]">
          {valueReal(Number(VALOR))}
        </p>
        <small className="text-neutral-500">
          {format(DATA.toDate(), 'PPP', { locale: ptBR })}
        </small>
      </div>
      <p className="mb-1 text-xs text-gray-800">{DESCRICAO}</p>
    </div>
  );
}
