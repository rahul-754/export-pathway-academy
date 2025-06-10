import React, { useEffect } from 'react';
import UserHeader from './UserHeader';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  useEffect(() => {
    // Set CSS variables for header and footer heights
    document.documentElement.style.setProperty('--header-height', '64px');
    document.documentElement.style.setProperty('--footer-height', '400px');
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Fixed Header */}
      <header className="sticky top-0 z-50 bg-white shadow-sm">
        <UserHeader />
      </header>

      {/* Scrollable Content */}
      <main className="flex-1 overflow-y-auto min-h-0 pb-16">
        <div className="container mx-auto px-4 py-8">
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200">
        <Footer />
      </footer>
    </div>
  );
};

export default Layout; 