@echo off
echo.
echo  [32m [1mBRAINLINK PLATFORM STARTUP [0m
echo  [90m============================== [0m
echo.

:: Start Socket Server in a new window
echo  [36m[STEP 1/2] [0m Starting Real-time Socket Server (Port 3001)...
start "BrainLink Socket Server" cmd /k "node server.js"

:: Start Next.js Dev Server in the current window
echo  [36m[STEP 2/2] [0m Starting Frontend Development Server (Port 3000)...
echo.
echo  [93mApp will be live at: [0m http://localhost:3000
echo.
npm run dev
