import type { Contact, ContactInput } from '../types/contact';

// Use relative URL to leverage Vite proxy in development
const API_BASE_URL = '/api';

export class ApiError extends Error {
  statusCode?: number;
  isNetworkError: boolean;
  
  constructor(
    message: string,
    statusCode?: number,
    isNetworkError: boolean = false
  ) {
    super(message);
    this.name = 'ApiError';
    this.statusCode = statusCode;
    this.isNetworkError = isNetworkError;
  }
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    let errorMessage = `HTTP error! status: ${response.status}`;
    
    try {
      const errorData = await response.json();
      if (errorData.error) {
        errorMessage = errorData.error;
      }
    } catch {
      // If parsing fails, use the default error message
    }
    
    throw new ApiError(errorMessage, response.status);
  }
  
  // Handle 204 No Content or empty responses
  if (response.status === 204 || response.status === 200) {
    // Check if there's actually content to parse
    const contentType = response.headers.get('content-type');
    const contentLength = response.headers.get('content-length');
    
    // If no content-type or content-length is 0, return undefined
    if (!contentType || !contentType.includes('application/json') || contentLength === '0') {
      return undefined as T;
    }
    
    // If there's content, try to parse it
    const text = await response.text();
    if (!text || text.trim() === '') {
      return undefined as T;
    }
    
    return JSON.parse(text);
  }
  
  return response.json();
}

export async function getAllContacts(): Promise<Contact[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/contacts`);
    return handleResponse<Contact[]>(response);
  } catch (error) {
    if (error instanceof TypeError) {
      throw new ApiError('Network error: Unable to connect to server', undefined, true);
    }
    throw error;
  }
}

export async function searchContacts(query: string): Promise<Contact[]> {
  try {
    const params = new URLSearchParams({ q: query });
    const response = await fetch(`${API_BASE_URL}/contacts?${params}`);
    return handleResponse<Contact[]>(response);
  } catch (error) {
    if (error instanceof TypeError) {
      throw new ApiError('Network error: Unable to connect to server', undefined, true);
    }
    throw error;
  }
}

export async function createContact(contact: ContactInput): Promise<Contact> {
  try {
    const url = `${API_BASE_URL}/contacts`;
    console.log('🔵 [API] Creating contact:', contact);
    console.log('🔵 [API] URL:', url);
    console.log('🔵 [API] Full URL would be:', window.location.origin + url);
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(contact),
    });
    console.log('Response status:', response.status, response.statusText);
    return handleResponse<Contact>(response);
  } catch (error) {
    console.error('createContact error:', error);
    if (error instanceof TypeError) {
      throw new ApiError('Network error: Unable to connect to server. Please ensure the API server is running on http://localhost:3000', undefined, true);
    }
    throw error;
  }
}

export async function updateContact(
  id: string,
  contact: ContactInput
): Promise<Contact> {
  try {
    const response = await fetch(`${API_BASE_URL}/contacts/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(contact),
    });
    return handleResponse<Contact>(response);
  } catch (error) {
    if (error instanceof TypeError) {
      throw new ApiError('Network error: Unable to connect to server', undefined, true);
    }
    throw error;
  }
}

export async function deleteContact(id: string): Promise<void> {
  try {
    const url = `${API_BASE_URL}/contacts/${id}`;
    console.log('🔴 [API] Deleting contact:', id, 'URL:', url);
    const response = await fetch(url, {
      method: 'DELETE',
    });
    console.log('🔴 [API] Delete response status:', response.status, response.statusText);
    return handleResponse<void>(response);
  } catch (error) {
    console.error('🔴 [API] Delete error:', error);
    if (error instanceof TypeError) {
      throw new ApiError('Network error: Unable to connect to server', undefined, true);
    }
    throw error;
  }
}

