import { api } from '../../../lib/axios';

export const importApi = {
  importBatch: async (files: File[], heroName: string): Promise<number> => {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append('files', file);
    });
    formData.append('heroName', heroName);

    const { status } = await api.post('/v1/hands/import/batch', formData);
    return status;
  },
};
