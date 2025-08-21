import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HomePage } from './components/HomePage';
import { LoginPage } from './components/LoginPage';
import { AdminPanel } from './components/AdminPanel';
import { MenuItem, User } from './types';
import { apiService } from './services/api';

type Page = 'home' | 'login' | 'admin';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [user, setUser] = useState<User | null>(null);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [loginError, setLoginError] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  const handleLogin = (username: string, password: string): boolean => {
    // Demo authentication - in production, use proper authentication
    if (username === 'Admin' && password === 'Admin123') {
      setUser({
        username: 'Admin',
        isAuthenticated: true,
      });
      setCurrentPage('admin');
      setLoginError('');
      return true;
    } else {
      setLoginError('Invalid username or password. Try Admin/Admin123');
      return false;
    }
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentPage('home');
  };

  // API functions
  const handleAddMenuItem = async (item: Omit<MenuItem, 'id'>) => {
    try {
      const newItem = await apiService.addMenuItem(item);
      setMenuItems(prev => [...prev, newItem]);
      await refreshMetadata();
    } catch (error) {
      console.error('Error adding menu item:', error);
      setError('Failed to add menu item. Please try again.');
    }
  };

  const handleUpdateMenuItem = async (id: string, updates: Partial<MenuItem>) => {
    try {
      await apiService.updateMenuItem(id, updates);
      setMenuItems(prev => 
        prev.map(item => 
          item.id === id ? { ...item, ...updates } : item
        )
      );
      await refreshMetadata();
    } catch (error) {
      console.error('Error updating menu item:', error);
      setError('Failed to update menu item. Please try again.');
    }
  };

  const handleDeleteMenuItem = async (id: string) => {
    try {
      await apiService.deleteMenuItem(id);
      setMenuItems(prev => prev.filter(item => item.id !== id));
      await refreshMetadata();
    } catch (error) {
      console.error('Error deleting menu item:', error);
      setError('Failed to delete menu item. Please try again.');
    }
  };

  const handleBulkUpdateMenu = async (updatedItems: MenuItem[]) => {
    try {
      await apiService.bulkUpdateMenuItems(updatedItems);
      setMenuItems(updatedItems);
      await refreshMetadata();
    } catch (error) {
      console.error('Error bulk updating menu:', error);
      setError('Failed to update menu. Please try again.');
    }
  };

  const refreshMenuItems = async () => {
    try {
      const items = await apiService.getMenuItems();
      setMenuItems(items);
    } catch (error) {
      console.error('Error fetching menu items:', error);
      throw error;
    }
  };

  const refreshMetadata = async () => {
    try {
      const metadata = await apiService.getMetadata();
      setLastUpdated(new Date(metadata.timestamp));
    } catch (error) {
      console.error('Error fetching metadata:', error);
      setLastUpdated(new Date());
    }
  };

  // Initialize data and set up polling for real-time updates
  useEffect(() => {
    const initializeData = async () => {
      try {
        setLoading(true);
        setError(''); // Clear any previous errors
        await refreshMenuItems();
        await refreshMetadata();
        setLoading(false);
      } catch (error) {
        console.error('Failed to initialize data:', error);
        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
        setError(`Connection failed: ${errorMessage}`);
        setLoading(false);
      }
    };

    initializeData();

    // Set up polling for real-time updates (every 10 seconds to reduce load)
    const pollInterval = setInterval(async () => {
      try {
        await refreshMenuItems();
        await refreshMetadata();
        // Clear error if polling succeeds
        if (error) {
          setError('');
        }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Polling failed';
        console.error('Polling error:', errorMessage);
        // Only set error if we don't already have one to avoid spam
        if (!error) {
          setError(`Connection lost: ${errorMessage}`);
        }
      }
    }, 10000); // Increased to 10 seconds

    return () => clearInterval(pollInterval);
  }, []);

  // Clear error after 5 seconds
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError('');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-amber-600 mx-auto mb-4"></div>
          <h2 className="text-2xl font-semibold text-amber-800 mb-2">Loading Menu...</h2>
          <p className="text-amber-600">Connecting to MongoDB Atlas</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-lg shadow-lg max-w-md">
          <div className="text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-semibold text-red-800 mb-2">Connection Error</h2>
          <p className="text-red-600 mb-4">{error}</p>
          <div className="space-y-2">
            <button
              onClick={() => window.location.reload()}
              className="w-full bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
            >
              Refresh Page
            </button>
            <p className="text-sm text-gray-600">
              Make sure the backend server is running on port 3001
            </p>
          </div>
        </div>
      </div>
    );
  }

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'login':
        return (
          <LoginPage
            onLogin={handleLogin}
            onBack={() => setCurrentPage('home')}
            error={loginError}
          />
        );
      case 'admin':
        return (
          <AdminPanel
            menuItems={menuItems}
            onUpdateMenu={handleBulkUpdateMenu}
            onAddMenuItem={handleAddMenuItem}
            onUpdateMenuItem={handleUpdateMenuItem}
            onDeleteMenuItem={handleDeleteMenuItem}
          />
        );
      default:
        return (
          <HomePage
            menuItems={menuItems}
            lastUpdated={lastUpdated}
            loading={loading}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Real-time connection indicator */}
      <div className="fixed top-4 right-4 z-50">
        <div className="bg-blue-100 border border-blue-300 rounded-full px-3 py-1 flex items-center space-x-2">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
          <span className="text-blue-700 text-xs font-medium">MongoDB Atlas</span>
        </div>
      </div>
      
      {currentPage !== 'login' && (
        <Header
          isAdmin={!!user?.isAuthenticated}
          onLoginClick={() => setCurrentPage('login')}
          onLogout={handleLogout}
          currentUser={user?.username}
        />
      )}
      {renderCurrentPage()}
    </div>
  );
}

export default App;