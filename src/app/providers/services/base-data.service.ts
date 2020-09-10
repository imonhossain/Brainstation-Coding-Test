import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { apiConfig } from '../../app.config';
@Injectable({
  providedIn: 'root'
})

export class BaseDataService {
  constructor(private http: HttpClient) {

  }

  get(route: string, data?: any) {
    let params = new HttpParams();
    if (data !== undefined) {
      Object.getOwnPropertyNames(data).forEach(key => {
        params = params.set(key, data[key]);
      });
    }
    return this.http.get(`${apiConfig.apiUrl}/${route}`, {
      responseType: 'json',
      params
    });
  }
}
