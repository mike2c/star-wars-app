import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { ReplaySubject } from 'rxjs/internal/ReplaySubject';
import { scan } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  public static readonly SEARCH_ITEM_NAME: string = "searches";

  private searches$: ReplaySubject<string> = new ReplaySubject(4);

  constructor() {

    let storedSearches = localStorage.getItem(SearchService.SEARCH_ITEM_NAME);

    if(storedSearches) {
      const values:[] = JSON.parse(storedSearches);
      values.forEach(a => this.searches$.next());
    }
  }

  public get searches(): Observable<Array<string>> {
    return this.scanValues(this.searches$.asObservable());
  }

  public updateSearches(search: string): Observable<Array<string>> {
    this.searches$.next(search);
    this.saveSearches();
    return this.scanValues(this.searches$.asObservable());
  }

  private saveSearches() {

    const subscriber = this.searches.subscribe({
      next: (value) => localStorage.setItem(SearchService.SEARCH_ITEM_NAME, JSON.stringify(value)),
      error: (err) => console.log(err)
    });

    subscriber.unsubscribe();
  }

  private scanValues(values$: Observable<string>): Observable<Array<string>> {
    return values$.pipe<Array<string>>(scan<string, Array<string>>((a, c) => [...a, c], []));
  }
}
