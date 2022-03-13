import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FilmsDetailComponent } from './films-detail/film-detail.component';
import { FilmsListComponent } from './films-list/films-list.component';

const routes: Routes = [
  {
    path: '',
    component: FilmsListComponent
  },
  {
    path: ':id',
    component: FilmsDetailComponent,
  },
  {
    path: '**',
    component: FilmsListComponent
  },
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class FilmRoutingModule { }
