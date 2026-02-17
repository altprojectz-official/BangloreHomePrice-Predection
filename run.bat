@echo off
echo Starting Bangalore Home Prices Server...
start "BHP Backend" cmd /k "cd server & python server.py"
echo Server started in a new window.
echo Opening Frontend...
start "" "client\app.html"
pause
