import { ResponseData, ResponseError } from '../models';
import { API } from '../config';
import { sendGetRequest } from '../services/api';
const fullURL = API.regions.fullURL;

describe('Country Code param: Positive tests', () => {
  it.each([
    ['ru'],
    ['kg'],
    ['kz'],
    ['cz']
  ])('Should show region %s', async (countryCode: string) => {
    const response = await sendGetRequest(fullURL, {
      country_code: countryCode
    });

    const data: ResponseData = response.data;

    const hasEnemyCode = data.items.some(item => {
      return item.country.code !== countryCode;
    });

    expect(hasEnemyCode).toBeFalsy();
  });
});

describe('Country Code param: Negative tests', () => {
  it.each([
    ['RU', '"Uppercase existing"'],
    ['', 'Empty'],
    ['ua', '"Existing in DB but not in the requirements"'],
    ['aa', 'Unsuitable']
  ])('[%s] %s value should throw error', async (countryCode: string, reason) => {
    const response = await sendGetRequest(fullURL, {
      country_code: countryCode
    });

    const data: ResponseError = response.data;
    expect(data.error.message).toContain('Параметр \'country_code\' может быть одним из следующих значений: ru, kg, kz, cz');
  });
});
