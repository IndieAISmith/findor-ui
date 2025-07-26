export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

export interface Parameter {
  name: string;
  type: string;
  description: string;
  required?: boolean;
}

export interface CodeExample {
  language: 'cURL' | 'JavaScript' | 'Python';
  code: string;
}

export interface ApiResponse {
  status: number;
  description: string;
  example: string;
}

export interface ApiEndpoint {
  id: string;
  title: string;
  description: string;
  method: HttpMethod;
  path: string;
  parameters: {
    path: Parameter[];
    query: Parameter[];
    body: Parameter[];
  };
  responses: ApiResponse[];
  examples: CodeExample[];
}

export interface ApiEndpointGroup {
    group: string;
    endpoints: ApiEndpoint[];
}

export interface ApiOverview {
  title: string;
  description: string;
  baseUrl: string;
  authentication: string;
  bestPractices: string[];
  rateLimiting: string;
  support: string;
  notes: string[];
}

export interface ApiKey {
  id: string;
  name: string;
  key: string;
  createdAt: string;
}