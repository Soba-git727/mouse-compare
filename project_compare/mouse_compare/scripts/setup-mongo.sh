#!/usr/bin/env bash

set -e

echo "🔍 Setting up MongoDB with Docker..."

if ! docker ps | grep -q "mongodb"; then
  echo "🐳 Starting MongoDB container..."
  docker run -d \
    --name mongodb \
    -p 27017:27017 \
    -e MONGO_INITDB_ROOT_USERNAME=admin \
    -e MONGO_INITDB_ROOT_PASSWORD=admin123 \
    mongo:7.0

  echo "⏳ Waiting for MongoDB to start..."
  sleep 5
else
  echo "✅ MongoDB is already running"
fi

if docker ps | grep -q "mongodb"; then
  echo "✅ MongoDB is running"
else
  echo "❌ Failed to start MongoDB"
  exit 1
fi

if command -v node > /dev/null 2>&1 && [ -f "src/lib/mongodb.ts" ]; then
  echo "⚙️ Updating MongoDB connection to use authentication..."
  
  cat > src/lib/mongodb.ts << 'EOF'
"use server';

import { MongoClient, type Db } from 'mongodb';

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

export async function dbConnect(): Promise<Db> {
  if (cachedDb) {
    return cachedDb;
  }

  if (!process.env.MONGODB_URI) {
    console.log('⚠️ Using demo mode - no MongoDB connection');
    throw new Error('MongoDB URI not configured');
  }

  const client = new MongoClient(process.env.MONGODB_URI);
  cachedClient = client;

  await client.connect();
  cachedDb = client.db('mouse_compare');

  return cachedDb;
}

export async function closeConnection() {
  if (cachedClient) {
    await cachedClient.close();
    cachedClient = null;
    cachedDb = null;
  }
}
EOF
  
  echo "📝 MongoDB config updated"
fi

echo "";
echo "🎉 MongoDB setup complete!";
echo "";
echo "📊 Connection details:";
echo "   Host: localhost:27017";
echo "   Database: mouse_compare";
echo "";
echo "🔐 Admin credentials for testing:";
echo "   Email: admin@example.com";
echo "   Password: Admin@123456";
echo "";
echo "🚀 You can now run: npm run dev";
echo "";
echo "⚠️  To change MongoDB password, update the .env file";
echo "   Or stop and restart the container with different environment variables";
EOF