import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';
import { AccountService } from 'src/app/services/account.service';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  isCollapsed=true
  model:any={
    username:'',
    password:''
  }
  loggedIn=false;


  constructor(public accountService:AccountService,private router:Router,private toastr:ToastrService) { }

  ngOnInit(): void {

  }

login(){
  this.accountService.login(this.model).subscribe(response=>{
    console.log(response);
    this.router.navigateByUrl('/members')
    this.loggedIn=true
  }
  )
}

logout(){
  this.accountService.logout();
  this.router.navigateByUrl('/')
  this.loggedIn=false
}

}
