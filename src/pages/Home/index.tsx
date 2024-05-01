import Header from './components/Header';
import CardHistorico from './components/CardHistorico';
import { historicos } from './data';

export default function Home() {
  return (
    <div className="flex flex-col overflow-hidden">
      <Header />
      <section className="relative p-4">
        <h1 className="text-lg font-bold">Histórico</h1>
        <div className="relative mt-2">
          <div className="absolute top-[-16px] left-0 z-10 w-full h-12 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white to-white"></div>
          </div>
          <div className="h-[520px] overflow-auto gap-6 flex flex-col pt-3 pb-16">
            {historicos.map((historico, index) => (
              <CardHistorico key={index} {...historico} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
