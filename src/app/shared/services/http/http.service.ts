import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private readonly _baseUrl: string = environment.BASE_URL;
  constructor(private readonly _httpClient: HttpClient) {}

  public get<T>(endpoint: string): Observable<T> {
    return this._httpClient.get<T>(`${this._baseUrl}/${endpoint}`);
  }

  public post<T>(endpoint: string, body: any): Observable<T> {
    return this._httpClient.post<T>(`${this._baseUrl}/${endpoint}`, body);
  }
}
