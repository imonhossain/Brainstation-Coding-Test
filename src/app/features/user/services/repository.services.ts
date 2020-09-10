import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseDataService } from '../../../providers/services/base-data.service';

@Injectable({
    providedIn: 'root'
})
export class RepositoryServices {
    constructor(private apiService: BaseDataService) { }

    public getRepository(data?: any):Observable<any> {
      return this.apiService.get(`repositories`, data);
    }

    public getUserRepos(userName):Observable<any> {
      return this.apiService.get(`users/${userName}/repos`);
    }
    public getRepositoryDetails(repositoryFullName):Observable<any> {
      return this.apiService.get(`repos/${repositoryFullName}`);
    }
}