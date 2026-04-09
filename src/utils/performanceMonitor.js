/**
 * Frontend Performance Monitoring Utility
 * Logs API request times to identify bottlenecks
 */

class PerformanceMonitor {
  constructor() {
    this.requests = [];
  }

  // Wrap fetch to monitor requests
  async monitoredFetch(url, options = {}) {
    const startTime = performance.now();
    
    try {
      const response = await fetch(url, options);
      const endTime = performance.now();
      const duration = endTime - startTime;

      // Log slow requests (> 1000ms)
      if (duration > 1000) {
        console.warn(
          `⚠️ SLOW API REQUEST: ${options.method || 'GET'} ${url} took ${duration.toFixed(2)}ms`
        );
      } else {
        console.log(
          `✅ API: ${options.method || 'GET'} ${url} - ${duration.toFixed(2)}ms`
        );
      }

      this.requests.push({
        url,
        method: options.method || 'GET',
        duration,
        status: response.status,
        timestamp: new Date().toISOString()
      });

      return response;
    } catch (error) {
      const endTime = performance.now();
      const duration = endTime - startTime;
      
      console.error(
        `❌ FAILED API: ${options.method || 'GET'} ${url} - ${duration.toFixed(2)}ms`
      );
      
      this.requests.push({
        url,
        method: options.method || 'GET',
        duration,
        status: 'ERROR',
        error: error.message,
        timestamp: new Date().toISOString()
      });

      throw error;
    }
  }

  // Get performance report
  getReport() {
    const avgTime = this.requests.length
      ? (this.requests.reduce((sum, r) => sum + r.duration, 0) / this.requests.length).toFixed(2)
      : 0;

    const slowRequests = this.requests.filter(r => r.duration > 1000);

    console.table(this.requests);
    
    console.log(`
    📊 PERFORMANCE REPORT:
    - Total Requests: ${this.requests.length}
    - Average Response Time: ${avgTime}ms
    - Slow Requests (>1000ms): ${slowRequests.length}
    - Slowest Request: ${Math.max(...this.requests.map(r => r.duration)).toFixed(2)}ms
    `);

    return {
      requests: this.requests,
      averageTime: parseFloat(avgTime),
      slowRequests,
      slowestTime: Math.max(...this.requests.map(r => r.duration))
    };
  }

  // Clear records
  clear() {
    this.requests = [];
  }
}

export const monitor = new PerformanceMonitor();
