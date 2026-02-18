@echo off
echo Starting Todo App...
start "Todo Server" /D "server" cmd /k "npm run dev"
start "Todo Client" /D "client" cmd /k "npm run dev"
echo Servers started in separate windows.
