import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/internal/Observable';
import { map, take } from 'rxjs/operators';
import { Film } from './film.model';

@Injectable({providedIn: 'root'})
export class FilmsService {

  private films$: BehaviorSubject<Array<Film>> = new BehaviorSubject<Array<Film>>([]);

  constructor(private http: HttpClient) { }

  public get films(): Observable<Array<Film>> {
    return this.films$.asObservable();
  }

  public get(id: number): Observable<Film> {

    return this.http.get<any>(`https://swapi.dev/api/films/${id}`)
            .pipe(
              map<any, Film>(value => this.mapFilm(value))
            );
  }

  public getFilms(){

    this.http.get<any>(`https://swapi.dev/api/films`)
      .pipe(
        take(10),
        map<any, Array<Film>>(
          result => result.results.map((value:any) => this.mapFilm(value))
        )
      )
      .subscribe({
        next: result => this.films$.next(result)
      });

    return this.films$.asObservable();
  }

  public search(value: string){

    this.http.get<any>(`https://swapi.dev/api/films?search=${value}`)
      .pipe(
        take(10),
        map<any, Array<Film>>(
          result => result.results.map((value:any) => this.mapFilm(value))
        ),
      )
      .subscribe({
        next: result => this.films$.next(result)
      });

    return this.films$.asObservable();
  }

  private mapFilm(value: any): Film {

    const id: string = (<string>value.url).substring(value.url.lastIndexOf('/', value.url.length - 2) + 1, value.url.lastIndexOf('/'));

    let film = new Film();
    film.id = parseInt(id);
    film.director = value.director;
    film.episodeId = value.episode_id;
    film.openingCrawl = value.opening_crawl;
    film.producer = value.producer;
    film.title = value.title;

    return film;
  }
}
