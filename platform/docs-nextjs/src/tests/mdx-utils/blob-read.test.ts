import { getBlobString, getBlob } from '@/mdx-utils/blob-read';

// jest hoists jest.mock() calls and allows let/const variables whose names
// start with "mock" to be referenced inside factory functions.
const mockProductionGet = jest.fn();
const mockBranchGet = jest.fn();
let mockBranchStore: { get: jest.Mock } | null = { get: mockBranchGet };
let mockBranchStoreName: string | null = 'test-branch-mdx-content';

jest.mock('@/mdx-utils/blob-store', () => ({
  getProductionStore: () => ({ get: mockProductionGet }),
  getBranchStore: () =>
    mockBranchStore !== null ? { store: mockBranchStore, name: mockBranchStoreName } : null,
}));

describe('getFromStores', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Reset to branch context before each test.
    mockBranchStore = { get: mockBranchGet };
    mockBranchStoreName = 'test-branch-mdx-content';
  });

  describe('on a branch (branchSpecificStore is set)', () => {
    it('returns content from the branch store without trying production', async () => {
      mockBranchGet.mockResolvedValue('branch content');

      const result = await getBlobString('mdx/test/file.mdx');

      expect(result).toBe('branch content');
      expect(mockBranchGet).toHaveBeenCalledWith('mdx/test/file.mdx', { type: 'text' });
      expect(mockProductionGet).not.toHaveBeenCalled();
    });

    it('falls back to production when branch store returns null', async () => {
      mockBranchGet.mockResolvedValue(null);
      mockProductionGet.mockResolvedValue('production content');

      const result = await getBlobString('mdx/test/file.mdx');

      expect(result).toBe('production content');
      expect(mockProductionGet).toHaveBeenCalledWith('mdx/test/file.mdx', { type: 'text' });
    });

    it('falls back to production when branch store throws a 404-like error', async () => {
      mockBranchGet.mockRejectedValue(new Error('not found'));
      mockProductionGet.mockResolvedValue('production content');

      const result = await getBlobString('mdx/test/file.mdx');

      expect(result).toBe('production content');
      expect(mockProductionGet).toHaveBeenCalled();
    });

    it('returns null when neither store has the key', async () => {
      mockBranchGet.mockResolvedValue(null);
      mockProductionGet.mockResolvedValue(null);

      const result = await getBlobString('mdx/missing/file.mdx');

      expect(result).toBeNull();
    });

    it('logs both store names and rethrows on a real error from the branch store', async () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      mockBranchGet.mockRejectedValue(new Error('network timeout'));

      await expect(getBlobString('mdx/test/file.mdx')).rejects.toThrow('network timeout');

      const logMessage = consoleSpy.mock.calls[0][0] as string;
      expect(logMessage).toContain('"test-branch-mdx-content"');
      expect(logMessage).toContain('"mdx-content"');
      consoleSpy.mockRestore();
    });

    it('passes type: blob to the store when called via getBlob', async () => {
      mockBranchGet.mockResolvedValue(new Blob(['image']));

      await getBlob('image/test/photo.png');

      expect(mockBranchGet).toHaveBeenCalledWith('image/test/photo.png', { type: 'blob' });
    });
  });

  describe('on main (branchSpecificStore is null)', () => {
    beforeEach(() => {
      mockBranchStore = null;
      mockBranchStoreName = null;
    });

    it('fetches only from production store', async () => {
      mockProductionGet.mockResolvedValue('production content');

      const result = await getBlobString('mdx/test/file.mdx');

      expect(result).toBe('production content');
      expect(mockBranchGet).not.toHaveBeenCalled();
    });

    it('returns null when key is not in production', async () => {
      mockProductionGet.mockResolvedValue(null);

      const result = await getBlobString('mdx/missing/file.mdx');

      expect(result).toBeNull();
    });

    it('logs only the production store name on error', async () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      mockProductionGet.mockRejectedValue(new Error('network timeout'));

      await expect(getBlobString('mdx/test/file.mdx')).rejects.toThrow('network timeout');

      const logMessage = consoleSpy.mock.calls[0][0] as string;
      expect(logMessage).toContain('"mdx-content"');
      expect(logMessage).not.toContain('branch');
      consoleSpy.mockRestore();
    });
  });
});
