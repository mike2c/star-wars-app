import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Planet } from '../models/planet.model';

@Injectable({ providedIn: 'root' })
export class PlanetService {

  private planets:Map<string, Planet> = new Map<string, Planet>();

  constructor(private http: HttpClient) { }

  public requestPlanets() {

    return this.http.get<any>('https://swapi.dev/api/planets')
    .pipe(
      map<any, Map<string, Planet>>((result: any) => {

        let values = new Map<string, Planet>();

        result.results.forEach((planet:any) => {

          let value = new Planet();
          value.climate = planet.climate;
          value.gravity = planet.gravity;
          value.name = planet.name;
          value.population = planet.population;
          value.terrain = planet.terrain;

          values.set(planet.url, value);
        });
        console.log('request done');

        return values;
      }
    )).subscribe({ next: (data) => this.planets = data });
  }

  public get(url: string): (Planet | undefined) {
    return this.planets.get(url);
  }

  public isEmpty(): boolean {
    return this.planets.size === 0 || !(this.planets);
  }
}
