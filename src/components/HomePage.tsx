import React from 'react';
import { Clock, Phone, Mail, MapPin } from 'lucide-react';
import { MenuItem } from '../types';

interface HomePageProps {
  menuItems: MenuItem[];
  lastUpdated: Date | null;
  loading?: boolean;
}

export const HomePage: React.FC<HomePageProps> = ({ menuItems, lastUpdated, loading = false }) => {
  const availableItems = menuItems.filter(item => item.available);
  const categorizedItems = availableItems.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, MenuItem[]>);

  const formatTimestamp = (date: Date) => {
    return date.toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-amber-600 mx-auto mb-4"></div>
          <h2 className="text-2xl font-semibold text-amber-800 mb-2">Loading Fresh Menu...</h2>
          <p className="text-amber-600">Getting the latest updates for you</p>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      {/* Hero Section */}
      <section className="bg-white shadow-sm border-b-4 border-amber-200">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-amber-800 mb-4">
              Today's Available Menu
              <span className="inline-flex items-center ml-3">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-green-600 ml-2 font-normal">Live Updates</span>
              </span>
            </h2>
            {lastUpdated && (
              <div className="flex items-center justify-center space-x-2 text-amber-600 mb-6">
              <Clock size={20} />
              <span className="text-lg">Last Updated: {formatTimestamp(lastUpdated)}</span>
            </div>
            )}
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Enjoy your delicious food with real-time menu updates across all devices
            </p>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4">
          {Object.keys(categorizedItems).length === 0 ? (
            <div className="text-center py-12">
              <div className="bg-white rounded-lg shadow-md p-8 max-w-md mx-auto">
                <div className="text-6xl mb-4">🍽️</div>
                <h3 className="text-2xl font-semibold text-gray-700 mb-2">No Items Available</h3>
                <p className="text-gray-500">Our kitchen is updating the menu. Check back in a moment!</p>
                <div className="mt-4 flex items-center justify-center space-x-2 text-green-600">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm">Waiting for live updates...</span>
                </div>
              </div>
            </div>
          ) : (
            Object.entries(categorizedItems).map(([category, items]) => (
              <div key={category} className="mb-12">
                <h3 className="text-3xl font-bold text-amber-800 mb-6 text-center capitalize">
                  {category}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-amber-100"
                    >
                      <div className="p-6">
                        <div className="flex justify-between items-start mb-3">
                          <h4 className="text-xl font-semibold text-gray-800">{item.name}</h4>
                          <span className="text-2xl font-bold text-amber-600">₹{item.price}</span>
                        </div>
                        {item.description && (
                          <p className="text-gray-600 mb-4">{item.description}</p>
                        )}
                        <div className="flex justify-between items-center">
                          <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                            ✓ Available Now
                          </span>
                          <span className="text-sm text-gray-500 capitalize">{item.category}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-amber-800 text-white py-12 mt-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold mb-4">Contact & Queries</h3>
            <p className="text-amber-200 text-lg">
              Have questions about our menu or special dietary requirements? We're here to help!
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-amber-700 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Phone size={24} />
              </div>
              <h4 className="text-xl font-semibold mb-2">Phone</h4>
              <p className="text-amber-200">+91 94910 66383</p>
              <p className="text-amber-200">+91 70758 66383</p>
            </div>
            
            <div className="text-center">
              <div className="bg-amber-700 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Mail size={24} />
              </div>
              <h4 className="text-xl font-semibold mb-2">Email</h4>
              <p className="text-amber-200">info@jntukcanteen.com</p>
              <p className="text-amber-200">order@jntukcanteen.com</p>
            </div>
            
            <div className="text-center">
              <div className="bg-amber-700 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <MapPin size={24} />
              </div>
              <h4 className="text-xl font-semibold mb-2">Location</h4>
              <p className="text-amber-200">Ground Floor, Main Building</p>
              <p className="text-amber-200">Kakikanada </p>
            </div>
          </div>
          
          <div className="text-center mt-8 pt-8 border-t border-amber-700">
            <p className="text-amber-200">
              Opening Hours: Monday - Saturday, 8:00 AM - 8:00 PM | Sunday, 9:00 AM - 9:00 PM
            </p>
            <p className="text-amber-300 text-sm mt-2">
              🔄 Menu updates automatically across all devices in real-time
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};