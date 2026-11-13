import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:8080/',
  timeout: 10000,
});

export function isNotFoundError(error: unknown) {
  return axios.isAxiosError(error) && error.response?.status === 404;
}
