import NovaEntrada from './components/NovaEntrada';
import Header from '@/components/Header';
import { ArrowUp, Eye } from 'lucide-react';

export default function Entrada() {
  return (
    <div>
      <Header />
      <div className="p-2">
        <div className="flex items-center gap-2 mt-2 mb-4">
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-neutral-100">
            <ArrowUp className="text-emerald-500" />
          </div>
          <span className="text-lg font-bold">Nova Entrada</span>
        </div>
        <NovaEntrada />
        <div className="flex items-center gap-2 my-8">
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-neutral-100">
            <Eye className="text-emerald-500" />
          </div>
          <span className="text-lg font-bold">Visualização</span>
        </div>
      </div>
    </div>
  );
}
