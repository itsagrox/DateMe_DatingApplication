import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from './models/user';
import { AccountService } from './services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'DateMe';
  users:any;

  constructor(private accountService:AccountService){}

  ngOnInit() {
    this.setCurrentUser();
  }

setCurrentUser(){
  const user:any=(localStorage.getItem('user'));
  this.accountService.setCurrentUser(user);
}


}
