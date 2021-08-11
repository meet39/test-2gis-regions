interface Country {
  name: string,
  code: string
}
export interface ResponseDataItem {
  id: number,
  name: string,
  code: 'ru' | 'kg' | 'kz' | 'cz',
  country: Country,
}
export interface ResponseData {
  total: number,
  items: ResponseDataItem[],
}
export interface ResponseError {
  error:{
    id: string,
    message: string
  }
}
// models/index.ts
export enum APIList {
  regions= 'regions',
  countries = 'countries'
}

export type APIInterface = {
  [key in APIList]: {
    PROTOCOL: 'https' | 'http',
    HOST: string,
    VERSION: string,
    ROUTE: string,
    fullURL: string,
  }
}

enum ParamsNames {
  'q',
  'country_code',
  'page',
  'page_size',
}
export type paramsNameType = keyof typeof ParamsNames;
