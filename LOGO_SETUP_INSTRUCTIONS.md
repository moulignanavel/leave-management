# MS IT Solutions Logo Setup Instructions

## Quick Setup

To use the MS IT Solutions logo in your Leave Management System, follow these steps:

### Step 1: Save the Logo Image

1. Save your MS IT Solutions logo image as `ms-logo.png`
2. Place it in the following location:
   ```
   frontend/public/assets/ms-logo.png
   ```

### Step 2: Verify the Path

The folder structure should look like this:
```
LMS/
├── frontend/
│   ├── public/
│   │   ├── assets/
│   │   │   └── ms-logo.png  ← Your logo here
│   │   ├── index.html
│   │   └── ...
│   └── src/
│       └── ...
└── backend/
    └── ...
```

### Step 3: Restart the Application

If the application is already running:
1. Stop the frontend server (Ctrl+C)
2. Restart it with `npm start` or `npm run client`

The logo will now appear on:
- Landing page (header and footer)
- Login page
- All dashboards (Employee, Manager, Admin)
- All pages with Header/Footer components

## Logo Specifications

### Recommended Image Specs:
- **Format**: PNG (with transparent background preferred)
- **Dimensions**: 200px - 400px width (height will auto-scale)
- **File Size**: Under 100KB for fast loading
- **Background**: Transparent or white
- **Colors**: Navy blue (#1a1f4d) and gray (#808080) as shown in your logo

### Current Logo Design:
- "MS" letters in navy blue
- Swoosh/orbital design in navy and gray
- Professional, modern look
- Works on both light and dark backgrounds

## Fallback Behavior

If the logo image is not found, the component will automatically fall back to a text-based logo:
- Shows "MS" in a colored box
- Displays "MS IT Solutions" text
- Maintains the same layout and spacing

## Component Usage

The CompanyLogo component is already integrated in:

1. **Landing Page** (`frontend/src/pages/LandingPage.js`)
   - Header: Large size
   - Footer: Medium size

2. **Login Page** (`frontend/src/pages/Login.js`)
   - Card header: Large size, white variant

3. **Header Component** (`frontend/src/components/Header.js`)
   - All dashboards: Medium size
   - Clickable to return to dashboard

4. **Footer Component** (`frontend/src/components/Footer.js`)
   - All pages: Small size
   - Copyright text included

## Customization Options

### Hide Text (Logo Only):
```javascript
<CompanyLogo showText={false} />
```

### Different Sizes:
```javascript
<CompanyLogo size="small" />   // 40px height
<CompanyLogo size="medium" />  // 50px height (default)
<CompanyLogo size="large" />   // 70px height
```

### Different Variants:
```javascript
<CompanyLogo variant="default" />   // White text (for dark backgrounds)
<CompanyLogo variant="white" />     // Dark text (for light backgrounds)
<CompanyLogo variant="gradient" />  // White text (for gradient backgrounds)
```

## Troubleshooting

### Logo Not Showing?

1. **Check File Path**
   - Verify the file is at `frontend/public/assets/ms-logo.png`
   - File name must be exactly `ms-logo.png` (lowercase)

2. **Check File Format**
   - Must be PNG format
   - Try converting to PNG if using another format

3. **Clear Browser Cache**
   - Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
   - Or clear browser cache completely

4. **Check Console for Errors**
   - Open browser DevTools (F12)
   - Look for 404 errors or image loading issues

5. **Restart Development Server**
   - Stop the server (Ctrl+C)
   - Start again: `npm start` or `npm run client`

### Logo Too Large/Small?

Adjust the size prop:
```javascript
// Make it bigger
<CompanyLogo size="large" />

// Make it smaller
<CompanyLogo size="small" />
```

### Logo Quality Issues?

Use a higher resolution image:
- Minimum: 200px width
- Recommended: 400px width
- Maximum: 800px width (for retina displays)

## Alternative: Using a Different Image Name

If you want to use a different filename, update the CompanyLogo component:

1. Open `frontend/src/components/CompanyLogo.js`
2. Find this line:
   ```javascript
   src="/assets/ms-logo.png"
   ```
3. Change to your filename:
   ```javascript
   src="/assets/your-logo-name.png"
   ```

## Production Deployment

When deploying to production:
1. Ensure the logo file is included in your build
2. The `public` folder contents are automatically copied to the build
3. No additional configuration needed
4. Logo will be available at `https://yourdomain.com/assets/ms-logo.png`

## Status

✅ CompanyLogo component created and integrated
✅ Fallback text logo implemented
✅ All pages updated to use the logo
⏳ Waiting for logo image file to be placed in `frontend/public/assets/`

Once you place the `ms-logo.png` file in the correct location, the logo will automatically appear throughout the application!
