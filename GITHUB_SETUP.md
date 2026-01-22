# GitHub Integration Setup Guide

This guide will help you set up GitHub OAuth integration for the JS Learning Platform.

## Overview

The platform uses GitHub for authentication and storage with minimal permissions:
- **Authentication**: Sign in with GitHub OAuth
- **Storage**: Creates a public repository `js-learning-platform-{username}` 
- **Manual Sync**: Users manually push/pull files to/from GitHub
- **No Backend**: Everything runs client-side

## Security Features

✅ **Minimal Permissions Required:**
- `user:email` - Read email address for identification
- `public_repo` - Create public repositories only

❌ **No Access To:**
- Existing repositories (public or private)
- Private repository creation
- User data beyond basic profile

## Setup Steps

### 1. Create GitHub OAuth App

1. Go to [GitHub Settings → Developer settings → OAuth Apps](https://github.com/settings/applications/new)
2. Click **"New OAuth App"**
3. Fill in the details:
   - **Application name**: `JS Learning Platform`
   - **Homepage URL**: `http://localhost:4000`
   - **Authorization callback URL**: `http://localhost:4000/auth/github/callback`
4. Click **"Register application"**
5. Note down the **Client ID** and generate a **Client Secret**

### 2. Configure Environment Variables

1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Fill in your GitHub credentials in `.env.local`:
   ```env
   VITE_GITHUB_CLIENT_ID=your_actual_client_id
   VITE_GITHUB_CLIENT_SECRET=your_actual_client_secret
   VITE_GITHUB_REDIRECT_URI=http://localhost:4000/auth/github/callback
   ```

### 3. Install Dependencies

```bash
npm install
```

The required packages are already included:
- `react-router-dom` - For routing
- `js-cookie` - For session management
- `@octokit/rest` - For GitHub API

### 4. Run the Application

```bash
npm run dev
```

Navigate to `http://localhost:4000` and you'll be redirected to the GitHub login page.

## How It Works

### Authentication Flow
1. User clicks "Sign in with GitHub"
2. Permission dialog shows exactly what's requested
3. User authorizes with minimal scope
4. GitHub redirects back with authorization code
5. Client-side exchanges code for access token
6. Creates personal repository: `js-learning-platform-{username}`

### Repository Structure
```
js-learning-platform-{username}/
├── README.md                 # Repository description
├── settings.json             # Platform settings & preferences
└── code/                     # User's code files
    ├── example.js
    ├── problem1.js
    └── ...
```

### Manual Sync Process
- **Push**: Upload local files to GitHub repository
- **Pull**: Download latest files from GitHub repository
- **Sync Modal**: View repository details and perform operations

## User Experience

### First Time Setup
1. Clear permission dialog showing exactly what's needed
2. Automatic repository creation with README and settings
3. No access to existing repositories

### Daily Usage
1. Code locally in the platform
2. Manually push changes when desired
3. Pull changes from other devices
4. All code stored in personal GitHub repository

## Security Considerations

### What We Store
- Access token (securely in cookies)
- Basic user profile (name, username, email)
- Repository information

### What We Don't Store
- Passwords or sensitive data
- Access to existing repositories
- Private repository access

### Token Management
- Tokens stored in HTTP-only cookies
- 30-day expiration
- Easy logout functionality

## Troubleshooting

### Common Issues

**"GitHub client credentials not configured"**
- Make sure `.env.local` exists with correct values
- Restart the development server after changing environment variables

**"Failed to exchange code for token"**
- Check that redirect URI matches exactly in GitHub OAuth app settings
- Ensure Client Secret is correct

**Repository already exists**
- The platform handles this gracefully
- Will use existing repository instead of creating new one

### Development Tips

1. **Test with different GitHub accounts** to ensure the flow works
2. **Check browser console** for detailed error messages
3. **Verify repository creation** on your GitHub account
4. **Test sync functionality** by pushing/pulling files

## Production Deployment

For production deployment:

1. Update the redirect URI in GitHub OAuth app settings
2. Set environment variables on your hosting platform
3. Ensure HTTPS is enabled (required for OAuth)
4. Update `VITE_GITHUB_REDIRECT_URI` to your production URL

## Support

If you encounter issues:
1. Check the browser console for error messages
2. Verify your GitHub OAuth app configuration
3. Ensure all environment variables are set correctly
4. Check that the redirect URI matches exactly

---

**Note**: This integration is designed with privacy and security as top priorities. Users maintain full control over their code and can revoke access at any time from their GitHub settings.
