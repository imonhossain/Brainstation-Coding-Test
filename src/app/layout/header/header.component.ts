
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// import { apiConfig } from '../../../app.config'
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public openMenuMobile = false;

  constructor(


  ) { }

  ngOnInit() {
   
  

  }

 
}
