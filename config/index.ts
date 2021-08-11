import { APIInterface, APIList } from '../models';

export const defaultPage = 1;
export const defaultPageSize = 15;

export const API: APIInterface = {
  [APIList.regions]: {
    PROTOCOL: 'https',
    HOST: 'regions-test.2gis.com',
    ROUTE: 'regions',
    VERSION: '1.0',
    get fullURL () {
      return `${this.PROTOCOL}://${this.HOST}/${this.VERSION}/${this.ROUTE}`;
    }
  },
  // расширяемость кода для новых API
  [APIList.countries]: {
    PROTOCOL: 'http',
    HOST: 'countries-test.2gis.com',
    ROUTE: 'country',
    VERSION: '2.0',
    get fullURL () {
      return `${this.PROTOCOL}://${this.HOST}/${this.VERSION}/${this.ROUTE}`;
    }
  }
};
