@echo off
echo ========================================
echo Vercel CLI Deployment for Frontend
echo ========================================
echo.

echo Step 1: Installing Vercel CLI globally...
call npm install -g vercel
echo.

echo Step 2: Navigating to frontend directory...
cd frontend
echo.

echo Step 3: Installing dependencies...
call npm install
echo.

echo Step 4: Building the project...
call npm run build
echo.

echo Step 5: Starting Vercel deployment...
echo.
echo IMPORTANT: When prompted, answer:
echo - Set up and deploy? Y
echo - Link to existing project? N
echo - Project name? leave-management-frontend
echo - In which directory? ./ (just press Enter)
echo - Override settings? N
echo.
pause
call vercel
echo.

echo ========================================
echo Deployment complete!
echo ========================================
echo.
echo Next steps:
echo 1. Copy the deployment URL shown above
echo 2. Run: deploy-vercel-env.bat
echo 3. Follow the prompts to add environment variables
echo.
pause
