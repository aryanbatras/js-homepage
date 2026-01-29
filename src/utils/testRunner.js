export class TestRunner {
  constructor() {
    this.logs = [];
    this.originalConsole = { ...console };
  }

  captureConsole() {
    this.logs = [];
    
    console.log = (...args) => {
      this.logs.push({
        type: 'log',
        message: args.map(arg => 
          typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
        ).join(' '),
        timestamp: new Date().toLocaleTimeString()
      });
    };

    console.error = (...args) => {
      this.logs.push({
        type: 'error',
        message: args.map(arg => 
          typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
        ).join(' '),
        timestamp: new Date().toLocaleTimeString()
      });
    };

    console.warn = (...args) => {
      this.logs.push({
        type: 'warn',
        message: args.map(arg => 
          typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
        ).join(' '),
        timestamp: new Date().toLocaleTimeString()
      });
    };

    console.async = (...args) => {
      this.logs.push({
        type: 'async',
        message: args.map(arg => 
          typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
        ).join(' '),
        timestamp: new Date().toLocaleTimeString()
      });
    };
  }

  restoreConsole() {
    Object.assign(console, this.originalConsole);
  }

  async runTests(userCode, tests) {
    this.captureConsole();
    
    try {
      const combinedCode = `${userCode}\n\n// Tests\n${tests[0].code}`;
      
      const AsyncFunction = Object.getPrototypeOf(async function(){}).constructor;
      const testFunction = new AsyncFunction(combinedCode);
      
      await testFunction();
      
    } catch (error) {
      this.logs.push({
        type: 'error',
        message: error.message,
        timestamp: new Date().toLocaleTimeString()
      });
    }
    
    this.restoreConsole();
    
    return this.logs;
  }
}
