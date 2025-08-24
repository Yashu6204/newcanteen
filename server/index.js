@@ .. @@
 const express = require('express');
 const cors = require('cors');
 const { MongoClient, ObjectId } = require('mongodb');
+const path = require('path');
 require('dotenv').config();
 
 const app = express();
-const PORT = process.env.PORT || 3001;
+const PORT = process.env.PORT || 3001;
+const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/canteen';
 
 // Middleware
 app.use(cors());
 app.use(express.json());
 
+// Serve static files in production
+if (process.env.NODE_ENV === 'production') {
+  app.use(express.static(path.join(__dirname, '../dist')));
+}
+
 // MongoDB connection
-const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/canteen';
 let db;
 let menuCollection;
 let metadataCollection;