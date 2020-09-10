import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {take} from 'rxjs/operators';
import { User } from '../../models/user.model';
import { UserServices } from '../../services/user.services';
import { Repository } from '../../models/repository.model';
import { RepositoryServices } from '../../services/repository.services';
@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  public userName = "";
  public user:User;
  public repositoryList = new Array<Repository>();
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private repositoryServices: RepositoryServices,
    private userServices: UserServices) { 
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.pipe(take(1)).subscribe((params) => {
      this.userName = params["username"];
    });

    if(this.userName){
      this.getUser();
      this.getRepositories();
    }
  }

  getUser(){
    this.userServices.getUserDetails(this.userName).pipe(
      take(1)
    ).subscribe((data: User) => {
      if (data) {
        this.user = new User(data);
      } else {
        this.router.navigate(['./']);
      }
    });
  }

  getRepositories(){
    this.repositoryServices.getUserRepos(this.userName).pipe(
      take(1)
    ).subscribe((result: Repository[]) => {
      this.repositoryList = result.map(repository => new Repository(repository));
    });
  }
}
