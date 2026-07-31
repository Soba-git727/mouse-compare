#!/usr/bin/env bash

echo "🔍 Setting up admin credentials for testing..."

if [ ! -f ".env" ]; then
  echo "📝 Creating .env file with admin credentials..."
  cat > .env << 'EOF'
MONGODB_URI=mongodb://localhost:27017/mice_compare_temp
ADMIN_PASSWORD=Admin@123456
JWT_SECRET=your_jwt_secret_key_here_for_testing_only
EOF
  echo "✅ .env file created"
else
  echo "✅ .env file already exists"
fi

echo "";

echo "🔍 Checking MongoDB status..."
if docker ps | grep -q "mongodb"; then
  echo "✅ MongoDB container is running"
else
  echo "⚠️ MongoDB container is not running"
  echo "⚠️ You can start it manually with: docker run -d --name mongodb -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=admin -e MONGO_INITDB_ROOT_PASSWORD=admin123 mongo:latest"
fi

echo "";

echo "🎉 Setup complete!"

echo "";

echo "🔐 Admin credentials for testing:";
echo "   Email: admin@example.com";
echo "   Password: Admin@123456";

echo "";

echo "🚀 You can now test the admin functionality";

echo "";

echo "⚠️  Note: If MongoDB is not running, the application will use demo mode without persistence";
EOF