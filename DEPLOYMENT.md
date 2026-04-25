# Netlify Deployment Guide

## Prerequisites
- Netlify account (free tier works)
- Firebase project with Firestore enabled
- Git repository (GitHub, GitLab, or Bitbucket)

## Step 1: Set Environment Variables in Netlify

1. Go to Firebase Console → Project Settings → General → Your Apps
2. Copy your Firebase configuration values
3. In Netlify Dashboard:
   - Go to Site Settings → Environment Variables
   - Add the following variables:

```
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

## Step 2: Deploy via Git (Recommended)

### Option A: GitHub Integration
1. Push your code to GitHub
2. In Netlify Dashboard → "Add new site" → "Import an existing project"
3. Select your GitHub repository
4. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`
5. Click "Deploy site"

### Option B: Netlify CLI
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Initialize
netlify init

# Deploy
netlify deploy --prod
```

## Step 3: Firebase Security Rules

Update your Firestore security rules in Firebase Console:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

**Note:** For production, tighten these rules to only allow admin users to write.

## Step 4: Verify Deployment

1. Check Netlify deploy logs for any errors
2. Visit your deployed site URL
3. Test all features:
   - Homepage loads
   - Services section displays data
   - Admin login works
   - CRUD operations function

## Troubleshooting

### Build Fails
- Check Netlify build logs
- Ensure all dependencies are in package.json
- Verify Node.js version (use 18 or higher)

### Environment Variables Not Working
- Ensure variables start with `NEXT_PUBLIC_`
- Variables must be set in Netlify dashboard before deployment
- Redeploy after adding variables

### Firebase Connection Issues
- Verify Firebase project is in production mode
- Check Firestore is enabled
- Ensure API keys are correct

### Admin Panel Not Loading
- Check Firebase Auth configuration
- Verify admin user exists in Firebase Auth
- Check browser console for errors

## Performance Optimization

The app is already optimized with:
- SWR caching for API calls
- Image optimization via Next.js
- CSS optimization
- Gzip compression (automatic on Netlify)

## Custom Domain (Optional)

1. In Netlify → Domain Settings
2. Add custom domain
3. Update DNS records as instructed
4. Enable HTTPS (automatic on Netlify)

## Continuous Deployment

With Git integration, Netlify will automatically:
- Deploy on every push to main branch
- Run build and tests
- Update the live site on successful builds
