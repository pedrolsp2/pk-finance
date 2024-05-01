import { useStore } from '@/store';
import Avatar from '@/components/Avatar';
import { EllipsisVertical } from 'lucide-react';

export default function Header() {
  const usuario = useStore.use.usuario();
  return (
    <div className="p-2 h-52 bg-primary-500 rounded-b-3xl">
      <div className="flex items-center justify-between text-white">
        <Avatar name={usuario} />
        <div className="text-2xl font-bold">Meu saldo</div>
        <EllipsisVertical />
      </div>
      <div className="flex flex-col items-center justify-center gap-1 mt-12">
        <span className="text-neutral-100">Saldo atual</span>
        <div className="text-4xl font-bold text-white">R$ 0,00</div>
      </div>
    </div>
  );
}
