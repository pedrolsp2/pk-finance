import { useStore } from '@/store';
import Nav, { RouteTypes } from './components/Nav';
import {
  ArrowDown,
  ArrowUp,
  EllipsisVertical,
  Home,
  LogOut,
} from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import Avatar from '../Avatar';
import { useNavigate } from 'react-router-dom';

export default function Sidebar() {
  const usuario = useStore.use.usuario();
  const resetAll = useStore.use.resetAuthState();
  const navigate = useNavigate();
  const itemsNav: RouteTypes[] = [
    {
      label: 'Inicio',
      href: '/',
      icon: Home,
    },
    {
      label: 'Gastos',
      href: '/gastos',
      icon: ArrowDown,
    },
    {
      label: 'Entradas',
      href: '/entradas',
      icon: ArrowUp,
    },
  ];

  const hanldeLogout = () => {
    resetAll();
    navigate('/login');
  };

  return (
    <Sheet>
      <SheetTrigger>
        <EllipsisVertical className="text-white" />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle></SheetTitle>
          <SheetDescription className="flex items-center gap-2">
            <Avatar name={usuario} />
            <span className="ml-2 text-xl font-bold text-black">{usuario}</span>
          </SheetDescription>
        </SheetHeader>
        <div className="flex flex-col justify-between h-[90%] my-8">
          <Nav routes={itemsNav} />
          <button
            onClick={hanldeLogout}
            className="flex items-center w-full gap-4 p-3 px-2 text-primary-500"
          >
            <span className="text-lg">
              <LogOut />
            </span>
            <span>Sair</span>
          </button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
