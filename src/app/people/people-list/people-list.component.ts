import { ActivatedRoute } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { People } from '../people.model';
import { PeopleService } from '../people.service';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-people-list',
  templateUrl: './people-list.component.html',
  styleUrls: ['./people-list.component.scss']
})
export class PeopleListComponent implements OnInit, OnDestroy {

  peoples:Array<People> = new Array<People>();
  search: string = '';

  private paramsSub!: Subscription;
  private peopleSub!: Subscription;

  constructor(private peopleService: PeopleService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

    this.peopleSub = this.peopleService.peoples.subscribe({ next: result => this.peoples = result });

    this.paramsSub = this.activatedRoute.queryParams.subscribe({
      next: (params) => {

        if(params.search){
          this.peopleService.search(params.search)
        }else{
          this.peopleService.getPeoples();
        }

      }
    });
  }

  ngOnDestroy(): void {
    this.paramsSub.unsubscribe();
    this.peopleSub.unsubscribe();
  }

  loadPeople(search: string) {
    if(search)
      this.peopleService.search(this.search).subscribe({ next: result => this.peoples = result });
    else
      this.peopleService.getPeoples().subscribe({ next: result => this.peoples = result });
  }
}
