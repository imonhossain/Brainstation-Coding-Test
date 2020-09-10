import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseDataService } from '../../../providers/services/base-data.service';
import { TOP_USER_FLOWER_LIMIT } from 'src/app/shared/application.const';

@Injectable({
    providedIn: 'root'
})
export class UserServices {
    constructor(private apiService: BaseDataService) { }

    public getUsers(data?: any):Observable<any> {
      return this.apiService.get(`users`, data);
    }

    public getUserDetails(userName):Observable<any> {
      return this.apiService.get(`users/${userName}`);
    }
    public getTopUsers(countryName):Observable<any> {
      return this.apiService.get(`search/users?q=location:${countryName}+followers:>${TOP_USER_FLOWER_LIMIT}`);
    }

    //https://api.github.com/search/users?q=location:Bangladesh+followers
}