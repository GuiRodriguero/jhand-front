import { api } from '@/lib/axios';

export const importApi = {
  importBatch: async (files: File[], heroName: string): Promise<void> => {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append('files', file);
    });
    formData.append('heroName', heroName);

    await api.post('/v1/hands/import/batch', formData);
  },
};
