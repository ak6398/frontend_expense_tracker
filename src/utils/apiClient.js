/**
 * Optimized API Client with Caching & Request Deduplication
 */

import { API_BASE_URL } from '../config';
import { monitor } from './performanceMonitor';

class APIClient {
  constructor() {
    this.cache = new Map();
    this.pendingRequests = new Map();
    this.cacheTimeout = 5 * 60 * 1000; // 5 minutes default
  }

  /**
   * Enhanced fetch with caching, deduplication, and monitoring
   */
  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const cacheKey = `${options.method || 'GET'}:${url}`;

    // Return from cache if available and not expired (for GET requests)
    if (options.method !== 'POST' && options.method !== 'PUT' && options.method !== 'DELETE') {
      const cached = this.cache.get(cacheKey);
      if (cached && cached.expiry > Date.now()) {
        console.log(`📦 Using cached response for ${endpoint}`);
        return cached.data;
      }
    }

    // Return pending request if already in flight (Request Deduplication)
    if (this.pendingRequests.has(cacheKey)) {
      console.log(`⏳ Returning pending request for ${endpoint}`);
      return this.pendingRequests.get(cacheKey);
    }

    // Create new request
    const requestPromise = monitor.monitoredFetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP Error: ${response.status}`);
        }
        return response.json();
      })
      .finally(() => {
        this.pendingRequests.delete(cacheKey);
      });

    // Track pending request
    this.pendingRequests.set(cacheKey, requestPromise);

    try {
      const data = await requestPromise;

      // Cache successful GET requests
      if (options.method !== 'POST' && options.method !== 'PUT' && options.method !== 'DELETE') {
        this.cache.set(cacheKey, {
          data,
          expiry: Date.now() + this.cacheTimeout
        });
      }

      return data;
    } catch (error) {
      throw error;
    }
  }

  // GET request
  get(endpoint) {
    return this.request(endpoint);
  }

  // POST request
  post(endpoint, body) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(body)
    });
  }

  // PUT request
  put(endpoint, body) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(body)
    });
  }

  // DELETE request
  delete(endpoint) {
    return this.request(endpoint, {
      method: 'DELETE'
    });
  }

  // Clear cache
  clearCache() {
    this.cache.clear();
    console.log('✨ Cache cleared');
  }

  // Get cache status
  getCacheStatus() {
    return {
      size: this.cache.size,
      items: Array.from(this.cache.keys())
    };
  }
}

export const apiClient = new APIClient();
