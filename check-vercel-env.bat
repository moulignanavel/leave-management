@echo off
echo Checking Vercel Environment Variables...
echo.
cd frontend
vercel env ls
echo.
echo If REACT_APP_API_URL and REACT_APP_GOOGLE_CLIENT_ID are not listed above,
echo you need to add them!
echo.
pause
