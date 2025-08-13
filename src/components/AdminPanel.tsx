import React, { useState } from 'react';
import { Plus, Edit2, Save, X, Trash2 } from 'lucide-react';
import { MenuItem } from '../types';

interface AdminPanelProps {
  menuItems: MenuItem[];
  onUpdateMenu: (items: MenuItem[]) => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ menuItems, onUpdateMenu }) => {
  const [items, setItems] = useState<MenuItem[]>(menuItems);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newItem, setNewItem] = useState({
    name: '',
    price: '',
    category: 'main-course',
    description: '',
    available: true,
  });

  const categories = ['breakfast', 'main-course', 'soft-drinks', 'snacks', 'beverages', 'bakery'];
    useEffect(() => {
    setItems(menuItems);
  }, [menuItems]);

  const toggleAvailability = (id: string) => {
    const updatedItems = items.map(item =>
      item.id === id ? { ...item, available: !item.available } : item
    );
    setItems(updatedItems);
  };

  const handleAddItem = () => {
    if (!newItem.name || !newItem.price) return;

    const item: MenuItem = {
      id: Date.now().toString(),
      name: newItem.name,
      price: parseFloat(newItem.price),
      category: newItem.category,
      description: newItem.description || undefined,
      available: newItem.available,
    };

    const updatedItems = [...items, item];
    setItems(updatedItems);
    setNewItem({
      name: '',
      price: '',
      category: 'main-course',
      description: '',
      available: true,
    });
    setShowAddForm(false);
  };

  const handleEditItem = (id: string, field: string, value: any) => {
    const updatedItems = items.map(item =>
      item.id === id ? { ...item, [field]: value } : item
    );
    setItems(updatedItems);
  };

  const handleDeleteItem = (id: string) => {
    const updatedItems = items.filter(item => item.id !== id);
    setItems(updatedItems);
  };

  const handleUpdateMenu = () => {
    onUpdateMenu(items);
    alert('Menu updated successfully!');
  };

  const getAvailableCount = () => items.filter(item => item.available).length;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-800">Canteen Management Panel</h2>
              <p className="text-gray-600 mt-2">
                Manage menu items and availability • {getAvailableCount()} items currently available
              </p>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={() => setShowAddForm(true)}
                className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                <Plus size={20} />
                <span>Add Item</span>
              </button>
              <button
                onClick={handleUpdateMenu}
                className="flex items-center space-x-2 bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 transition-colors"
              >
                <Save size={20} />
                <span>Update Menu</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Add Item Form Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Add New Menu Item</h3>
              <button
                onClick={() => setShowAddForm(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  value={newItem.name}
                  onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500"
                  placeholder="Enter item name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹)</label>
                <input
                  type="number"
                  step="0.01"
                  value={newItem.price}
                  onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500"
                  placeholder="Enter price"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  value={newItem.category}
                  onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' ')}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description (Optional)</label>
                <textarea
                  value={newItem.description}
                  onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500"
                  rows={3}
                  placeholder="Enter description"
                />
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="available"
                  checked={newItem.available}
                  onChange={(e) => setNewItem({ ...newItem, available: e.target.checked })}
                  className="mr-2"
                />
                <label htmlFor="available" className="text-sm font-medium text-gray-700">
                  Available immediately
                </label>
              </div>
              <div className="flex space-x-3 pt-4">
                <button
                  onClick={handleAddItem}
                  className="flex-1 bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition-colors"
                >
                  Add Item
                </button>
                <button
                  onClick={() => setShowAddForm(false)}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-md hover:bg-gray-400 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Menu Items Grid */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {categories.map(category => {
          const categoryItems = items.filter(item => item.category === category);
          if (categoryItems.length === 0) return null;

          return (
            <div key={category} className="mb-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-4 capitalize">
                {category.replace('-', ' ')} ({categoryItems.length} items)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {categoryItems.map((item) => (
                  <div
                    key={item.id}
                    className={`bg-white rounded-lg shadow-md p-4 border-2 transition-all ${
                      item.available
                        ? 'border-green-200 bg-green-50'
                        : 'border-gray-200 bg-gray-50 opacity-75'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-3">
                      {editingId === item.id ? (
                        <input
                          type="text"
                          value={item.name}
                          onChange={(e) => handleEditItem(item.id, 'name', e.target.value)}
                          className="text-lg font-semibold bg-transparent border-b border-gray-300 focus:border-amber-500 outline-none flex-1 mr-2"
                        />
                      ) : (
                        <h4 className="text-lg font-semibold text-gray-800">{item.name}</h4>
                      )}
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => setEditingId(editingId === item.id ? null : item.id)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={() => handleDeleteItem(item.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>

                    {editingId === item.id ? (
                      <div className="space-y-3">
                        <input
                          type="number"
                          step="0.01"
                          value={item.price}
                          onChange={(e) => handleEditItem(item.id, 'price', parseFloat(e.target.value))}
                          className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-amber-500"
                          placeholder="Price"
                        />
                        <select
                          value={item.category}
                          onChange={(e) => handleEditItem(item.id, 'category', e.target.value)}
                          className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-amber-500"
                        >
                          {categories.map(cat => (
                            <option key={cat} value={cat}>
                              {cat.charAt(0).toUpperCase() + cat.slice(1).replace('-', ' ')}
                            </option>
                          ))}
                        </select>
                        <textarea
                          value={item.description || ''}
                          onChange={(e) => handleEditItem(item.id, 'description', e.target.value)}
                          className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-amber-500"
                          rows={2}
                          placeholder="Description"
                        />
                      </div>
                    ) : (
                      <>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-xl font-bold text-amber-600">₹{item.price}</span>
                          <span className="text-sm text-gray-500 capitalize">{item.category.replace('-', ' ')}</span>
                        </div>
                        {item.description && (
                          <p className="text-gray-600 text-sm mb-3">{item.description}</p>
                        )}
                      </>
                    )}

                    <button
                      onClick={() => toggleAvailability(item.id)}
                      className={`w-full py-2 rounded-md font-medium transition-colors ${
                        item.available
                          ? 'bg-green-600 text-white hover:bg-green-700'
                          : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
                      }`}
                    >
                      {item.available ? '✓ Available' : 'Not Available'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          );
        })}

        {items.length === 0 && (
          <div className="text-center py-12">
            <div className="bg-white rounded-lg shadow-md p-8 max-w-md mx-auto">
              <div className="text-6xl mb-4">🍽️</div>
              <h3 className="text-2xl font-semibold text-gray-700 mb-2">No Menu Items</h3>
              <p className="text-gray-500 mb-4">Start by adding your first menu item!</p>
              <button
                onClick={() => setShowAddForm(true)}
                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                Add First Item
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};