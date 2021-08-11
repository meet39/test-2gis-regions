interface Country {
  name: string,
  code: string
}
export interface Item {
  id: number,
  name: string,
  code: 'ru' | 'kg' | 'kz' | 'cz',
  country: Country,
}
export interface Data {
  total: number,
  items: Item[],
}
export interface Error {
  error:{
    id: string,
    message: string
  }
}
export const defaultPage = 1;
export const defaultPageSize = 15;
export const API = 'https://regions-test.2gis.com/1.0/regions';
