import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CalendarIcon, Loader } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { novoGasto } from '@/api/business/entrada';
import { toast } from 'sonner';
import { useStore } from '@/store';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { FirebaseReturnInsert } from '@/types/Promise';

const schema = z.object({
  valor: z.number(),
  categoria: z.string(),
  descricao: z.string(),
});

export type FormValues = z.infer<typeof schema>;

export default function NovoGasto() {
  const [date, setDate] = useState<Date | undefined>();
  const queryClient = useQueryClient();

  const user = useStore.use.usuario();
  const token = useStore.use.token();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<FormValues>();

  const { mutate, status } = useMutation({
    mutationFn: novoGasto,
    onSuccess(data: FirebaseReturnInsert) {
      reset();
      queryClient.invalidateQueries({ queryKey: [`GASTOS|${token}`] });
      if (data.status === 200) {
        toast.success(data.message, {
          style: { background: '#10b981', color: '#fff' },
        });
      } else {
        toast.success('Erro ao inserir', {
          style: { background: '#ce2a24', color: '#fff' },
        });
      }
    },
  });

  const onSubmit = (DATA: FormValues) => {
    if (DATA.categoria === '' || DATA.valor === 0 || !date) {
      toast.success('Preencha todos os campos', {
        style: { background: '#ce2a24', color: '#fff' },
      });
      return;
    }
    mutate({ ...DATA, data: date, usuario: user, token: token });
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-2 gap-2">
        <div className="flex flex-col gap-1">
          <Label className="text-neutral-600" htmlFor="valor">
            Valor
          </Label>
          <Input id="valor" {...register('valor')} />
          {errors.valor && <span>Valor é obrigatório</span>}
        </div>
        <div className="flex flex-col gap-1">
          <Label className="text-neutral-600" htmlFor="categoria">
            Categoria
          </Label>
          <Select onValueChange={(value) => setValue('categoria', value)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Comida">Comida</SelectItem>
              <SelectItem value="Pessoal">Pessoal</SelectItem>
              <SelectItem value="Fixo">Fixo</SelectItem>
              <SelectItem value="Cartao">Cartão</SelectItem>
              <SelectItem value="Outros">Outros</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="flex flex-col gap-2 my-4">
        <div className="flex flex-col gap-1">
          <Label className="text-neutral-600" htmlFor="descricao">
            Descrição
          </Label>
          <Textarea id="descricao" {...register('descricao')} />
          {errors.descricao && <span>Descrição é obrigatória</span>}
        </div>
        <div className="flex flex-col gap-1">
          <Label className="text-neutral-600" htmlFor="data">
            Data
          </Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={'outline'}
                className={cn(
                  ' justify-start text-left font-normal',
                  !date && 'text-muted-foreground'
                )}
              >
                <CalendarIcon className="w-4 h-4 mr-2" />
                {date ? (
                  format(date, 'PPP', { locale: ptBR })
                ) : (
                  <span>Selecione o mês</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                locale={ptBR}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
        <Button type="submit">
          {status === 'pending' ? (
            <Loader className="text-white animate-spin" />
          ) : (
            'Salvar'
          )}
        </Button>
      </div>
    </form>
  );
}
