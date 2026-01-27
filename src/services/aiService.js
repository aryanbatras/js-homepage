class AIService {
  constructor() {
    this.workerUrl = 'https://round-union-4fa3.batraaryan03.workers.dev';
  }

  async sendMessage(message, codeContext = '') {
    const startTime = Date.now();
    
    try {
      const response = await fetch(this.workerUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
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
      return {
        error: `Error: ${error.message}`,
        responseTime: Date.now() - startTime
      };
    }
  }
}

export default new AIService();
