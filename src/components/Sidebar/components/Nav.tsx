import { LucideIcon } from 'lucide-react';
import { ContainerIcon } from './ContainerIcon';
import Avatar from '@/components/Avatar';

interface NavProps {
  routes: RouteTypes[];
  usuario: string | null;
}

export interface RouteTypes {
  label: string;
  href: string;
  icon: LucideIcon;
}

export default function Nav({ routes, usuario }: NavProps) {
  return (
    <div className="flex items-center justify-around h-16 px-2 text-white bg-primary-500 dark:bg-slate-500 rounded-t-3xl">
      {routes.map((route, index) => (
        <ContainerIcon
          Icon={route.icon}
          label={route.label}
          to={route.href}
          key={index}
        />
      ))}
      <Avatar name={usuario} />
    </div>
  );
}
