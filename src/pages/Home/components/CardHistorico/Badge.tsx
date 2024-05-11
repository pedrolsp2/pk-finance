import { ArrowDown, ArrowUp } from 'lucide-react';

export default function Badge({ tipo }: { tipo: 'ENTRADA' | 'SAIDA' }) {
  return (
    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-neutral-100">
      {tipo === 'ENTRADA' ? (
        <ArrowUp className="text-emerald-500" />
      ) : (
        <ArrowDown className="text-red-500" />
      )}
    </div>
  );
}
