// Uncomment the code below and write your tests
import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios');
jest.mock('lodash', () => ({
  throttle: jest.fn((fn) => fn),
}));

describe('throttledGetDataFromApi', () => {
  test('should create instance with provided base url', async () => {
    const mockAxiosCreate = jest.fn().mockReturnValue({
      get: jest.fn().mockResolvedValue({ data: 'test data' }),
    });
    (axios.create as jest.Mock) = mockAxiosCreate;

    await throttledGetDataFromApi('/test');

    expect(mockAxiosCreate).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });
  test('should perform request to correct provided url', async () => {
    const mockGet = jest.fn().mockResolvedValue({ data: 'test data' });
    const mockAxiosCreate = jest.fn().mockReturnValue({ get: mockGet });
    (axios.create as jest.Mock) = mockAxiosCreate;

    await throttledGetDataFromApi('/test');

    expect(mockGet).toHaveBeenCalledWith('/test');
  });

  test('should return response data', async () => {
    const expectedData = { id: 1, title: 'Test Title' };
    const mockGet = jest.fn().mockResolvedValue({ data: expectedData });
    const mockAxiosCreate = jest.fn().mockReturnValue({ get: mockGet });
    (axios.create as jest.Mock) = mockAxiosCreate;

    const result = await throttledGetDataFromApi('/test');

    expect(result).toEqual(expectedData);
  });
});
