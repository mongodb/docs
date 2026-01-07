import { store } from './blob-store';

export const getBlobString = async (key: string) => {
  try {
    const result = await store.get(key);
    if (!result) throw new Error('not found');

    return result.toString();
  } catch (error) {
    if (error instanceof Error && error.message.includes('not found')) {
      return null;
    }
    throw error;
  }
};

export const getBlob = async (key: string) => {
  try {
    const result = await store.get(key, { type: 'blob' });
    if (!result) throw new Error('not found');

    return result;
  } catch (error) {
    if (error instanceof Error && error.message.includes('not found')) {
      return null;
    }
    throw error;
  }
};
