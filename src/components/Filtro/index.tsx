import { FiltroMes } from '@/types/Filters';
import { CheckIcon, ListFilter, Trash } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MES } from './meses';

interface FiltroProps {
  setState: (filter: FiltroMes | undefined) => void;
  state: FiltroMes | undefined;
}

export default function Filtro({ setState, state }: FiltroProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {state ? (
          <Button variant="outline" size="sm">
            {MES.find((mes) => mes.value === state)?.label}
          </Button>
        ) : (
          <ListFilter />
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40 mr-4">
        <DropdownMenuLabel>Escolha um mes</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {MES.map((mes) => (
            <DropdownMenuItem
              key={mes.value}
              onClick={() => setState(mes.value)}
              className={cn(
                'flex items-center justify-between',
                state === mes.value && 'bg-neutral-100'
              )}
            >
              {mes.label}
              {state === mes.value && <CheckIcon className="w-4 h-4" />}
            </DropdownMenuItem>
          ))}
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setState(undefined)}>
            Limpar
            <DropdownMenuShortcut>
              <Trash size={16} />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
