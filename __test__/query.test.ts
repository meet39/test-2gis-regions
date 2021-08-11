import axios from 'axios';
import { API, Data, Error } from '../services';

describe('Positive tests', () => {
  it('Search should be fuzzy and case-insensitive', async () => {
    const response = await axios.get(API, {
      params: {
        q: 'ОВОСИБИРС'
      }
    });
    const data: Data = response.data;
    expect(data.items[0].name).toContain('Новосибирск');
  });
  it('Search should work with numbers', async () => {
    const response = await axios.get(API, {
      params: {
        q: 123
      }
    });
    const data: Data = response.data;
    expect(data).toHaveProperty('items');
  });

  it.each([
    ['country_code', 'cz'],
    ['page', '10'],
    ['page_size', '5']
  ])('Search should ignore other params [?%s=%s]', async (param, value) => {
    const expectResponse = await axios.get(API, {
      params: {
        q: 'оск'
      }
    });
    const response = await axios.get(API, {
      params: {
        q: 'оск',
        [param]: value
      }
    });
    const data: Data = response.data;
    expect(data).toEqual(expectResponse.data);
  });
});

describe('Negative tests', () => {
  it.each([
    ['', 'Empty'],
    ['A', 'One sign'],
    ['AA', 'Two sight']
  ])('[%s] %s search should throw Error', async (qValue: string) => {
    const response = await axios.get(API, {
      params: {
        q: qValue
      }
    });
    const data: Error = response.data;

    expect(data.error.message).toBe('Параметр \'q\' должен быть не менее 3 символов');
  });
});
