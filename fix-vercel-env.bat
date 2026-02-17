@echo off
echo ========================================
echo Fixing Vercel Environment Variables
echo ========================================
echo.
echo Adding environment variables to all environments...
echo.

cd frontend

echo Adding REACT_APP_API_URL to Preview...
echo When prompted, enter: https://leave-management-he2w.onrender.com
vercel env add REACT_APP_API_URL preview
echo.

echo Adding REACT_APP_API_URL to Development...
echo When prompted, enter: https://leave-management-he2w.onrender.com
vercel env add REACT_APP_API_URL development
echo.

echo Adding REACT_APP_GOOGLE_CLIENT_ID to Preview...
echo When prompted, enter: 473868904819-ni5pnun4q5aqjathge9ddk8ei5fqanu9.apps.googleusercontent.com
vercel env add REACT_APP_GOOGLE_CLIENT_ID preview
echo.

echo Adding REACT_APP_GOOGLE_CLIENT_ID to Development...
echo When prompted, enter: 473868904819-ni5pnun4q5aqjathge9ddk8ei5fqanu9.apps.googleusercontent.com
vercel env add REACT_APP_GOOGLE_CLIENT_ID development
echo.

echo ========================================
echo Redeploying to production...
echo ========================================
vercel --prod
echo.

echo Done! Your frontend should now connect to the backend.
pause
