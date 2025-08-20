import React, { useState, useEffect } from 'react';
import { 
  collection, 
  doc, 
  onSnapshot, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  setDoc, 
  getDocs,
  serverTimestamp,
  query,
  orderBy
} from 'firebase/firestore';
import { db } from './firebase';
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

  // Firebase functions for real-time operations
  const handleAddMenuItem = async (item: Omit<MenuItem, 'id'>) => {
    try {
      const docRef = await addDoc(collection(db, 'menuItems'), {
        ...item,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      
      // Update metadata
      await setDoc(doc(db, 'metadata', 'lastUpdated'), {
        timestamp: serverTimestamp(),
        updatedBy: user?.username || 'Admin'
      });
      
      console.log('Menu item added with ID: ', docRef.id);
    } catch (error) {
      console.error('Error adding menu item: ', error);
      setError('Failed to add menu item. Please try again.');
    }
  };

  const handleUpdateMenuItem = async (id: string, updates: Partial<MenuItem>) => {
    try {
      const itemRef = doc(db, 'menuItems', id);
      await updateDoc(itemRef, {
        ...updates,
        updatedAt: serverTimestamp()
      });
      
      // Update metadata
      await setDoc(doc(db, 'metadata', 'lastUpdated'), {
        timestamp: serverTimestamp(),
        updatedBy: user?.username || 'Admin'
      });
      
      console.log('Menu item updated: ', id);
    } catch (error) {
      console.error('Error updating menu item: ', error);
      setError('Failed to update menu item. Please try again.');
    }
  };

  const handleDeleteMenuItem = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'menuItems', id));
      
      // Update metadata
      await setDoc(doc(db, 'metadata', 'lastUpdated'), {
        timestamp: serverTimestamp(),
        updatedBy: user?.username || 'Admin'
      });
      
      console.log('Menu item deleted: ', id);
    } catch (error) {
      console.error('Error deleting menu item: ', error);
      setError('Failed to delete menu item. Please try again.');
    }
  };

  const handleBulkUpdateMenu = async (updatedItems: MenuItem[]) => {
    try {
      // This is for backward compatibility with the existing AdminPanel
      // In practice, individual updates are preferred for real-time sync
      const batch = updatedItems.map(async (item) => {
        const itemRef = doc(db, 'menuItems', item.id);
        return updateDoc(itemRef, {
          ...item,
          updatedAt: serverTimestamp()
        });
      });
      
      await Promise.all(batch);
      
      // Update metadata
      await setDoc(doc(db, 'metadata', 'lastUpdated'), {
        timestamp: serverTimestamp(),
        updatedBy: user?.username || 'Admin'
      });
      
      console.log('Menu bulk updated successfully');
    } catch (error) {
      console.error('Error bulk updating menu: ', error);
      setError('Failed to update menu. Please try again.');
    }
  };

  // Initialize Firestore with default data if empty
  const initializeFirestore = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'menuItems'));
      
      if (querySnapshot.empty) {
        console.log('Initializing Firestore with default menu items...');
        
        // Add items one by one to avoid overwhelming Firestore
        for (const item of initialMenuItems) {
          await addDoc(collection(db, 'menuItems'), {
            ...item,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp()
          });
        }
        
        // Set initial metadata
        await setDoc(doc(db, 'metadata', 'lastUpdated'), {
          timestamp: serverTimestamp(),
          updatedBy: 'System'
        });
        
        console.log('Firestore initialized successfully');
      }
    } catch (error) {
      console.error('Error initializing Firestore: ', error);
      console.log('Using local data as fallback');
      // Use local data as fallback
      setMenuItems(initialMenuItems);
      setLastUpdated(new Date());
      setLoading(false);
    }
  };

  useEffect(() => {
    let unsubscribeItems: (() => void) | undefined;
    let unsubscribeMetadata: (() => void) | undefined;

    const setupRealtimeListeners = async () => {
      try {
        setLoading(true);
        
        // Initialize Firestore if needed
        await initializeFirestore();
        
        // Set up real-time listener for menu items
        const itemsQuery = query(
          collection(db, 'menuItems'),
          orderBy('createdAt', 'asc')
        );
        
        unsubscribeItems = onSnapshot(itemsQuery, (snapshot) => {
          const items: MenuItem[] = [];
          snapshot.forEach((doc) => {
            const data = doc.data();
            items.push({
              id: doc.id,
              name: data.name,
              price: data.price,
              category: data.category,
              description: data.description,
              available: data.available
            });
          });
          
          setMenuItems(items);
          setLoading(false);
          console.log('Menu items updated from Firestore:', items.length, 'items');
        }, (error) => {
          console.error('Error listening to menu items: ', error);
          console.log('Using local data as fallback');
          // Use local data as fallback
          setMenuItems(initialMenuItems);
          setLastUpdated(new Date());
          setLoading(false);
        });
        
        // Set up real-time listener for metadata
        unsubscribeMetadata = onSnapshot(doc(db, 'metadata', 'lastUpdated'), (doc) => {
          if (doc.exists()) {
            const data = doc.data();
            if (data.timestamp) {
              // Convert Firestore timestamp to Date
              const timestamp = data.timestamp.toDate ? data.timestamp.toDate() : new Date(data.timestamp);
              setLastUpdated(timestamp);
              console.log('Last updated timestamp synced:', timestamp);
            }
          } else {
            setLastUpdated(new Date());
          }
        }, (error) => {
          console.error('Error listening to metadata: ', error);
          // Set current time as fallback
          setLastUpdated(new Date());
        });
        
      } catch (error) {
        console.error('Error setting up real-time listeners: ', error);
        console.log('Using local data as fallback');
        // Use local data as fallback
        setMenuItems(initialMenuItems);
        setLastUpdated(new Date());
        setLoading(false);
      }
    };

    setupRealtimeListeners();
    
    // Cleanup listeners on unmount
    return () => {
      if (unsubscribeItems) {
        unsubscribeItems();
      }
      if (unsubscribeMetadata) {
        unsubscribeMetadata();
      }
    };
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
          <p className="text-amber-600">Connecting to real-time updates</p>
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
          <button
            onClick={() => window.location.reload()}
            className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
          >
            Refresh Page
          </button>
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
        <div className="bg-green-100 border border-green-300 rounded-full px-3 py-1 flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-green-700 text-xs font-medium">Live Updates</span>
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