import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/internal/Observable';
import { map, take } from 'rxjs/operators';
import { PlanetService } from '../shared/services/planet.service';
import { People } from './people.model';

@Injectable({
  providedIn: 'root',
})
export class PeopleService {

  private people$: BehaviorSubject<Array<People>> = new BehaviorSubject<Array<People>>([]);

  constructor(private http: HttpClient, private planetService: PlanetService) { }

  public get peoples(): Observable<Array<People>> {
      return this.people$.asObservable();
  }

  get(id: number): Observable<People> {

    return this.http.get<any>(`https://swapi.dev/api/people/${id}`)
    .pipe(map<any, People>(result => this.mapPeople(result)));
  }

  search(value: string): Observable<Array<People>> {

    this.http.get<any>(`https://swapi.dev/api/people?search=${value}`)
    .pipe(
      map<any, Array<People>>(result => result.results.map((value: any) => this.mapPeople(value)),
      take(10))
    )
    .subscribe({ next: result => this.people$.next(result) },);

    return this.people$.asObservable();
  }

  getPeoples(): Observable<Array<People>> {

    this.http.get<any>('https://swapi.dev/api/people')
    .pipe(map<any, Array<People>>(result =>
        result.results.map((value: any) => this.mapPeople(value)
      )), take(10)
    )
    .subscribe({ next: result => this.people$.next(result) },);

    return this.people$.asObservable();;
  }

  private mapHeight(height: number) {
    if(height > 200) return 'high';
    if(height < 200 && height > 100) return 'normal';
    return 'low';
  }

  private mapPeople(value: any): People {
    /**
     * Pude haber optado por declarar una variable que funcione como contador (ID) e ir incrementando, ya que los
     * registros vienen ordenados por Id desde la API, pero este metodo fallaria si en algun determinado momento
     * la API retorna los registros ordenados por otro campo o llegase a faltar uno en la base de datos.
     *
     * Es por esto que aunque este metodo es mas complicado es mas seguro, ya que no falla en ninguno de los
     * escenarios anteriores.
     */

    const id: string = (<string>value.url).substring(value.url.lastIndexOf('/') - 1, value.url.lastIndexOf('/'));

    const person = new People();
    person.id = parseInt(id);
    person.name = value.name;
    person.birthyear = value.birth_year;
    person.eyeColor = value.eye_color;
    person.hairColor = value.hair_color;
    person.skinColor = value.skin_color;
    person.height = this.mapHeight(value.height);
    person.gender = value.gender;
    person.mass = value.mass;
    person.homeworld = this.planetService.get(value.homeworld)?.name ?? 'unknown';

    return person;
  }
}
