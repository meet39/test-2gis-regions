import axios from 'axios';
import { API, Data, Error } from '../services';

describe('Positive tests', () => {
  it.each([
    ['ru'],
    ['kg'],
    ['kz'],
    ['cz']
  ])('Should show region %s', async (countryCode: string) => {
    const response = await axios.get(API, {
      params: {
        country_code: countryCode
      }
    });

    const data: Data = response.data;

    const hasEnemyCode = data.items.some(item => {
      return item.country.code !== countryCode;
    });

    expect(hasEnemyCode).toBeFalsy();
  });
});

describe('Negative tests', () => {
  it.each([
    ['RU', 'Uppercase existing value'],
    ['', 'Empty'],
    ['ua', 'Existing in DB but not in the requirements'],
    ['aa', 'Unsuitable']
  ])('[%s] %s value should throw error', async (countryCode: string, reason) => {
    const response = await axios.get(API, {
      params: {
        country_code: countryCode
      }
    });

    const data: Error = response.data;
    expect(data.error.message).toContain('Параметр \'country_code\' может быть одним из следующих значений: ru, kg, kz, cz');
  });
});
