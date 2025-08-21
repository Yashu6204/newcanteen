const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

export interface MenuItem {
  id: string;
  name: string;
  price: number;
  category: string;
  description?: string;
  available: boolean;
}

export interface ApiResponse<T> {
  data?: T;
  error?: string;
}

class ApiService {
  private async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    try {
      // Add timeout to prevent hanging requests
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
      
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
        signal: controller.signal,
        ...options,
      });
      
      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`Server error: ${response.status} - ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          throw new Error('Request timeout - server may be down');
        }
        if (error.message.includes('fetch')) {
          throw new Error('Cannot connect to server - make sure backend is running on port 3001');
        }
      }
      console.error(`API request failed for ${endpoint}:`, error);
      throw error;
    }
  }

  async getMenuItems(): Promise<MenuItem[]> {
    return this.request<MenuItem[]>('/menu-items');
  }

  async getMetadata(): Promise<{ timestamp: string; updatedBy: string }> {
    return this.request<{ timestamp: string; updatedBy: string }>('/metadata');
  }

  async addMenuItem(item: Omit<MenuItem, 'id'>): Promise<MenuItem> {
    return this.request<MenuItem>('/menu-items', {
      method: 'POST',
      body: JSON.stringify(item),
    });
  }

  async updateMenuItem(id: string, updates: Partial<MenuItem>): Promise<void> {
    await this.request(`/menu-items/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  }

  async deleteMenuItem(id: string): Promise<void> {
    await this.request(`/menu-items/${id}`, {
      method: 'DELETE',
    });
  }

  async bulkUpdateMenuItems(items: MenuItem[]): Promise<void> {
    await this.request('/menu-items', {
      method: 'PUT',
      body: JSON.stringify({ items }),
    });
  }
}

export const apiService = new ApiService();