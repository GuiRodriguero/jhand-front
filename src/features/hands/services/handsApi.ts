import { api } from '../../../lib/axios';

export const handsApi = {
  findAll: async (page = 0, size = 20, filters?: any) => {
    const { data } = await api.get('/v1/hands', { 
      params: { 
        page, 
        size,
        ...filters 
      } 
    });
    return data;
  },
};