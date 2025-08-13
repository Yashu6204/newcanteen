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
    "name": "Veg Fried Rice",
    "price": 60,
    "category": "main-course",
    "description": "",
    "available": true
  },
  {
    "id": "2",
    "name": "Egg Fried Rice",
    "price": 80,
    "category": "main-course",
    "description": "",
    "available": true
  },
  {
    "id": "3",
    "name": "Chicken Fried Rice",
    "price": 100,
    "category": "main-course",
    "description": "",
    "available": true
  },
  {
    "id": "4",
    "name": "Veg Noodles",
    "price": 60,
    "category": "main-course",
    "description": "",
    "available": true
  },
  {
    "id": "5",
    "name": "Egg Noodles",
    "price": 80,
    "category": "main-course",
    "description": "",
    "available": true
  },
      {
    "id": "6",
    "name": "Chicken Noodles",
    "price": 100,
    "category": "main-course",
    "description": "",
    "available": true
  },
     {
    id: '7',
    name: 'Masala Dosa',
    price: 90,
    category: 'breakfast',
    description: 'Crispy dosa with spiced potato filling and chutneys',
    available: true,
  },
   {
     "id": "8",
    "name": "Veg Puff",
    "price": 25,
    "category": "bakery",
    "description": "",
    "available": true
  },
  {
    "id": "9",
    "name": "Egg Puff",
    "price": 30,
    "category": "bakery",
    "description": "",
    "available": true
  },
  {
    "id": "10",
    "name": "Chicken Puff",
    "price": 35,
    "category": "bakery",
    "description": "",
    "available": true
  },
  {
    "id": "11",
    "name": "Aloo Samosa",
    "price": 10,
    "category": "bakery",
    "description": "",
    "available": true
  },
  {
    "id": "12",
    "name": "Sweet Corn Samosa",
    "price": 15,
    "category": "bakery",
    "description": "",
    "available": true
  },
  {
    "id": "13",
    "name": "Cup Cakes",
    "price": 20,
    "category": "bakery",
    "description": "",
    "available": true
  },
  {
    "id": "14",
    "name": "Cream Bun",
    "price": 20,
    "category": "bakery",
    "description": "",
    "available": true
  },
  {
    "id": "15",
    "name": "Roll Cake",
    "price": 15,
    "category": "bakery",
    "description": "",
    "available": true
  },
  {
    "id": "16",
    "name": "Aloo Bonda",
    "price": 10,
    "category": "bakery",
    "description": "",
    "available": true
  },
  {
    "id": "17",
    "name": "Dil Pasand",
    "price": 20,
    "category": "bakery",
    "description": "",
    "available": true
  },
   
  {
    "id": "18",
    "name": "Chocolate Milkshake",
    "price": 60,
    "category": "milk-shakes",
    "description": "Rich and creamy chocolate shake",
    "available": true
  },
  {
    "id": "19",
    "name": "Strawberry Milkshake",
    "price": 65,
    "category": "milk-shakes",
    "description": "Sweet strawberry flavor blended with ice cream",
    "available": true
  },
  {
    "id": "20",
    "name": "Vanilla Milkshake",
    "price": 55,
    "category": "milk-shakes",
    "description": "Classic vanilla bean flavored shake",
    "available": true
  },
  {
    "id": "21",
    "name": "Mango Lassi",
    "price": 70,
    "category": "milk-shakes",
    "description": "A traditional yogurt-based mango drink",
    "available": true
  },
  {
    "id": "22",
    "name": "Fresh Orange Juice",
    "price": 40,
    "category": "juices",
    "description": "Freshly squeezed orange juice, no added sugar",
    "available": true
  },
  {
    "id": "23",
    "name": "Watermelon Juice",
    "price": 45,
    "category": "juices",
    "description": "Refreshing juice made from fresh watermelon",
    "available": true
  },
  {
    "id": "24",
    "name": "Pineapple Juice",
    "price": 40,
    "category": "juices",
    "description": "Tropical pineapple juice, perfect for a hot day",
    "available": true
  },
  {
    "id": "25",
    "name": "Mango Bar",
    "price": 10,
    "category": "ice-cream",
    "description": "",
    "available": true
  },
  {
    "id": "26",
    "name": "Orange Bar",
    "price": 20,
    "category": "ice-cream",
    "description": "",
    "available": true
  },
  {
    "id": "27",
    "name": "Choco Bar",
    "price": 25,
    "category": "ice-cream",
    "description": "",
    "available": true
  },
  {
    "id": "28",
    "name": "Vanilla Cone",
    "price": 35,
    "category": "ice-cream",
    "description": "",
    "available": true
  },
  {
    "id": "29",
    "name": "Chocolate Cone",
    "price": 35,
    "category": "ice-cream",
    "description": "",
    "available": true
  },
  {
    "id": "30",
    "name": "Butterscotch Cone",
    "price": 25,
    "category": "ice-cream",
    "description": "",
    "available": true
  },
  {
    "id": "31",
    "name": "Black Current Cone",
    "price": 25,
    "category": "ice-cream",
    "description": "",
    "available": true
  },
  {
    "id": "32",
    "name": "Chocolate Cup",
    "price": 45,
    "category": "ice-cream",
    "description": "",
    "available": true
  },
  {
    "id": "33",
    "name": "Butterscotch Cup",
    "price": 45,
    "category": "ice-cream",
    "description": "",
    "available": true
  },
  {
    "id": "34",
    "name": "Mountain Dew",
    "price": 20,
    "category": "soft-drinks",
    "description": "",
    "available": true
  },
  {
    "id": "35",
    "name": "Sprite",
    "price": 20,
    "category": "soft-drinks",
    "description": "",
    "available": true
  },
  {
    "id": "36",
    "name": "Thumbs Up",
    "price": 20,
    "category": "soft-drinks",
    "description": "",
    "available": true
  },
  {
    "id": "37",
    "name": "Mazaa",
    "price": 20,
    "category": "soft-drinks",
    "description": "",
    "available": true
  },
  {
    "id": "38",
    "name": "7 Up",
    "price": 20,
    "category": "soft-drinks",
    "description": "",
    "available": true
  },
  {
    "id": "39",
    "name": "Mirinda",
    "price": 20,
    "category": "soft-drinks",
    "description": "",
    "available": true
  },
  {
    "id": "40",
    "name": "Pulpy Orange",
    "price": 30,
    "category": "soft-drinks",
    "description": "",
    "available": true
  },
  {
    "id": "41",
    "name": "Fanta",
    "price": 20,
    "category": "soft-drinks",
    "description": "",
    "available": true
  },
  {
    "id": "42",
    "name": "Pepsi",
    "price": 20,
    "category": "soft-drinks",
    "description": "",
    "available": true
  },
  {
    "id": "43",
    "name": "Limca",
    "price": 20,
    "category": "soft-drinks",
    "description": "",
    "available": true
  },
  {
    "id": "44",
    "name": "Badam Milk",
    "price": 30,
    "category": "soft-drinks",
    "description": "",
    "available": true
  },
  {
    "id": "45",
    "name": "Red Bull",
    "price": 120,
    "category": "soft-drinks",
    "description": "",
    "available": true
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