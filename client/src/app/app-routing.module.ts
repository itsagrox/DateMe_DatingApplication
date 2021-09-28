import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './components/fallback/not-found/not-found.component';
import { ServerErrorComponent } from './components/fallback/server-error/server-error.component';
import { HomeComponent } from './components/home/home.component';
import { ListsComponent } from './components/lists/lists.component';
import { MemberDetailsComponent } from './components/members/member-details/member-details.component';
import { MemberListComponent } from './components/members/member-list/member-list.component';
import { MessagesComponent } from './components/messages/messages.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path:'',
    component:HomeComponent
  },
  {
    path:'',
    runGuardsAndResolvers:'always',
    canActivate:[AuthGuard],
    children:[
      {
        path:'members',
        component:MemberListComponent,
        canActivate:[AuthGuard]
      },
      {
        path:'members/:id',
        component:MemberDetailsComponent
      },
      {
        path:'lists',
        component:ListsComponent
      },
      {
        path:'messages',
        component:MessagesComponent
      }
    ]
  },
  {
    path:'not-found',
    component:NotFoundComponent,
    pathMatch:'full'
  },
  {
    path:'server-error',
    component:ServerErrorComponent,
    pathMatch:'full'
  },
  {
    path:'**',
    component:NotFoundComponent,
    pathMatch:'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
