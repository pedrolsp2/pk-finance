import { getInitials } from '@/utils/stringFormatter';

export default function Avatar({ name }: { name: string | null }) {
  return (
    <div className="flex items-center justify-center w-12 h-12 text-white rounded-full bg-primary-400/50">
      <span className="text-lg">{getInitials(name || '')}</span>
    </div>
  );
}
