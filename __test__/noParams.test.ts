import axios from 'axios';
import { Data, defaultPage, defaultPageSize } from '../services';

describe('Positive tests', () => {
  const API = 'https://regions-test.2gis.com/1.0/regions';
  let data: Data;

  beforeEach(async () => {
    const response = await axios.get(API);
    data = response.data;
  });

  it('Page should contain 15 items by default', () => {
    expect(data.items.length).toBe(defaultPageSize);
  });

  it('Should be first page by default', async () => {
    const firstPageRes = await axios.get(API, {
      params: {
        page: defaultPage
      }
    });
    const firstPageData: Data = firstPageRes.data;
    expect(data.items).toEqual(firstPageData.items);
  });
});
