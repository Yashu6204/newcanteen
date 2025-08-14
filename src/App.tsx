import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HomePage } from './components/HomePage';
import { LoginPage } from './components/LoginPage';
import { AdminPanel } from './components/AdminPanel';
import { MenuItem, User } from './types';

// Demo data
const initialMenuItems: MenuItem[] = [
  {
    "id": "1",
    "name": "Veg Puff",
    "price": 25,
    "category": "bakery",
    "description": "",
    "available": true
  },
  {
    "id": "2",
    "name": "Egg Puff",
    "price": 30,
    "category": "bakery",
    "description": "",
    "available": true
  },
  {
    "id": "3",
    "name": "Chicken Puff",
    "price": 35,
    "category": "bakery",
    "description": "",
    "available": true
  },
  {
    "id": "4",
    "name": "Aloo Samosa",
    "price": 10,
    "category": "bakery",
    "description": "",
    "available": true
  },
  {
    "id": "5",
    "name": "Sweet Corn Samosa",
    "price": 15,
    "category": "bakery",
    "description": "",
    "available": true
  },
  {
    "id": "6",
    "name": "Cup Cakes",
    "price": 20,
    "category": "bakery",
    "description": "",
    "available": true
  },
  {
    "id": "7",
    "name": "Cream Bun",
    "price": 20,
    "category": "bakery",
    "description": "",
    "available": true
  },
  {
    "id": "8",
    "name": "Roll Cake",
    "price": 15,
    "category": "bakery",
    "description": "",
    "available": true
  },
  {
    "id": "9",
    "name": "Aloo Bonda",
    "price": 10,
    "category": "bakery",
    "description": "",
    "available": true
  },
  {
    "id": "10",
    "name": "Dil Pasand",
    "price": 20,
    "category": "bakery",
    "description": "",
    "available": true
  },
  {
    "id": "11",
    "name": "Mango Bar",
    "price": 10,
    "category": "ice-cream",
    "description": "",
    "available": true
  },
  {
    "id": "12",
    "name": "Orange Bar",
    "price": 20,
    "category": "ice-cream",
    "description": "",
    "available": true
  },
  {
    "id": "13",
    "name": "Choco Bar",
    "price": 25,
    "category": "ice-cream",
    "description": "",
    "available": true
  },
  {
    "id": "14",
    "name": "Vanilla Cone",
    "price": 35,
    "category": "ice-cream",
    "description": "",
    "available": true
  },
  {
    "id": "15",
    "name": "Chocolate Cone",
    "price": 35,
    "category": "ice-cream",
    "description": "",
    "available": true
  },
  {
    "id": "16",
    "name": "Butterscotch Cone",
    "price": 25,
    "category": "ice-cream",
    "description": "",
    "available": true
  },
  {
    "id": "17",
    "name": "Black Current Cone",
    "price": 25,
    "category": "ice-cream",
    "description": "",
    "available": true
  },
  {
    "id": "18",
    "name": "Chocolate Cup",
    "price": 45,
    "category": "ice-cream",
    "description": "",
    "available": true
  },
  {
    "id": "19",
    "name": "Butterscotch Cup",
    "price": 45,
    "category": "ice-cream",
    "description": "",
    "available": true
  },
  {
    "id": "20",
    "name": "Veg Fried Rice",
    "price": 60,
    "category": "fast-foods",
    "description": "",
    "available": true
  },
  {
    "id": "21",
    "name": "Egg Fried Rice",
    "price": 80,
    "category": "fast-foods",
    "description": "",
    "available": true
  },
  {
    "id": "22",
    "name": "Chicken Fried Rice",
    "price": 100,
    "category": "fast-foods",
    "description": "",
    "available": true
  },
  {
    "id": "23",
    "name": "Veg Noodles",
    "price": 60,
    "category": "fast-foods",
    "description": "",
    "available": true
  },
  {
    "id": "24",
    "name": "Egg Noodles",
    "price": 80,
    "category": "fast-foods",
    "description": "",
    "available": true
  },
  {
    "id": "25",
    "name": "Chicken Noodles",
    "price": 100,
    "category": "fast-foods",
    "description": "",
    "available": true
  },
  {
    "id": "26",
    "name": "Mountain Dew",
    "price": 20,
    "category": "soft-drinks",
    "description": "",
    "available": true
  },
  {
    "id": "27",
    "name": "Sprite",
    "price": 20,
    "category": "soft-drinks",
    "description": "",
    "available": true
  },
  {
    "id": "28",
    "name": "Thumbs Up",
    "price": 20,
    "category": "soft-drinks",
    "description": "",
    "available": true
  },
  {
    "id": "29",
    "name": "Mazaa",
    "price": 20,
    "category": "soft-drinks",
    "description": "",
    "available": true
  },
  {
    "id": "30",
    "name": "7 Up",
    "price": 20,
    "category": "soft-drinks",
    "description": "",
    "available": true
  },
  {
    "id": "31",
    "name": "Mirinda",
    "price": 20,
    "category": "soft-drinks",
    "description": "",
    "available": true
  },
  {
    "id": "32",
    "name": "Pulpy Orange",
    "price": 30,
    "category": "soft-drinks",
    "description": "",
    "available": true
  },
  {
    "id": "33",
    "name": "Fanta",
    "price": 20,
    "category": "soft-drinks",
    "description": "",
    "available": true
  },
  {
    "id": "34",
    "name": "Pepsi",
    "price": 20,
    "category": "soft-drinks",
    "description": "",
    "available": true
  },
  {
    "id": "35",
    "name": "Limca",
    "price": 20,
    "category": "soft-drinks",
    "description": "",
    "available": true
  },
  {
    "id": "36",
    "name": "Badam Milk",
    "price": 30,
    "category": "soft-drinks",
    "description": "",
    "available": true
  },
  {
    id: '37',
    name: 'Red Bull',
    price: 120,
    category: 'soft-drinks',
    description: '',
    available: true
  },
  {
    id: '38',
    name: 'Filter Coffee',
    price: 30,
    category: 'beverages',
    description: 'Traditional South Indian filter coffee',
    available: true,
  },
  {
    id: '39',
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