const express = require('express');
const cors = require('cors');
const { MongoClient, ObjectId } = require('mongodb');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/canteen';

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../dist')));
}

// MongoDB connection
let db;
let menuCollection;
let metadataCollection;

async function connectToMongoDB() {
  try {
    const client = new MongoClient(MONGODB_URI);
    await client.connect();
    db = client.db('canteen');
    menuCollection = db.collection('menu_items');
    metadataCollection = db.collection('metadata');
    console.log('✅ Connected to MongoDB Atlas');
    
    // Initialize with default data if empty
    await initializeDefaultData();
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }
}

// Initialize default menu data
async function initializeDefaultData() {
  try {
    const count = await menuCollection.countDocuments();
    if (count === 0) {
      console.log('📝 Initializing default menu data...');
      
      const defaultItems = [
        { name: 'Chicken Biryani', price: 120, category: 'main-course', description: 'Aromatic basmati rice with tender chicken', available: true },
        { name: 'Veg Biryani', price: 100, category: 'main-course', description: 'Fragrant rice with mixed vegetables', available: true },
        { name: 'Chicken Curry', price: 80, category: 'main-course', description: 'Spicy chicken curry with rice', available: true },
        { name: 'Dal Rice', price: 60, category: 'main-course', description: 'Comfort food with lentils and rice', available: true },
        { name: 'Masala Dosa', price: 50, category: 'breakfast', description: 'Crispy dosa with potato filling', available: true },
        { name: 'Idli Sambar', price: 40, category: 'breakfast', description: 'Steamed rice cakes with sambar', available: true },
        { name: 'Poha', price: 30, category: 'breakfast', description: 'Flattened rice with vegetables', available: true },
        { name: 'Tea', price: 15, category: 'beverages', description: 'Hot masala tea', available: true },
        { name: 'Coffee', price: 20, category: 'beverages', description: 'Fresh filter coffee', available: true },
        { name: 'Cold Drink', price: 25, category: 'soft-drinks', description: 'Chilled soft drinks', available: true },
        { name: 'Samosa', price: 20, category: 'fast-foods', description: 'Crispy fried pastry with filling', available: true },
        { name: 'Sandwich', price: 40, category: 'fast-foods', description: 'Grilled vegetable sandwich', available: true },
        { name: 'Cake Slice', price: 35, category: 'bakery', description: 'Fresh baked cake slice', available: true },
        { name: 'Cookies', price: 25, category: 'bakery', description: 'Assorted cookies', available: true },
        { name: 'Ice Cream', price: 30, category: 'ice-cream', description: 'Vanilla ice cream cup', available: true }
      ];

      await menuCollection.insertMany(defaultItems);
      
      // Initialize metadata
      await metadataCollection.insertOne({
        _id: 'last_updated',
        timestamp: new Date(),
        updatedBy: 'System'
      });
      
      console.log('✅ Default menu data initialized');
    }
  } catch (error) {
    console.error('Error initializing default data:', error);
  }
}

// API Routes

// Get all menu items
app.get('/api/menu-items', async (req, res) => {
  try {
    const menuItems = await menuCollection.find({}).toArray();
    // Convert MongoDB _id to id for frontend compatibility
    const formattedItems = menuItems.map(item => ({
      ...item,
      id: item._id.toString(),
      _id: undefined
    }));
    res.json(formattedItems);
  } catch (error) {
    console.error('Error fetching menu:', error);
    res.status(500).json({ error: 'Failed to fetch menu items' });
  }
});

// Get metadata (last updated info)
app.get('/api/metadata', async (req, res) => {
  try {
    const metadata = await metadataCollection.findOne({ _id: 'last_updated' });
    res.json({
      timestamp: metadata?.timestamp || new Date(),
      updatedBy: metadata?.updatedBy || 'System'
    });
  } catch (error) {
    console.error('Error fetching metadata:', error);
    res.status(500).json({ error: 'Failed to fetch metadata' });
  }
});

// Add new menu item
app.post('/api/menu-items', async (req, res) => {
  try {
    const { name, price, category, description, available } = req.body;
    
    if (!name || !price || !category) {
      return res.status(400).json({ error: 'Name, price, and category are required' });
    }

    const newItem = {
      name,
      price: parseFloat(price),
      category,
      description: description || '',
      available: available !== undefined ? available : true,
      createdAt: new Date()
    };

    const result = await menuCollection.insertOne(newItem);
    const insertedItem = await menuCollection.findOne({ _id: result.insertedId });
    
    // Update metadata
    await updateMetadata();
    
    res.status(201).json({
      ...insertedItem,
      id: insertedItem._id.toString(),
      _id: undefined
    });
  } catch (error) {
    console.error('Error adding menu item:', error);
    res.status(500).json({ error: 'Failed to add menu item' });
  }
});

// Update menu item
app.put('/api/menu-items/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, category, description, available } = req.body;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid item ID' });
    }

    const updateData = {
      ...(name && { name }),
      ...(price !== undefined && { price: parseFloat(price) }),
      ...(category && { category }),
      ...(description !== undefined && { description }),
      ...(available !== undefined && { available }),
      updatedAt: new Date()
    };

    const result = await menuCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: 'Menu item not found' });
    }

    // Update metadata
    await updateMetadata();

    res.json({ message: 'Menu item updated successfully' });
  } catch (error) {
    console.error('Error updating menu item:', error);
    res.status(500).json({ error: 'Failed to update menu item' });
  }
});

// Bulk update menu items
app.put('/api/menu-items', async (req, res) => {
  try {
    const { items } = req.body;
    
    if (!Array.isArray(items)) {
      return res.status(400).json({ error: 'Items must be an array' });
    }

    // Update each item
    for (const item of items) {
      if (item.id && ObjectId.isValid(item.id)) {
        const { id, ...updateData } = item;
        await menuCollection.updateOne(
          { _id: new ObjectId(id) },
          { $set: { ...updateData, updatedAt: new Date() } }
        );
      }
    }

    // Update metadata
    await updateMetadata();

    res.json({ message: 'Menu updated successfully' });
  } catch (error) {
    console.error('Error bulk updating menu:', error);
    res.status(500).json({ error: 'Failed to update menu' });
  }
});

// Delete menu item
app.delete('/api/menu-items/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid item ID' });
    }

    const result = await menuCollection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Menu item not found' });
    }

    // Update metadata
    await updateMetadata();

    res.json({ message: 'Menu item deleted successfully' });
  } catch (error) {
    console.error('Error deleting menu item:', error);
    res.status(500).json({ error: 'Failed to delete menu item' });
  }
});

// Update metadata helper function
async function updateMetadata() {
  try {
    await metadataCollection.updateOne(
      { _id: 'last_updated' },
      { 
        $set: { 
          timestamp: new Date(),
          updatedBy: 'Admin'
        }
      },
      { upsert: true }
    );
  } catch (error) {
    console.error('Error updating metadata:', error);
  }
}

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    database: db ? 'Connected' : 'Disconnected'
  });
});

// Serve React app for all non-API routes in production
if (process.env.NODE_ENV === 'production') {
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
  });
}

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 API endpoints available at http://localhost:${PORT}/api`);
  if (process.env.NODE_ENV === 'production') {
    console.log(`🌐 Frontend served at http://localhost:${PORT}`);
  }
  connectToMongoDB();
});