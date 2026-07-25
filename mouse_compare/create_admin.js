#!/usr/bin/env node

import { MongoClient } from 'mongodb';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const MONGODB_DB = process.env.MONGODB_DB || 'mouse_compare';

async function createAdminAccount() {
  try {
    console.log('🔍 Connecting to MongoDB...');
    const client = new MongoClient(MONGODB_URI);
    await client.connect();
    const db = client.db(MONGODB_DB);
    
    console.log('🔍 Checking if admin user exists...');
    const existingAdmin = await db.collection('users').findOne({ email: 'admin@example.com' });
    
    if (existingAdmin) {
      if (existingAdmin.role === 'admin') {
        console.log('✅ Admin user already exists');
        console.log(`📧 Email: admin@example.com`);
        console.log(`🔑 Password: ${process.env.ADMIN_PASSWORD || 'Set ADMIN_PASSWORD env var'}`);
        console.log(`🎭 Role: admin`);
        await client.close();
        return;
      } else {
        console.log('⚠️  User exists but is not admin, promoting...');
      }
    }

    console.log('🔧 Creating admin account...');
    const password = process.env.ADMIN_PASSWORD || 'Admin@123456';
    const hashedPassword = await bcrypt.hash(password, 12);
    
    const adminData = {
      name: 'Admin User',
      email: 'admin@example.com',
      password: hashedPassword,
      role: 'admin',
      avatar: '/api/placeholder/image?seed=admin&color=red',
      ownedMice: [],
      wishlist: [],
      savedComparisons: [],
      createdAt: new Date(),
    };
    
    const result = await db.collection('users').updateOne(
      { email: adminData.email },
      { $set: adminData },
      { upsert: true }
    );
    
    console.log('✅ Admin account created/updated successfully!');
    console.log(`📧 Email: admin@example.com`);
    console.log(`🔑 Password: ${password}`);
    console.log(`🎭 Role: admin`);
    
    await client.close();
    console.log('\n✨ Admin account ready for testing!');
    
  } catch (error) {
    console.error('❌ Error creating admin account:', error);
    process.exit(1);
  }
}

createAdminAccount();