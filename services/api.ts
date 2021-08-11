import axios, { AxiosResponse } from 'axios';
import { paramsNameType } from '../models';

export async function sendGetRequest (
  fullURL: string,
  params?: { [param in paramsNameType]?: any }
): Promise<AxiosResponse> {
  return await axios.get(fullURL, {
    params: params
  });
}
