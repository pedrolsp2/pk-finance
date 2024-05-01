import { LucideIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

export const ContainerIcon = ({
  Icon,
  label,
  to,
}: {
  Icon: LucideIcon;
  label: string;
  to: string;
}) => {
  return (
    <Link to={to} className="flex flex-col items-center justify-center gap-1">
      <span className="text-lg">
        <Icon />
      </span>
      <small>{label}</small>
    </Link>
  );
};
