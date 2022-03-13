import { Component, OnInit } from '@angular/core';
import { People } from '../people.model';
import { PeopleService } from '../people.service';


@Component({
  selector: 'app-people-list',
  templateUrl: './people-list.component.html',
  styleUrls: ['./people-list.component.scss']
})
export class PeopleListComponent implements OnInit {

  peoples:Array<People> = new Array<People>();

  constructor(private peopleService: PeopleService) { }

  ngOnInit(): void {
    this.peopleService.getPeoples().subscribe({ next: result => this.peoples = result });
  }

}
