import { Component, OnInit } from '@angular/core';
import { HomeServices } from '../../services/home.services'
import { User } from '../../models/user.model'
import { Repository } from '../../models/repository.model'
import { INITIAL_PAGE_LIMIT, PAGE_SIZE_INTERVAL } from '../../../../shared/application.const';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public activeTab = "user";
  public tab1 = "user";
  public tab2 = "repositories";
  public selectedPage = 1;
  public productsPerPage = INITIAL_PAGE_LIMIT;
  public pageSizeInterVal = PAGE_SIZE_INTERVAL;
  public pageNumbers = [];
  public firstPath: string;
  public searchForm: FormGroup;
  public userList = new Array<User>();
  public repositoryList = new Array<Repository>();
  private subscribtionList:Subscription[] = [];
  
  constructor(
    private homeServices: HomeServices,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.firstPath = `/${window.location.pathname.split('/')[1]}`;
    this.createSearchForm();
  }

  get queryStringControl(): FormControl {
    return this.searchForm.get('queryString') as FormControl;
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

  get users(): User[] {
    let pageIndex = (this.selectedPage - 1) * this.productsPerPage;
    this.pageNumbers = Array(Math.ceil(this.userList.length / this.productsPerPage)).fill(0).map((x, i) => i + 1);
    return this.userList.slice(pageIndex, pageIndex + this.productsPerPage);
  }

  get repositories(): Repository[] {
    let pageIndex = (this.selectedPage - 1) * this.productsPerPage;
    this.pageNumbers = Array(Math.ceil(this.repositoryList.length / this.productsPerPage)).fill(0).map((x, i) => i + 1);
    return this.repositoryList.slice(pageIndex, pageIndex + this.productsPerPage);
  }

  changePage(newPage: number) {
    this.selectedPage = Number(newPage);
  }

  changePageSize(newSize: number) {
    this.productsPerPage = Number(newSize);
    this.changePage(1);
  }

  private createSearchForm(): void {
    this.searchForm = this.fb.group({
      queryString: ["", [Validators.required]],
    });
  }

  private loadUsers(queryObj) {
    this.subscribtionList.push(this.homeServices.getUsers(queryObj).subscribe(result => {
      this.userList = result.map(user => new User(user));
    }));
  }
  
  private loadRepository(queryObj) {
    this.subscribtionList.push(this.homeServices.getRepository(queryObj).subscribe(result => {
      this.repositoryList = result.map(repository => new Repository(repository));
    }));
  }

  ngOnDestroy(): void {
    this.subscribtionList.forEach(subs=>subs.unsubscribe());
  }
}
