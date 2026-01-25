# GitHub Secrets Setup for AI Chatbot

## 🚀 Required GitHub Secrets

You need to add these secrets to your GitHub repository for the AI chatbot to work in production:

### Step 1: Go to GitHub Repository Secrets
1. Go to your GitHub repository
2. Click **Settings** tab
3. Click **Secrets and variables** in the left sidebar
4. Click **Actions**
5. Click **New repository secret**

### Step 2: Add the Following Secrets

#### 1. CLOUDFLARE_ACCOUNT_ID
- **Name**: `CLOUDFLARE_ACCOUNT_ID`
- **Value**: `7dad86f8a0527be2fbe5c947d3d33550`

#### 2. CLOUDFLARE_API_KEY
- **Name**: `CLOUDFLARE_API_KEY`
- **Value**: `f0eb2Zk3fpdeFhEQesTeH-xR4soOWrKhoye57AT9`

#### 3. CLOUDFLARE_MODEL
- **Name**: `CLOUDFLARE_MODEL`
- **Value**: `@cf/meta/llama-3.1-8b-instruct`

### Step 3: Verify Setup

After adding all secrets, your Actions secrets page should show:
- ✅ CLOUDFLARE_ACCOUNT_ID
- ✅ CLOUDFLARE_API_KEY
- ✅ CLOUDFLARE_MODEL

### Step 4: Deploy

Push your changes to the main branch. The GitHub Actions workflow will:
1. Create a .env file with your secrets
2. Build the application with environment variables
3. Deploy to GitHub Pages
4. AI chatbot will work with real Cloudflare API!

## 🔒 Security Notes

- ✅ Secrets are encrypted and stored securely by GitHub
- ✅ Secrets are not visible in build logs
- ✅ Secrets are only available during build time
- ✅ API keys are embedded in the built JavaScript (this is normal for static sites)

## 🧪 Testing

After deployment, test the AI chatbot:
1. Go to your GitHub Pages URL
2. Click the robot icon in the navbar
3. Ask a question like "Hello, what can you do?"
4. Should get a real AI response!

## 🚨 Important

- Never commit your .env file to git
- Always use GitHub Secrets for production
- The workflow automatically creates .env during build
- Your local .env file is only for development
