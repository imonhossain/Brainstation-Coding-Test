import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseDataService } from '../../../providers/services/base-data.service';

@Injectable({
    providedIn: 'root'
})
export class HomeServices {
    constructor(private apiService: BaseDataService) { }

    public getUsers(data?: any):Observable<any> {
      return this.apiService.get(`users`, data);
    }

    public getRepository(data?: any):Observable<any> {
      return this.apiService.get(`repositories`, data);
    }

    public getUserDetails(userName):Observable<any> {
      return this.apiService.get(`users/${userName}`);
    }

    public getUserRepos(userName):Observable<any> {
      return this.apiService.get(`users/${userName}/repos`);
    }
}