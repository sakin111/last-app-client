import { getNewAccessToken } from "@/services/Auth/auth.service";

const BACKEND_API_URL = process.env.NEXT_PUBLIC_BASE_API_URL || "http://localhost:5000/api/v1";

const serverFetchHelper = async (
  endpoint: string,
  options: RequestInit
): Promise<Response> => {
  const { headers, ...restOptions } = options;


  if (endpoint !== "/auth/refresh-token") {
    await getNewAccessToken();
  }


  if (process.env.NODE_ENV === 'development') {
    console.log('Making request to:', `${BACKEND_API_URL}${endpoint}`);
    console.log('With credentials:', 'include');
  }

  const response = await fetch(`${BACKEND_API_URL}${endpoint}`, {
    ...restOptions,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },

    credentials: "include",
  });


  if (process.env.NODE_ENV === 'development') {
    console.log('Response status:', response.status);
    console.log('Response headers:', Object.fromEntries(response.headers.entries()));
  }

  return response;
};

export const profileFetch = {
  get: async (
    endpoint: string,
    options: RequestInit = {}
  ): Promise<Response> => 
    serverFetchHelper(endpoint, { ...options, method: "GET" }),

  post: async (
    endpoint: string,
    options: RequestInit = {}
  ): Promise<Response> => 
    serverFetchHelper(endpoint, { ...options, method: "POST" }),

  put: async (
    endpoint: string,
    options: RequestInit = {}
  ): Promise<Response> => 
    serverFetchHelper(endpoint, { ...options, method: "PUT" }),

  patch: async (
    endpoint: string,
    options: RequestInit = {}
  ): Promise<Response> => 
    serverFetchHelper(endpoint, { ...options, method: "PATCH" }),

  delete: async (
    endpoint: string,
    options: RequestInit = {}
  ): Promise<Response> => 
    serverFetchHelper(endpoint, { ...options, method: "DELETE" }),
};