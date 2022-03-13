import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { Film } from '../film.model';
import { FilmsService } from '../films.service';

@Component({
  selector: 'app-film-list',
  templateUrl: './films-list.component.html',
  styleUrls: ['./films-list.component.scss']
})
export class FilmsListComponent implements OnInit, OnDestroy {

  private paramsSubscription!: Subscription;
  private filmsSubscription!: Subscription;
  public  films: Array<Film> = new Array<Film>();

  constructor(private filmService: FilmsService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

    this.filmsSubscription = this.filmService.films.subscribe(result => this.films = result);

    this.paramsSubscription = this.activatedRoute.queryParams.subscribe({
      next: (params: Params) => {
        if(params.search){
          this.filmService.search(params.search);
        }else{
          this.filmService.getFilms();
        }
      }
    });

  }

  ngOnDestroy(): void {
    this.paramsSubscription.unsubscribe();
    this.filmsSubscription.unsubscribe();
  }

}
