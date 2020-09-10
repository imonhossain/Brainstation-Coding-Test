import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserServices } from '../../services/user.services'
import { User } from '../../models/user.model'
import { Repository } from '../../models/repository.model'
import { INITIAL_PAGE_LIMIT, PAGE_SIZE_INTERVAL } from '../../../../shared/application.const';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { RepositoryServices } from '../../services/repository.services';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  public activeTab = "user";
  public tab1 = "user";
  public tab2 = "repositories";
  public selectedPage = 1;
  public itemPerPage = INITIAL_PAGE_LIMIT;
  public pageSizeInterVal = PAGE_SIZE_INTERVAL;
  public pageNumbers = [];
  public searchForm: FormGroup;
  public userList = new Array<User>();
  public repositoryList = new Array<Repository>();
  private subscribtionList:Subscription[] = [];
  
  constructor(
    private userServices: UserServices,
    private fb: FormBuilder,
    private repositoryServices: RepositoryServices,
  ) { }

  ngOnInit(): void {
    this.createSearchForm();
  }

 
  onSearch() {
    if (!this.searchForm.valid) return;
    let queryObj = {
      q: this.queryStringControl.value
    }
    if (this.activeTab === this.tab1) {
      this.loadUsers(queryObj);
    } else {
      this.loadRepository(queryObj)
    }
  }

  get queryStringControl(): FormControl {
    return this.searchForm.get('queryString') as FormControl;
  }

  get users(): User[] {
    let pageIndex = (this.selectedPage - 1) * this.itemPerPage;
    this.pageNumbers = Array(Math.ceil(this.userList.length / this.itemPerPage)).fill(0).map((x, i) => i + 1);
    return this.userList.slice(pageIndex, pageIndex + this.itemPerPage);
  }

  get repositories(): Repository[] {
    let pageIndex = (this.selectedPage - 1) * this.itemPerPage;
    this.pageNumbers = Array(Math.ceil(this.repositoryList.length / this.itemPerPage)).fill(0).map((x, i) => i + 1);
    return this.repositoryList.slice(pageIndex, pageIndex + this.itemPerPage);
  }

  changePage(newPage: number) {
    this.selectedPage = Number(newPage);
  }

  changePageSize(newSize: number) {
    this.itemPerPage = Number(newSize);
    this.changePage(1);
  }

  private createSearchForm(): void {
    this.searchForm = this.fb.group({
      queryString: ["", [Validators.required]],
    });
  }

  private loadUsers(queryObj) {
    this.subscribtionList.push(this.userServices.getUsers(queryObj).subscribe(result => {
      this.userList = result.map(user => new User(user));
    }));
  }
  
  private loadRepository(queryObj) {
    this.subscribtionList.push(this.repositoryServices.getRepository(queryObj).subscribe(result => {
      this.repositoryList = result.map(repository => new Repository(repository));
    }));
  }

  ngOnDestroy(): void {
    this.subscribtionList.forEach(subs=>subs.unsubscribe());
  }
}
