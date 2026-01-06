#!/bin/bash

# Personal Contacts App - Start Script
# Starts both backend and frontend servers

echo "🚀 Starting Personal Contacts App..."
echo ""

# Check if we're in the project root
if [ ! -d "api" ] || [ ! -d "web" ]; then
    echo "❌ Error: Please run this script from the project root directory"
    exit 1
fi

# Function to cleanup on exit
cleanup() {
    echo ""
    echo "🛑 Stopping servers..."
    kill $API_PID $WEB_PID 2>/dev/null
    exit 0
}

trap cleanup SIGINT SIGTERM

# Start Backend API
echo "📦 Starting Backend API (port 3000)..."
cd api
npm run dev > /tmp/contacts-api.log 2>&1 &
API_PID=$!
cd ..

# Wait a bit for backend to start
sleep 2

# Check if backend started successfully
if ! lsof -i :3000 > /dev/null 2>&1; then
    echo "❌ Backend failed to start. Check logs at /tmp/contacts-api.log"
    kill $API_PID 2>/dev/null
    exit 1
fi

echo "✅ Backend running on http://localhost:3000"
echo ""

# Start Frontend
echo "🎨 Starting Frontend (port 5173)..."
cd web
npm run dev > /tmp/contacts-web.log 2>&1 &
WEB_PID=$!
cd ..

# Wait a bit for frontend to start
sleep 3

# Check if frontend started successfully
if ! lsof -i :5173 > /dev/null 2>&1; then
    echo "❌ Frontend failed to start. Check logs at /tmp/contacts-web.log"
    kill $API_PID $WEB_PID 2>/dev/null
    exit 1
fi

echo "✅ Frontend running on http://localhost:5173"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✨ Personal Contacts App is ready!"
echo ""
echo "   Frontend: http://localhost:5173"
echo "   Backend:  http://localhost:3000/api/contacts"
echo ""
echo "   Press Ctrl+C to stop both servers"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Keep script running
wait

