import axios from 'axios';
import { API, Data, Error, Item } from '../services';
describe('Positive tests', () => {
  it('Pages should be unique', async () => {
    const firstPageRes = await axios.get(API, {
      params: {
        page: '1'
      }
    });
    const secondPageRes = await axios.get(API, {
      params: {
        page: '2'
      }
    });
    const firstPageData: Data = firstPageRes.data;
    const secondPageData: Data = secondPageRes.data;

    const firstPageIds = firstPageData.items.map((item:Item) => {
      return item.id;
    });
    const secondPageIds = secondPageData.items.map((item:Item) => {
      return item.id;
    });
    const intersectionIds = firstPageIds.filter(num => secondPageIds.includes(num));

    expect(intersectionIds).toBeNull();
  });

  it('A non-existent page should work', async () => {
    const response = await axios.get(API, {
      params: {
        page: 90000000000
      }
    });
    const data: Data = await response.data;
    expect(data.items).toHaveLength(0);
  });
});

describe('Negative tests', () => {
  it.each([
    [-1, 'Negative', 'Параметр \'page\' должен быть больше 0'],
    [0, 'Zero', 'Параметр \'page\' должен быть больше 0'],
    [0.5, 'Fractional', 'Параметр \'page\' длжен быть целым числом'],
    [NaN, 'NaN', 'Параметр \'page\' длжен быть целым числом'],
    ['', 'Empty', 'Параметр \'page\' длжен быть целым числом']
  ])('[%s] %s should throw error', async (pageValue:number | string, reason:string, errorMessage: string) => {
    const response = await axios.get(API, {
      params: {
        page: pageValue
      }
    });
    const data: Error = response.data;
    expect(data.error.message).toMatch(errorMessage);
  });
});
