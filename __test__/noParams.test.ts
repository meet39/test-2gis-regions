import { ResponseData } from '../models';
import { API, defaultPage, defaultPageSize } from '../config';
import { sendGetRequest } from '../services/api';

const fullURL = API.regions.fullURL;

describe('Without any params: Positive tests', () => {
  let data: ResponseData;

  beforeEach(async () => {
    const response = await sendGetRequest(fullURL);
    data = response.data;
  });

  it('Page should contain 15 items by default', () => {
    expect(data.items.length).toBe(defaultPageSize);
  });

  it('Should be first page by default', async () => {
    const firstPageRes = await sendGetRequest(fullURL, {
      page: defaultPage
    });
    const firstPageData: ResponseData = firstPageRes.data;
    expect(data.items).toEqual(firstPageData.items);
  });
});
