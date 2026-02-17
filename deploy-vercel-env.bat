@echo off
echo ========================================
echo Adding Environment Variables to Vercel
echo ========================================
echo.

cd frontend

echo Adding REACT_APP_API_URL...
echo When prompted, enter: https://leave-management-he2w.onrender.com
echo.
call vercel env add REACT_APP_API_URL production
echo.

echo Adding REACT_APP_GOOGLE_CLIENT_ID...
echo When prompted, enter: 473868904819-ni5pnun4q5aqjathge9ddk8ei5fqanu9.apps.googleusercontent.com
echo.
call vercel env add REACT_APP_GOOGLE_CLIENT_ID production
echo.

echo ========================================
echo Environment variables added!
echo ========================================
echo.
echo Now deploying to production with environment variables...
echo.
call vercel --prod
echo.

echo ========================================
echo DEPLOYMENT COMPLETE!
echo ========================================
echo.
echo Your frontend is now live!
echo Copy the production URL shown above.
echo.
echo Next steps:
echo 1. Update your Render backend FRONTEND_URL with this URL
echo 2. Add this URL to Google OAuth console
echo 3. Test your application!
echo.
pause
