import fs from 'node:fs/promises';
import type { Dirent } from 'node:fs';
import { detectRouteCollisions, resolveRouteCollisions } from '../src/core/detectRouteCollision';

jest.mock('node:fs/promises');
const mockFs = fs as jest.Mocked<typeof fs>;

describe('detectRouteCollision', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('detectRouteCollisions', () => {
    it('should detect no collisions in a simple directory structure', async () => {
      // Mock fs.access to simulate no index.mdx exists
      mockFs.access.mockRejectedValue(new Error('File not found'));
      // Mock fs.readdir to simulate the file structure
      mockFs.readdir.mockImplementation(async (path) => {
        if (path === '/test') {
          return [
            { name: 'about.mdx', isDirectory: () => false },
            { name: 'contact.mdx', isDirectory: () => false },
            { name: 'blog', isDirectory: () => true },
          ] as unknown as Dirent<NonSharedBuffer>[];
        }
        if (path === '/test/blog') {
          return [
            { name: 'post1.mdx', isDirectory: () => false },
            { name: 'post2.mdx', isDirectory: () => false },
          ] as unknown as Dirent<NonSharedBuffer>[];
        }
        return [];
      });

      const collisions = await detectRouteCollisions('/test');

      expect(collisions.size).toBe(0);
    });

    it('should detect collision between file.mdx and file/index.mdx', async () => {
      // Mock fs.readdir to simulate the file structure
      mockFs.readdir.mockImplementation(async (path) => {
        if (path === '/test') {
          return [
            { name: 'about.mdx', isDirectory: () => false },
            { name: 'about', isDirectory: () => true },
          ] as unknown as Dirent<NonSharedBuffer>[];
        }
        if (path === '/test/about') {
          return [{ name: 'index.mdx', isDirectory: () => false }] as unknown as Dirent<NonSharedBuffer>[];
        }
        return [];
      });
      // Mock fs.access to simulate index.mdx exists
      mockFs.access.mockImplementation((path) => {
        if (path === '/test/about/index.mdx') return Promise.resolve();
        throw new Error('File not found');
      });

      const collisions = await detectRouteCollisions('/test');

      expect(collisions.size).toBe(1);
      expect(collisions.has('/about')).toBe(true);
      expect(collisions.get('/about')).toEqual(['about.mdx', 'about/index.mdx']);
    });

    it('should handle nested directory structures', async () => {
      // Mock fs.readdir to simulate the file structure
      mockFs.readdir.mockImplementation(async (path) => {
        if (path === '/test') {
          return [{ name: 'docs', isDirectory: () => true }] as unknown as Dirent<NonSharedBuffer>[];
        }
        if (path === '/test/docs') {
          return [
            { name: 'api.mdx', isDirectory: () => false },
            { name: 'api', isDirectory: () => true },
          ] as unknown as Dirent<NonSharedBuffer>[];
        }
        if (path === '/test/docs/api') {
          return [{ name: 'index.mdx', isDirectory: () => false }] as unknown as Dirent<NonSharedBuffer>[];
        }
        return [];
      });
      // Mock fs.access to simulate index.mdx exists
      mockFs.access.mockImplementation((path) => {
        if (path === '/test/docs/api/index.mdx') return Promise.resolve();
        throw new Error('File not found');
      });

      const collisions = await detectRouteCollisions('/test');

      expect(collisions.size).toBe(1);
      expect(collisions.has('/docs/api')).toBe(true);
      expect(collisions.get('/docs/api')).toEqual(['docs/api.mdx', 'docs/api/index.mdx']);
    });

    it('should ignore non-mdx files', async () => {
      // Mock fs.readdir to simulate the file structure
      mockFs.readdir.mockResolvedValue([
        { name: 'about.mdx', isDirectory: () => false },
        { name: 'about.json', isDirectory: () => false },
        { name: 'about.png', isDirectory: () => false },
      ] as unknown as Dirent<NonSharedBuffer>[]);
      // Mock fs.access to simulate no index.mdx exists
      mockFs.access.mockRejectedValue(new Error('File not found'));

      const collisions = await detectRouteCollisions('/test');

      expect(collisions.size).toBe(0);
    });

    it('should handle multiple collisions', async () => {
      // Mock fs.readdir to simulate the file structure
      mockFs.readdir.mockImplementation(async (path) => {
        if (path === '/test') {
          return [
            { name: 'about.mdx', isDirectory: () => false },
            { name: 'about', isDirectory: () => true },
            { name: 'contact.mdx', isDirectory: () => false },
            { name: 'contact', isDirectory: () => true },
          ] as unknown as Dirent<NonSharedBuffer>[];
        }
        return [];
      });
      // Mock fs.access to simulate index.mdx exists
      mockFs.access.mockImplementation((path) => {
        if (path === '/test/about/index.mdx' || path === '/test/contact/index.mdx') {
          return Promise.resolve();
        }
        throw new Error('File not found');
      });

      const collisions = await detectRouteCollisions('/test');

      expect(collisions.size).toBe(2);
      expect(collisions.has('/about')).toBe(true);
      expect(collisions.get('/about')).toEqual(['about.mdx', 'about/index.mdx']);
      expect(collisions.has('/contact')).toBe(true);
      expect(collisions.get('/contact')).toEqual(['contact.mdx', 'contact/index.mdx']);
    });
  });

  describe('resolveRouteCollisions', () => {
    it('should rename non-index files when collision detected', async () => {
      const collisions = new Map([['/about', ['about.mdx', 'about/index.mdx']]]);

      // Mock fs.access to simulate -copy.mdx doesn't exist
      mockFs.access.mockRejectedValue(new Error('File not found'));
      mockFs.rename.mockResolvedValue();

      await resolveRouteCollisions({
        outputDirectory: '/output',
        collisions,
      });

      expect(mockFs.rename).toHaveBeenCalledTimes(1);
      expect(mockFs.rename).toHaveBeenCalledWith('/output/about.mdx', '/output/about-copy.mdx');
    });

    it('should prioritize index.mdx files over regular files', async () => {
      const collisions = new Map([['/docs/api', ['docs/api/index.mdx', 'docs/api.mdx']]]);

      // Mock fs.access to simulate -copy.mdx doesn't exist
      mockFs.access.mockRejectedValue(new Error('File not found'));
      mockFs.rename.mockResolvedValue();

      await resolveRouteCollisions({
        outputDirectory: '/output',
        collisions,
      });

      // Should rename api.mdx, not index.mdx
      expect(mockFs.rename).toHaveBeenCalledWith('/output/docs/api.mdx', '/output/docs/api-copy.mdx');
    });

    it('should handle existing -copy files by incrementing counter', async () => {
      const collisions = new Map([['/about', ['about.mdx', 'about/index.mdx']]]);

      // Simulate -copy.mdx and -copy-1.mdx already exist
      mockFs.access.mockImplementation(async (path) => {
        if (path === '/output/about-copy.mdx' || path === '/output/about-copy-1.mdx') {
          return Promise.resolve();
        }
        throw new Error('File not found');
      });
      mockFs.rename.mockResolvedValue();

      await resolveRouteCollisions({
        outputDirectory: '/output',
        collisions,
      });

      expect(mockFs.rename).toHaveBeenCalledWith('/output/about.mdx', '/output/about-copy-2.mdx');
    });

    it('should handle multiple files in a collision', async () => {
      const collisions = new Map([['/api', ['api.mdx', 'api/index.mdx', 'api-old.mdx']]]);

      mockFs.access.mockRejectedValue(new Error('File not found'));
      mockFs.rename.mockResolvedValue();

      await resolveRouteCollisions({
        outputDirectory: '/output',
        collisions,
      });

      // Should keep index.mdx and rename the other two
      expect(mockFs.rename).toHaveBeenCalledTimes(2);
      expect(mockFs.rename).toHaveBeenCalledWith('/output/api.mdx', '/output/api-copy.mdx');
      expect(mockFs.rename).toHaveBeenCalledWith('/output/api-old.mdx', '/output/api-old-copy.mdx');
    });

    it('should handle empty collisions map', async () => {
      const collisions = new Map();

      await resolveRouteCollisions({
        outputDirectory: '/output',
        collisions,
      });

      expect(mockFs.rename).not.toHaveBeenCalled();
    });
  });
});
