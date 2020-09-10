import { Component, OnInit } from '@angular/core';
import { Repository } from '../../models/repository.model';
import { ActivatedRoute, Router } from '@angular/router';
import { RepositoryServices } from '../../services/repository.services';
import { UserServices } from '../../services/user.services';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-repository-details',
  templateUrl: './repository-details.component.html',
  styleUrls: ['./repository-details.component.css']
})
export class RepositoryDetailsComponent implements OnInit {
  public repoName = "";
  public repository:Repository;
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private repositoryServices: RepositoryServices,
    private userServices: UserServices) { 
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.pipe(take(1)).subscribe((params) => {
      this.repoName = params["reponame"];
    });
    
    if(this.repoName){
      this.getRepository();
    }
  }

  getRepository(){
    this.repositoryServices.getRepositoryDetails(this.repoName).pipe(
      take(1)
    ).subscribe((data: Repository) => {
      if (data) {
        this.repository = new Repository(data);
      } else {
        this.router.navigate(['./']);
      }
    });
  }

}
