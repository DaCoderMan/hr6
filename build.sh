#!/bin/bash

# Build script for Vercel deployment
echo "🚀 Building HR4AL.co for Vercel..."

# Install Python dependencies
pip install -r requirements.txt

# Install Node.js dependencies
npm install

# Create build directory
mkdir -p .vercel/output

# Copy static files
cp *.html .vercel/output/
cp -r public .vercel/output/ 2>/dev/null || true

# Copy Python files
cp *.py .vercel/output/

# Copy configuration files
cp vercel.json .vercel/output/
cp package.json .vercel/output/
cp requirements.txt .vercel/output/

echo "✅ Build completed successfully!"
