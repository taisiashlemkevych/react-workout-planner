import axios from 'axios';

const API_BASE_URL =
  import.meta.env.VITE_WGER_API_URL ?? 'https://wger.de/api/v2/';

export const httpClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    Accept: 'application/json',
  },
});
