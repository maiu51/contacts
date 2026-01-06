import type { Contact, ContactInput } from '../types/contact';

const API_BASE_URL = 'http://localhost:3000/api';

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
  
  // Handle 204 No Content
  if (response.status === 204) {
    return undefined as T;
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
    const response = await fetch(`${API_BASE_URL}/contacts`, {
      method: 'POST',
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
    const response = await fetch(`${API_BASE_URL}/contacts/${id}`, {
      method: 'DELETE',
    });
    return handleResponse<void>(response);
  } catch (error) {
    if (error instanceof TypeError) {
      throw new ApiError('Network error: Unable to connect to server', undefined, true);
    }
    throw error;
  }
}

