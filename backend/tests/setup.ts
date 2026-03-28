import mongoose from 'mongoose';

// Setup before all tests
beforeAll(() => {
  // Mock Mongoose connection globally avoiding raw DB overrides
  jest.spyOn(mongoose, 'connect').mockResolvedValue(mongoose as any);
  jest.spyOn(mongoose, 'disconnect').mockResolvedValue();

  // Mock console log to keep test output clean
  jest.spyOn(console, 'log').mockImplementation(() => {});
});

// Teardown after all tests
afterAll(async () => {
  await mongoose.disconnect();
  jest.restoreAllMocks();
});
