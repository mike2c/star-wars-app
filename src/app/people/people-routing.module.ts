import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PeopleListComponent } from './people-list/people-list.component';
import { PeopleDetailComponent } from './people-detail/people-detail.component';

const routes: Routes = [
  {
    path: '',
    component: PeopleListComponent
  },
  {
    path: ':id',
    component: PeopleDetailComponent
  },
  {
    path: '**',
    component: PeopleListComponent
  },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class PeopleRoutingModule { }
