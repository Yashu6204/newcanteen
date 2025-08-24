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
    db = client.db();
    menuCollection = db.collection('menu');
    metadataCollection = db.collection('metadata');
    console.log('✅ Connected to MongoDB');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }
}

// API Routes

// Get all menu items
app.get('/api/menu', async (req, res) => {
  try {
    const menuItems = await menuCollection.find({}).toArray();
    res.json(menuItems);
  } catch (error) {
    console.error('Error fetching menu:', error);
    res.status(500).json({ error: 'Failed to fetch menu items' });
  }
});

// Add new menu item
app.post('/api/menu', async (req, res) => {
  try {
    const { name, price, category, description, image, available } = req.body;
    
    if (!name || !price || !category) {
      return res.status(400).json({ error: 'Name, price, and category are required' });
    }

    const newItem = {
      name,
      price: parseFloat(price),
      category,
      description: description || '',
      image: image || '',
      available: available !== undefined ? available : true,
      createdAt: new Date()
    };

    const result = await menuCollection.insertOne(newItem);
    const insertedItem = await menuCollection.findOne({ _id: result.insertedId });
    
    res.status(201).json(insertedItem);
  } catch (error) {
    console.error('Error adding menu item:', error);
    res.status(500).json({ error: 'Failed to add menu item' });
  }
});

// Update menu item
app.put('/api/menu/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, category, description, image, available } = req.body;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid item ID' });
    }

    const updateData = {
      ...(name && { name }),
      ...(price !== undefined && { price: parseFloat(price) }),
      ...(category && { category }),
      ...(description !== undefined && { description }),
      ...(image !== undefined && { image }),
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

    const updatedItem = await menuCollection.findOne({ _id: new ObjectId(id) });
    res.json(updatedItem);
  } catch (error) {
    console.error('Error updating menu item:', error);
    res.status(500).json({ error: 'Failed to update menu item' });
  }
});

// Delete menu item
app.delete('/api/menu/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid item ID' });
    }

    const result = await menuCollection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Menu item not found' });
    }

    res.json({ message: 'Menu item deleted successfully' });
  } catch (error) {
    console.error('Error deleting menu item:', error);
    res.status(500).json({ error: 'Failed to delete menu item' });
  }
});

// Get categories
app.get('/api/categories', async (req, res) => {
  try {
    const categories = await menuCollection.distinct('category');
    res.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
});

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