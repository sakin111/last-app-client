

const BACKEND_API_URL = process.env.NEXT_PUBLIC_BASE_API_URL || "http://localhost:5000/api/v1";

const clientFetchHelper = async (
  endpoint: string,
  options: RequestInit
): Promise<Response> => {
  const { headers, ...restOptions } = options;

  const response = await fetch(`${BACKEND_API_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    credentials: "include", 
    ...restOptions,
  });

  return response;
};

export const clientFetch = {
  get: async (
    endpoint: string,
    options: RequestInit = {}
  ): Promise<Response> =>
    clientFetchHelper(endpoint, { ...options, method: "GET" }),

  post: async (
    endpoint: string,
    options: RequestInit = {}
  ): Promise<Response> =>
    clientFetchHelper(endpoint, { ...options, method: "POST" }),

  put: async (
    endpoint: string,
    options: RequestInit = {}
  ): Promise<Response> =>
    clientFetchHelper(endpoint, { ...options, method: "PUT" }),

  patch: async (
    endpoint: string,
    options: RequestInit = {}
  ): Promise<Response> =>
    clientFetchHelper(endpoint, { ...options, method: "PATCH" }),

  delete: async (
    endpoint: string,
    options: RequestInit = {}
  ): Promise<Response> =>
    clientFetchHelper(endpoint, { ...options, method: "DELETE" }),
};