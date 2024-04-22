import { environment } from 'src/environments/environment';

export const COLLECTION: Record<string, string> = {
  convert: 'convert',
  symbols: 'symbols',
  latest: 'latest',
  timeseries: 'timeseries',
};
export const baseUrl = environment.apiUrl;

export const API_URL = (key: string) => `${baseUrl}/${COLLECTION[key]}`;
