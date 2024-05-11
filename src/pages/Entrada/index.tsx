import NovaEntrada from './components/NovaEntrada';
import Header from '@/components/Header';
import { ArrowUp, Eye } from 'lucide-react';
import Visualizacao from './components/Visualizacao';
import { useState } from 'react';
import { FiltroMes } from '@/types/Filters';
import Filtro from '@/components/Filtro';

export default function Entrada() {
  const [filter, setFilter] = useState<FiltroMes>();
  return (
    <div>
      <Header />
      <div className="p-2">
        <div className="flex items-center gap-2 mt-2 mb-2">
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-neutral-100">
            <ArrowUp className="text-emerald-500" />
          </div>
          <span className="text-lg font-bold">Nova Entrada</span>
        </div>
        <NovaEntrada />
        <div className="sticky top-0 flex items-center justify-between py-2 my-8 mb-4 bg-white border-b border-b-neutral-100">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-neutral-100">
              <Eye className="text-emerald-500" />
            </div>
            <span className="text-lg font-bold">Visualização</span>
          </div>
          <Filtro setState={setFilter} state={filter} />
        </div>
        <Visualizacao state={filter} />
      </div>
    </div>
  );
}
