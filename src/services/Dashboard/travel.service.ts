/* eslint-disable @typescript-eslint/no-explicit-any */

export const getAllTravels = async (
  params?: { [key: string]: string | string[] | undefined },
  signal?: AbortSignal
): Promise<any> => {
  try {
    let url = `${process.env.NEXT_PUBLIC_BASE_API_URL}/travel/getTravel`;
    
    if (params) {
      const queryParams = new URLSearchParams();
      
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          queryParams.append(key, String(value));
        }
      });

      const queryString = queryParams.toString();
      if (queryString) {
        url = `${url}?${queryString}`;
      }
    }

    const res = await fetch(url, {
      cache: 'no-store',
      signal
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const result = await res.json();
    return result;
  } catch (error: any) {
    if (error.name === "AbortError") {
      throw error;
    }
    console.error("Error fetching travels:", error);
    return {
      success: false,
      message: "Failed to fetch travels",
      data: [],
      meta: {
        page: 1,
        limit: 10,
        total: 0,
        totalPage: 0
      }
    };
  }
};




