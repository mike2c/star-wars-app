import { Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

const MAX_SIZE_SEARCHES: number = 4;
export interface Search {
  route: string,
  value: string
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {

  @ViewChild("searchInput", { read: ElementRef, static: true })
  searchInput!: ElementRef;

  searches: Array<Search> = new Array<Search>();

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {

      const searches = localStorage.getItem('searches');
      if(searches)
        this.searches = JSON.parse(searches);
  }

  search() {

    const search = this.searchInput.nativeElement.value;
    if(search) {

      this.updateSearches(search);
      const queryParams: Params = { search: search };
      this.router.navigate([],
      {
        relativeTo: this.activatedRoute,
        queryParams: queryParams,
        queryParamsHandling: 'merge',
      });

    }else{

      this.router.navigate([],
        {
          relativeTo: this.activatedRoute,
          queryParamsHandling: '',
        });
    }
  }

  updateSearches(value: string) {

    this.searches.push({ route: window.location.pathname, value: value });

    if(this.searches.length > MAX_SIZE_SEARCHES) {
      const [a, ...rest] = this.searches;
      this.searches = rest;
    }

    localStorage.setItem('searches', JSON.stringify(this.searches));
  }

  selectSearch(value: string) {
    this.router.navigateByUrl(value);
  }

  ngOnDestroy(): void {

  }
}
