#!/bin/bash

# Start backend server in background
cd backend && node server.js &
BACKEND_PID=$!

echo "Backend started with PID: $BACKEND_PID"

# Wait a moment for backend to start
sleep 3

# Start frontend server
cd ../client && npm start

# Kill backend when frontend stops
kill $BACKEND_PID 2>/dev/null
