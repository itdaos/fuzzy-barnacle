import { extractIdFromUrl } from '../../services/api';

describe('API Service', () => {
  describe('extractIdFromUrl', () => {
    it('should extract ID from Star Wars API URL', () => {
      const url = 'https://sw-api.starnavi.io/people/1/';
      const result = extractIdFromUrl(url);
      expect(result).toBe(1);
    });

    it('should extract ID from URL without trailing slash', () => {
      const url = 'https://sw-api.starnavi.io/people/5';
      const result = extractIdFromUrl(url);
      expect(result).toBe(5);
    });

    it('should handle large IDs', () => {
      const url = 'https://sw-api.starnavi.io/films/999/';
      const result = extractIdFromUrl(url);
      expect(result).toBe(999);
    });

    it('should return 0 for invalid URLs', () => {
      const url = 'https://sw-api.starnavi.io/people/';
      const result = extractIdFromUrl(url);
      expect(result).toBe(0);
    });

    it('should return 0 for URLs without ID', () => {
      const url = 'https://sw-api.starnavi.io/people/abc/';
      const result = extractIdFromUrl(url);
      expect(result).toBe(0);
    });

    it('should handle different endpoints', () => {
      expect(extractIdFromUrl('https://sw-api.starnavi.io/starships/12/')).toBe(12);
      expect(extractIdFromUrl('https://sw-api.starnavi.io/planets/3/')).toBe(3);
      expect(extractIdFromUrl('https://sw-api.starnavi.io/species/2/')).toBe(2);
    });
  });
});
