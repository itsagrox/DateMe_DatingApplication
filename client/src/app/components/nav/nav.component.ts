import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  model:any={
    username:'',
    password:''
  }
  loggedIn=false;


  constructor(public accountService:AccountService) { }

  ngOnInit(): void {

  }

login(){
  this.accountService.login(this.model).subscribe(response=>{
    console.log(response);
    this.loggedIn=true
  },error=>{
    console.log(error)
  }
  )
}

logout(){
  this.accountService.logout();
  this.loggedIn=false
}

}
