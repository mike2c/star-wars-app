import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilmRoutingModule } from './films-routing.module';
import { FilmsListComponent } from './films-list/films-list.component';
import { FilmsDetailComponent } from './films-detail/film-detail.component';
import { LinkModule } from '../components/link/link.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    FilmsListComponent,
    FilmsDetailComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FilmRoutingModule,
    LinkModule,
    RouterModule
  ]
})
export class FilmsModule { }
