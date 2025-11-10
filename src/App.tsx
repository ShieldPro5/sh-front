import { useState, useEffect } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import HomePage from './components/HomePage';
import ReportPage from './components/ReportPage';
import AdminLogin from './components/AdminLogin';
import AdminPanel from './components/AdminPanel';
import ThemeChanger from './components/ThemeChanger';

function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'report' | 'admin'>('home');
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

  useEffect(() => {
    const path = window.location.pathname;
    if (path === '/admin') {
      setCurrentPage('admin');
    }

    if (path === '/report') {
      setCurrentPage('report');
    }

    const authenticated = localStorage.getItem('admin_authenticated') === 'true';
    setIsAdminAuthenticated(authenticated);
  }, []);

  const handleLogout = () => {
    setIsAdminAuthenticated(false);
    setCurrentPage('home');
    window.history.pushState({}, '', '/');
  };

  const renderPage = () => {
    if (currentPage === 'admin') {
      if (!isAdminAuthenticated) {
        return <AdminLogin onLogin={() => setIsAdminAuthenticated(true)} />;
      }
      return <AdminPanel onLogout={handleLogout} />;
    }

    if (currentPage === 'report') {
      return <ReportPage onNavigate={setCurrentPage} />;
    }

    return <HomePage onNavigate={setCurrentPage} />;
  };

  return (
    <>
      {renderPage()}
    </>
  );
}

export default App;
