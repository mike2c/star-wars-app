import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { People } from '../people.model';
import { PeopleService } from '../people.service';

@Component({
  selector: 'app-people-detail',
  templateUrl: './people-detail.component.html',
  styleUrls: ['./people-detail.component.scss']
})
export class PeopleDetailComponent implements OnInit {

  people!: People;

  constructor(private peopleService: PeopleService, private activatedRoute: ActivatedRoute) {

    this.activatedRoute.params.subscribe({
      next: params => {
        this.peopleService.get(params.id).subscribe(result => this.people = result);
      }
    });
  }

  ngOnInit(): void { }

}
