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
        timestamp: new Date().toISOString()
      });
    };

    console.error = (...args) => {
      this.logs.push({
        type: 'error',
        message: args.map(arg => 
          typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
        ).join(' '),
        timestamp: new Date().toISOString()
      });
    };

    console.warn = (...args) => {
      this.logs.push({
        type: 'warn',
        message: args.map(arg => 
          typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
        ).join(' '),
        timestamp: new Date().toISOString()
      });
    };
  }

  restoreConsole() {
    Object.assign(console, this.originalConsole);
  }

  async runTests(userCode, tests) {
    this.captureConsole();
    
    const results = [];
    
    try {
      for (let i = 0; i < tests.length; i++) {
        const test = tests[i];
        this.logs = [];
        
        try {
          const combinedCode = `${userCode}\n\n// Test ${i + 1}: ${test.test}\n${test.code}`;
          
          const AsyncFunction = Object.getPrototypeOf(async function(){}).constructor;
          const testFunction = new AsyncFunction(combinedCode);
          
          await testFunction();
          
          results.push({
            testName: test.test,
            status: 'passed',
            output: this.logs,
            error: null
          });
          
        } catch (error) {
          results.push({
            testName: test.test,
            status: 'failed',
            output: this.logs,
            error: error.message
          });
        }
      }
    } catch (error) {
      results.push({
        testName: 'Global Error',
        status: 'error',
        output: this.logs,
        error: error.message
      });
    }
    
    this.restoreConsole();
    
    return {
      results,
      summary: {
        total: tests.length,
        passed: results.filter(r => r.status === 'passed').length,
        failed: results.filter(r => r.status === 'failed').length,
        errors: results.filter(r => r.status === 'error').length
      }
    };
  }

  formatTestResults(testResults) {
    let formatted = '';
    
    testResults.results.forEach((result, index) => {
      formatted += `\n=== ${result.testName} ===\n`;
      formatted += `Status: ${result.status.toUpperCase()}\n`;
      
      if (result.output.length > 0) {
        formatted += '\nConsole Output:\n';
        result.output.forEach(log => {
          formatted += `[${log.type.toUpperCase()}] ${log.message}\n`;
        });
      }
      
      if (result.error) {
        formatted += `\nError: ${result.error}\n`;
      }
      
      formatted += '\n' + '='.repeat(50) + '\n';
    });
    
    formatted += `\n=== SUMMARY ===\n`;
    formatted += `Total Tests: ${testResults.summary.total}\n`;
    formatted += `Passed: ${testResults.summary.passed}\n`;
    formatted += `Failed: ${testResults.summary.failed}\n`;
    formatted += `Errors: ${testResults.summary.errors}\n`;
    
    return formatted;
  }
}
