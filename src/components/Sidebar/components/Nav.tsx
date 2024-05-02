import { LucideIcon } from 'lucide-react';
import { ContainerIcon } from './ContainerIcon';

interface NavProps {
  routes: RouteTypes[];
}

export interface RouteTypes {
  label: string;
  href: string;
  icon: LucideIcon;
}

export default function Nav({ routes }: NavProps) {
  return (
    <div className="flex flex-col items-center gap-1">
      {routes.map((route, index) => (
        <ContainerIcon
          Icon={route.icon}
          label={route.label}
          to={route.href}
          key={index}
        />
      ))}
    </div>
  );
}
