import { useStore } from '@/store';
import Avatar from '@/components/Avatar';
import Sidebar from '@/components/Sidebar';

export default function Header() {
  const usuario = useStore.use.usuario();
  return (
    <div className="h-40 p-2 bg-primary-500 rounded-b-3xl">
      <div className="flex items-center justify-between text-white">
        <Avatar name={usuario} />
        <div />
        <Sidebar />
      </div>
      <div className="flex flex-col items-center justify-center gap-1 ">
        <span className="text-neutral-100">Saldo atual</span>
        <div className="text-4xl font-bold text-white">R$ 0,00</div>
      </div>
    </div>
  );
}
