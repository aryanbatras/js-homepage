class AIService {
  constructor() {
    this.accountId = import.meta.env.VITE_CLOUDFLARE_ACCOUNT_ID;
    this.apiKey = import.meta.env.VITE_CLOUDFLARE_API_KEY;
    this.model = import.meta.env.VITE_CLOUDFLARE_MODEL;
    this.workerUrl = `https://api.cloudflare.com/client/v4/accounts/${this.accountId}/ai/run/${this.model}`;
  }

  async sendMessage(message, codeContext = '') {
    const startTime = Date.now();
    
    try {
      const response = await fetch(this.workerUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({
          message,
          codeContext
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }
      
      const endTime = Date.now();
      const responseTime = endTime - startTime;
      
      return {
        response: data.response,
        responseTime: responseTime
      };
    } catch (error) {
      console.error('AI Service Error:', error);
      return {
        error: `Error: ${error.message}`,
        responseTime: Date.now() - startTime
      };
    }
  }
}

export default new AIService();
