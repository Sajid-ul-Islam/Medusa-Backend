import ApiClient from './clients/ApiClient';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:9000';

export const apiClient = new ApiClient({
  baseUrl: API_URL,
});

export default apiClient;
