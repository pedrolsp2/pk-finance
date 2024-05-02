import { useStore } from '@/store';
import Avatar from '../Avatar';
import Sidebar from '../Sidebar';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const usuario = useStore.use.usuario();
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="h-full p-2 bg-primary-500">
      <div className="flex items-center justify-between text-white">
        <div className="flex items-center gap-2">
          <ArrowLeft onClick={goBack} />
          <Avatar name={usuario} />
        </div>
        <div />
        <Sidebar />
      </div>
    </div>
  );
}
