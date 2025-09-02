#!/bin/bash

# My Bike Journey - Setup Script
echo "🚴‍♂️ Setting up My Bike Journey..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ and try again."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version 18+ is required. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js $(node -v) detected"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Check if .env.local exists
if [ ! -f .env.local ]; then
    echo "📝 Creating .env.local from template..."
    cp env.example .env.local
    echo "⚠️  Please update .env.local with your actual values:"
    echo "   - DATABASE_URL: Your PostgreSQL connection string"
    echo "   - NEXT_PUBLIC_SPLINE_SCENE_URL: Your Spline scene URL"
    echo "   - ADMIN_SECRET_KEY: A secure secret key"
    echo ""
    echo "Press Enter when you've updated .env.local..."
    read
fi

# Generate Prisma client
echo "🔧 Generating Prisma client..."
npm run db:generate

# Check if database is accessible
echo "🗄️  Testing database connection..."
if npm run db:push --dry-run &> /dev/null; then
    echo "✅ Database connection successful"

    # Push schema to database
    echo "📊 Pushing database schema..."
    npm run db:push

    # Seed database
    echo "🌱 Seeding database with initial data..."
    npm run db:seed
else
    echo "⚠️  Database connection failed. Please check your DATABASE_URL in .env.local"
    echo "   You can continue with development, but some features may not work."
fi

echo ""
echo "🎉 Setup complete!"
echo ""
echo "Next steps:"
echo "1. Update your Spline scene URL in .env.local"
echo "2. Run 'npm run dev' to start the development server"
echo "3. Visit http://localhost:3000 to see your bike journey"
echo "4. Visit http://localhost:3000/admin to manage landmarks"
echo ""
echo "Happy coding! 🚴‍♂️✨"
