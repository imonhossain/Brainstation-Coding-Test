import { Component, OnInit, OnDestroy } from '@angular/core';
import { COUNTRY_LIST, INITIAL_PAGE_LIMIT, PAGE_SIZE_INTERVAL } from 'src/app/shared/application.const';
import { UserServices } from '../../services/user.services';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { RepositoryServices } from '../../services/repository.services';
import { debounceTime } from 'rxjs/operators';
import { User } from '../../models/user.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-top-user',
  templateUrl: './top-user.component.html',
  styleUrls: ['./top-user.component.css']
})
export class TopUserComponent implements OnInit, OnDestroy {
  public countryList = COUNTRY_LIST;
  public filterForm: FormGroup;
  public userList = new Array<User>();
  private subscribtionList:Subscription[] = [];
  public selectedPage = 1;
  public productsPerPage = INITIAL_PAGE_LIMIT;
  public pageSizeInterVal = PAGE_SIZE_INTERVAL;
  public pageNumbers = [];
  public selectedCountry = "Bangladesh";

  constructor(
    private userServices: UserServices,
    private fb: FormBuilder,
    private repositoryServices: RepositoryServices,
  ) { }

  ngOnInit(): void {
    this.createSearchForm();
    this.countryChangeEvent();
    this.loadUsers(this.selectedCountry);
  }

  get countryNameControl(): FormControl {
    return this.filterForm.get('countryName') as FormControl;
  }

  get users(): User[] {
    let pageIndex = (this.selectedPage - 1) * this.productsPerPage;
    this.pageNumbers = Array(Math.ceil(this.userList.length / this.productsPerPage)).fill(0).map((x, i) => i + 1);
    return this.userList.slice(pageIndex, pageIndex + this.productsPerPage);
  }

  changePage(newPage: number) {
    this.selectedPage = Number(newPage);
  }

  changePageSize(newSize: number) {
    this.productsPerPage = Number(newSize);
    this.changePage(1);
  }

  private createSearchForm(): void {
    this.filterForm = this.fb.group({
      countryName: [this.selectedCountry, [Validators.required]],
    });
  }

  private countryChangeEvent(){
    this.filterForm.controls['countryName'].valueChanges
    .pipe(
      debounceTime(300)
    ).subscribe((value: any) => {
      console.log("value", value);
      this.loadUsers(value);
    })
  }
  
  private loadUsers(countryName:String) {
    this.subscribtionList.push(this.userServices.getTopUsers(countryName).subscribe(result => {
      this.userList = result.items.map(user => new User(user));
    }));
  }

  ngOnDestroy(): void {
    this.subscribtionList.forEach(subs=>subs.unsubscribe());
  }
}
