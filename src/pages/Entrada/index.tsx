import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import Header from '@/components/Header';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowUp, CalendarIcon, Eye } from 'lucide-react';
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

const schema = z.object({
  valor: z.number(),
  categoria: z.string(),
  descricao: z.string(),
  data: z.date(),
});

type FormValues = z.infer<typeof schema>;

export default function Entrada() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormValues>();

  const [date, setDate] = useState<Date | undefined>();

  const onSubmit = (data: FormValues) => {
    console.log(data);
    console.log(errors);
  };

  return (
    <div>
      <Header />
      <div className="p-2">
        <div className="flex items-center gap-2 mt-2 mb-4">
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-neutral-100">
            <ArrowUp className="text-emerald-500" />
          </div>
          <span className="text-lg font-bold">Nova Entrada</span>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-2 gap-2">
            <div className="flex flex-col gap-1">
              <Label className="text-neutral-600" htmlFor="valor">
                Valor
              </Label>
              <Input type="number" id="valor" {...register('valor')} />
              {errors.valor && <span>Valor é obrigatório</span>}
            </div>
            <div className="flex flex-col gap-1">
              <Label className="text-neutral-600" htmlFor="categoria">
                Categoria
              </Label>
              <Select onValueChange={(value) => setValue('categoria', value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Theme" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">System</SelectItem>
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
            <Button type="submit">Salvar</Button>
          </div>
        </form>
        <div className="flex items-center gap-2 my-8">
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-neutral-100">
            <Eye className="text-emerald-500" />
          </div>
          <span className="text-lg font-bold">Visualização</span>
        </div>
      </div>
    </div>
  );
}
