// Polyfill for TextEncoder/TextDecoder in jsdom environment
const { TextEncoder, TextDecoder } = require('util');

Object.assign(global, {
  TextEncoder,
  TextDecoder,
});

// Mock ResizeObserver for React Flow
global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));
