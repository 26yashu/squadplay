import { Outlet } from 'react-router-dom';
import { BottomNavigation } from '../components/navigation/BottomNavigation';

export function MainLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1 pb-32">
        <Outlet />
      </div>
      <BottomNavigation />
    </div>
  );
}
