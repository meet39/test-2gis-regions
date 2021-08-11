import { ResponseData, ResponseError, ResponseDataItem } from '../models';
import { sendGetRequest } from '../services/api';
import { API } from '../config';
const fullURL = API.regions.fullURL;

describe('Page param: Positive tests', () => {
  it('Pages should be unique', async () => {
    const firstPageRes = await sendGetRequest(fullURL, {
      page: '1'

    });
    const secondPageRes = await sendGetRequest(fullURL, {
      page: '2'
    });
    const firstPageData: ResponseData = firstPageRes.data;
    const secondPageData: ResponseData = secondPageRes.data;

    const firstPageIds = firstPageData.items.map((item:ResponseDataItem) => {
      return item.id;
    });
    const secondPageIds = secondPageData.items.map((item:ResponseDataItem) => {
      return item.id;
    });
    const intersectionIds = firstPageIds.filter(num => secondPageIds.includes(num));

    expect(intersectionIds).toHaveLength(0);
  });

  it('A non-existent page should work', async () => {
    const response = await sendGetRequest(fullURL, {
      page: 90000000000
    });
    const data: ResponseData = await response.data;
    expect(data.items).toHaveLength(0);
  });
});

describe('Page param: Negative tests', () => {
  it.each([
    [-1, 'Negative', 'Параметр \'page\' должен быть больше 0'],
    [0, 'Zero', 'Параметр \'page\' должен быть больше 0'],
    [0.5, 'Fractional', 'Параметр \'page\' должен быть целым числом'],
    [NaN, 'NaN', 'Параметр \'page\' должен быть целым числом'],
    ['', 'Empty', 'Параметр \'page\' должен быть целым числом']
  ])('[%s] %s should throw error', async (pageValue:number | string, reason:string, errorMessage: string) => {
    const response = await sendGetRequest(fullURL, {
      page: pageValue
    });
    const data: ResponseError = response.data;
    expect(data.error.message).toMatch(errorMessage);
  });
});
