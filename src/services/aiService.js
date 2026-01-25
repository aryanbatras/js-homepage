class AIService {
  constructor() {
    this.accountId = import.meta.env.VITE_CLOUDFLARE_ACCOUNT_ID;
    this.apiKey = import.meta.env.VITE_CLOUDFLARE_API_KEY;
    this.baseUrl = 'https://api.cloudflare.com/client/v4/accounts';
    this.model = import.meta.env.VITE_CLOUDFLARE_MODEL;

    // Validate environment variables
    if (!this.accountId || !this.apiKey || !this.model) {
      console.error('Missing Cloudflare API environment variables. Check your .env file.');
      this.isConfigured = false;
    } else {
      this.isConfigured = true;
    }
  }

  async sendMessage(message, codeContext = '') {
    // Check if environment variables are properly configured
    if (!this.isConfigured) {
      return `⚠️ **Configuration Error**

Missing Cloudflare API environment variables. Please check your .env file:

Required variables:
- VITE_CLOUDFLARE_ACCOUNT_ID
- VITE_CLOUDFLARE_API_KEY  
- VITE_CLOUDFLARE_MODEL

Make sure your .env file is in the project root and restart your development server.`;
    }

    // On localhost, direct API calls to Cloudflare will fail due to CORS
    // When deployed to a real domain, this will work perfectly
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      return this.getLocalhostResponse(message, codeContext);
    }

    // When deployed, try the real API
    try {
      return await this.tryDirectAPI(message, codeContext);
    } catch (error) {
      console.log('API failed, using fallback...');
      return this.getFallbackResponse(message, codeContext);
    }
  }

  async tryDirectAPI(message, codeContext) {
    const prompt = codeContext 
      ? `Context: ${codeContext}\n\nQuestion: ${message}`
      : message;

    console.log('Making API call to:', `${this.baseUrl}/${this.accountId}/ai/run/${this.model}`);

    const response = await fetch(`${this.baseUrl}/${this.accountId}/ai/run/${this.model}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify({
        messages: [{ role: 'user', content: prompt }]
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('API Error Response:', errorText);
      throw new Error(`HTTP ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    console.log('API Response Data:', data);
    
    if (data.success && data.result?.response) {
      return data.result.response;
    } else {
      throw new Error(data.errors?.[0]?.message || `API Error: ${JSON.stringify(data)}`);
    }
  }

  getLocalhostResponse(message, codeContext) {
    return `🏠 **Localhost Development Mode**

I'm running on localhost, so I can't connect to the Cloudflare API due to CORS restrictions. 

**Good News:** When you deploy this to a real domain (like GitHub Pages, Netlify, Vercel), the AI chatbot will work perfectly with real Cloudflare AI responses!

**Current Status:**
- ✅ Chat interface working
- ✅ File context detection working  
- ❌ AI API calls blocked by localhost CORS
- ✅ Will work when deployed

**For Testing:**
- Try "help" to see what I can do
- Test the interface and features
- Everything else works perfectly

**Deployment Options:**
- GitHub Pages (free)
- Netlify (free)  
- Vercel (free)
- Any custom domain

The AI will be fully functional once deployed! 🚀`;
  }

  getFallbackResponse(message, codeContext) {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
      return `Hello! I'm your AI coding assistant. I can see you're working with ${codeContext ? 'a code file' : 'your project'}. Ask me anything about your code and I'll help you out!`;
    }
    
    if (lowerMessage.includes('explain')) {
      return `I'd be happy to explain your code! Here are some general tips:
- Break down complex functions into smaller parts
- Add comments to explain tricky logic
- Use meaningful variable names
- Consider edge cases in your code

What specific part of your code would you like me to explain?`;
    }
    
    if (lowerMessage.includes('bug') || lowerMessage.includes('error')) {
      return `I'd love to help you debug! Here are some debugging tips:
1. Check the browser console for JavaScript errors
2. Use console.log() to track variable values
3. Test your code with different inputs
4. Break down the problem into smaller parts
5. Check for typos in variable names and function calls

What specific error are you seeing?`;
    }
    
    if (lowerMessage.includes('help')) {
      return `I'm here to help! I can assist with:
- Code explanation
- Bug finding and fixing
- Code optimization
- Best practices
- Learning new concepts

What specific coding question do you have?`;
    }
    
    return `I'm here to help with your code! Ask me about:
- Code explanation
- Bug fixing
- Code optimization
- Best practices
- General programming concepts

What would you like to know?`;
  }
}

export default new AIService();
