import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { PeopleService } from './people.service';
import { PeopleListComponent } from './people-list/people-list.component';
import { PeopleRoutingModule } from './people-routing.module';
import { LinkModule } from '../components/link/link.module';
import { RouterModule } from '@angular/router';
import { PeopleDetailComponent } from './people-detail/people-detail.component';
import { PlanetService } from '../shared/services/planet.service';

@NgModule({
  declarations: [
    PeopleListComponent,
    PeopleDetailComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    LinkModule,
    PeopleRoutingModule,
  ],
  providers: [
    PlanetService
  ]
})
export class PeopleModule { }
