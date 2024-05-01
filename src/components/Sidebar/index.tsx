import { useStore } from '@/store';
import Nav, { RouteTypes } from './components/Nav';
import { ArrowDown, ArrowUp, Home } from 'lucide-react';

export default function Sidebar() {
  const usuario = useStore.use.usuario();
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

  return <Nav usuario={usuario} routes={itemsNav} />;
}
