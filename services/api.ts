const API_BASE_URL = 'https://findor.vercel.app';

export interface ApiKeyResponse {
  secret: string;
  status: string;
  created_at: number;
  message: string;
  status_code: number;
}

export interface ApiKeyListItem {
  key: string;
  created_at: string;
}

export interface ApiResponse {
  status_code: number;
  message: string;
}

// Create a new user when they sign up
export const createUser = async (email: string): Promise<ApiResponse> => {
  const response = await fetch(`${API_BASE_URL}/user/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};

// Create a new API key for the user
export const createApiKey = async (email: string): Promise<ApiKeyResponse> => {
  const response = await fetch(`${API_BASE_URL}/apikey/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};

// List all API keys for the user
export const listApiKeys = async (email: string): Promise<ApiKeyListItem[]> => {
  const response = await fetch(`${API_BASE_URL}/apikey/list`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};

// Delete an API key
export const deleteApiKey = async (email: string, key: string): Promise<ApiResponse> => {
  const response = await fetch(`${API_BASE_URL}/apikey/delete`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, key }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};