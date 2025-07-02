// API functions for chatbot communication
import { APIResponse } from './types';

const MODAL_ENDPOINT = process.env.NEXT_PUBLIC_MODAL_ENDPOINT || '';

// Don't throw during build time
if (!MODAL_ENDPOINT && typeof window !== 'undefined') {
  console.warn('NEXT_PUBLIC_MODAL_ENDPOINT is not defined');
}

export async function sendMessage(query: string): Promise<string> {
  try {
    const response = await fetch(MODAL_ENDPOINT as string, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return 'Rate limit exceeded. Please wait a moment and try again.';
      } else if (response.status === 500) {
        return 'Server error. Our engineers have been notified. Please try again later.';
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: APIResponse = await response.json();
    
    if (data.status === 'error') {
      throw new Error(data.error || 'Unknown error occurred');
    }

    return data.response;
  } catch (error) {
    console.error('API Error:', error);
    
    if (error instanceof Error && error.message.includes('fetch')) {
      return 'Connection error. Please check your internet connection and try again.';
    }
    
    return 'An unexpected error occurred. Please try again.';
  }
}