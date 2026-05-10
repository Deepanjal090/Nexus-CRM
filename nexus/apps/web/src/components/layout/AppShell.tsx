import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import MobileNav from './MobileNav';
import { useAppSelector, useAppDispatch } from '@/store/store';
import { toggleSidebar } from '@/store/uiSlice';
import { useEffect, useState } from 'react';

export default function AppShell({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();
  const { sidebarCollapsed } = useAppSelector((s) => s.ui);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="flex h-screen bg-[#f0f2f5] overflow-hidden">
      {/* Bitrix24 Sidebar - Dark Style */}
      <aside 
        className={`fixed inset-y-0 left-0 transform transition-all duration-300 z-40 bg-[#2b3542] shadow-2xl lg:shadow-none ${
          isMobile 
            ? (sidebarCollapsed ? '-translate-x-full' : 'translate-x-0') 
            : 'relative translate-x-0'
        } ${sidebarCollapsed ? 'w-[70px]' : 'w-[260px]'}`}
      >
        <Sidebar isMobile={isMobile} />
      </aside>

      <div className="flex-1 flex flex-col min-w-0 relative overflow-hidden">
        {/* Bitrix24 Topbar - Module Navigation */}
        <Topbar isMobile={isMobile} />
        
        <main className="flex-1 overflow-y-auto overflow-x-hidden relative custom-scrollbar bg-[#f0f2f5]">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-6 sm:p-8 lg:p-10 w-full max-w-[1600px] mx-auto ${isMobile ? 'pb-24' : 'pb-12'}`}
          >
            {children}
          </motion.div>
        </main>
      </div>

      {isMobile && <MobileNav />}
    </div>
  );
}
