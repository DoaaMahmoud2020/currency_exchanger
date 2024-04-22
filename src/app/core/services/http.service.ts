import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_URL } from '../constants/api-end-points.constant';
import { Observable } from 'rxjs/internal/Observable';
import { IConvert } from '../models/convert.model';
import { ILatest } from '../models/latest.model';
import { ITimeSeries } from '../models/time-series.model';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private _httpClient: HttpClient = inject(HttpClient);
  headers = new HttpHeaders().set('apikey', '12n6I3u4ie0KtZzTx0pMSB4TjdsLVaHj');

  public getAll(apiUrl: string): Observable<any> {
    const endpointUrl = `${API_URL(apiUrl)}`;
    return this._httpClient.get<any>(endpointUrl, { headers: this.headers });
  }
  public getLatest(params: any, apiUrl: string): Observable<ILatest> {
    const endpointUrl = `${API_URL(apiUrl)}?symbols=${params?.symbols}&base=${
      params.base
    }`;
    return this._httpClient.get<ILatest>(endpointUrl, {
      headers: this.headers,
    });
  }
  public getTimeseries(params: any, apiUrl: string): Observable<ITimeSeries> {
    const endpointUrl = `${API_URL(apiUrl)}?start_date=${
      params?.start_date
    }&end_date=${params.end_date}`;
    return this._httpClient.get<ITimeSeries>(endpointUrl, {
      headers: this.headers,
    });
  }
  public getConvert(params: any, apiUrl: string): Observable<IConvert> {
    const endpointUrl = `${API_URL(apiUrl)}?to=${params?.to}&from=${
      params.from
    }&amount=${params.amount}`;
    return this._httpClient.get<IConvert>(endpointUrl, {
      headers: this.headers,
    });
  }
}
