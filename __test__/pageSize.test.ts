import { ResponseData, ResponseError } from '../models';
import { sendGetRequest } from '../services/api';
import { API } from '../config';
const fullURL = API.regions.fullURL;

describe('Page Size param: Positive tests', () => {
  it.each([
    [5],
    [10],
    [15]
  ])('Should show [%s] items on page', async (pageSize: number) => {
    const response = await sendGetRequest(fullURL, {
      page_size: pageSize
    });

    const data: ResponseData = response.data;

    expect(data.items).toHaveLength(pageSize);
  });
});

describe('Page Size param: Negative tests', () => {
  it.each([
    [NaN, 'Not a Number'],
    ['', 'Empty'],
    [10.5, 'Fractional']
  ])('[%s] %s value should throw error', async (pageSize: string | number, reason: string) => {
    const response = await sendGetRequest(fullURL, {
      page_size: pageSize
    });

    const data: ResponseError = response.data;

    expect(data.error.message).toContain('Параметр \'page_size\' должен быть целым числом');
  });

  it.each([
    [-10, 'Negative'],
    [0, 'Zero'],
    [20, 'Unsuitable']
  ])('[%s] %s value should throw error items on page', async (pageSize: number | string) => {
    const response = await sendGetRequest(fullURL, {
      page_size: pageSize
    });

    const data: ResponseError = response.data;
    expect(data.error.message).toContain('Параметр \'page_size\' может быть одним из следующих значений: 5, 10, 15');
  });
});
