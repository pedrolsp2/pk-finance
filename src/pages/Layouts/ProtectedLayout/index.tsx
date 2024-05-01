import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useStore } from '@/store';
import { getItem } from '@/utils/storage';
import Sidebar from '@/components/Sidebar';

const ProtectedLayout = () => {
  console.count('ProtectedLayout');
  const user = useStore.use.usuario();

  const token = getItem(localStorage, 'token');
  const location = useLocation();

  if (!user && !token) {
    return <Navigate to="/login" replace state={{ path: location.pathname }} />;
  }

  return (
    <>
      <div className="w-full h-screen overflow-y-auto grid grid-rows-[1fr,auto]">
        <Outlet />
        <div className="fixed bottom-0 w-full">
          <Sidebar />
        </div>
      </div>
    </>
  );
};

export default ProtectedLayout;
