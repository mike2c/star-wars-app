import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { Film } from '../film.model';
import { FilmsService } from '../films.service';

@Component({
  selector: 'app-film-detail',
  templateUrl: './films-detail.component.html',
  styleUrls: ['./films-detail.component.scss']
})
export class FilmsDetailComponent implements OnInit, OnDestroy {

  private filmSub!: Subscription;
  private paramsSub!: Subscription;

  public film:Film | undefined = new Film();

  constructor(private filmService: FilmsService, private activatedRoute: ActivatedRoute) {

  }

  ngOnInit(): void {

    this.paramsSub = this.activatedRoute.params.subscribe({
      next: (params: Params) => {

          if(params.id){

            this.filmSub = this.filmService.get(params.id).subscribe(
              { next: result => {
                this.film = result;
              },
              error: (error) => {
                this.film = undefined;
              }
            })
          }
        }
      });
  }

  ngOnDestroy(): void {
    this.paramsSub.unsubscribe();
    this.filmSub.unsubscribe();
  }
}
