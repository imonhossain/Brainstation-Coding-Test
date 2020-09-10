import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseDataService } from '../../../providers/services/base-data.service';
import { TOP_REPOSITORY_STATUS_LIMIT } from 'src/app/shared/application.const';

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
    public getTopRepository():Observable<any> {
      return this.apiService.get(`search/repositories?q=stars:>${TOP_REPOSITORY_STATUS_LIMIT}`);
    }
}