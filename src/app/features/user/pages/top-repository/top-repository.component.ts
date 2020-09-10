import { Component, OnInit, OnDestroy } from '@angular/core';
import { COUNTRY_LIST, INITIAL_PAGE_LIMIT, PAGE_SIZE_INTERVAL } from 'src/app/shared/application.const';
import { UserServices } from '../../services/user.services';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { RepositoryServices } from '../../services/repository.services';
import { debounceTime } from 'rxjs/operators';
import { User } from '../../models/user.model';
import { Subscription } from 'rxjs';
import { Repository } from '../../models/repository.model';

@Component({
  selector: 'app-top-repository',
  templateUrl: './top-repository.component.html',
  styleUrls: ['./top-repository.component.css']
})
export class TopRepositoryComponent implements OnInit {

  public countryList = COUNTRY_LIST;
  public filterForm: FormGroup;
  public repositoryList = new Array<Repository>();
  private subscribtionList:Subscription[] = [];
  public selectedPage = 1;
  public itemPerPage = INITIAL_PAGE_LIMIT;
  public pageSizeInterVal = PAGE_SIZE_INTERVAL;
  public pageNumbers = [];
  public selectedCountry = "Bangladesh";

  constructor(
    private userServices: UserServices,
    private fb: FormBuilder,
    private repositoryServices: RepositoryServices,
  ) { }

  ngOnInit(): void {
    this.loadRepositories();
  }

  get countryNameControl(): FormControl {
    return this.filterForm.get('countryName') as FormControl;
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


  
  
  private loadRepositories() {
    this.subscribtionList.push(this.repositoryServices.getTopRepository().subscribe(result => {
      this.repositoryList = result.items.map(user => new Repository(user));
    }));
  }

  ngOnDestroy(): void {
    this.subscribtionList.forEach(subs=>subs.unsubscribe());
  }
}
