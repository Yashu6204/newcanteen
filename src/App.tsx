import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HomePage } from './components/HomePage';
import { LoginPage } from './components/LoginPage';
import { AdminPanel } from './components/AdminPanel';
import { MenuItem, User } from './types';

// Demo data
const initialMenuItems: MenuItem[] = [
  {
    id: '1',
    name: 'Classic Burger',
    price: 120,
    category: 'main-course',
    description: 'Juicy beef patty with fresh lettuce, tomato, and cheese',
    available: true,
  },
  {
    id: '2',
    name: 'Margherita Pizza',
    price: 200,
    category: 'main-course',
    description: 'Fresh mozzarella, basil, and tomato sauce on thin crust',
    available: true,
  },
  {
    id: '3',
    name: 'Caesar Salad',
    price: 80,
    category: 'snacks',
    description: 'Crisp romaine lettuce with Caesar dressing and croutons',
    available: false,
  },
  {
    id: '4',
    name: 'Filter Coffee',
    price: 30,
    category: 'beverages',
    description: 'Traditional South Indian filter coffee',
    available: true,
  },
  {
    id: '5',
    name: 'Chocolate Brownie',
    price: 60,
    category: 'desserts',
    description: 'Rich chocolate brownie with vanilla ice cream',
    available: true,
  },
  {
    id: '6',
    name: 'Masala Dosa',
    price: 90,
    category: 'breakfast',
    description: 'Crispy dosa with spiced potato filling and chutneys',
    available: true,
  },
];

type Page = 'home' | 'login' | 'admin';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [user, setUser] = useState<User | null>(null);
  const [menuItems, setMenuItems] = useState<MenuItem[]>(initialMenuItems);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [loginError, setLoginError] = useState<string>('');

  const handleLogin = (username: string, password: string): boolean => {
    // Demo authentication - in production, use proper authentication
    if (username === 'admin' && password === 'admin123') {
      setUser({
        username: 'admin',
        isAuthenticated: true,
      });
      setCurrentPage('admin');
      setLoginError('');
      return true;
    } else {
      setLoginError('Invalid username or password. Try admin/admin123');
      return false;
    }
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentPage('home');
  };

  const handleUpdateMenu = (updatedItems: MenuItem[]) => {
    setMenuItems(updatedItems);
    setLastUpdated(new Date());
    // Save to localStorage for persistence
    localStorage.setItem('canteenMenuItems', JSON.stringify(updatedItems));
    localStorage.setItem('canteenLastUpdated', new Date().toISOString());
  };

  // Load menu items from localStorage on component mount
  useEffect(() => {
    const savedItems = localStorage.getItem('canteenMenuItems');
    const savedLastUpdated = localStorage.getItem('canteenLastUpdated');
    
    if (savedItems) {
      try {
        const parsedItems = JSON.parse(savedItems);
        setMenuItems(parsedItems);
      } catch (error) {
        console.error('Error loading saved menu items:', error);
      }
    }
    
    if (savedLastUpdated) {
      try {
        setLastUpdated(new Date(savedLastUpdated));
      } catch (error) {
        console.error('Error loading last updated date:', error);
      }
    }
  }, []);

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
            onUpdateMenu={handleUpdateMenu}
          />
        );
      default:
        return (
          <HomePage
            menuItems={menuItems}
            lastUpdated={lastUpdated}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
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