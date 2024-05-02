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
    <Link
      to={to}
      className="flex items-center w-full gap-4 p-3 px-2 text-primary-500 hover:bg-neutral-50"
    >
      <span className="text-lg">
        <Icon />
      </span>
      <span>{label}</span>
    </Link>
  );
};
