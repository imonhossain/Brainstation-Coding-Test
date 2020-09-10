import { Component, OnInit } from '@angular/core';
import { SpinnerService } from 'src/app/core/spinner.service';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
})
export class UserComponent implements OnInit {

  constructor(public spinnerService: SpinnerService) { }
  blocked: boolean = false;
  ngOnInit() {
    this.blocked = this.spinnerService.block;
  }
}
