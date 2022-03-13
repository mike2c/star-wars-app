import { Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { SearchService } from './shared/services/search.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {

  @ViewChild("searchInput", { read: ElementRef, static: true })
  searchInput!: ElementRef;

  searches: Array<string> = new Array<string>();
  paramsSub!: Subscription;

  constructor(public searchService: SearchService, private router: Router, private activatedRoute: ActivatedRoute) {

    this.paramsSub = activatedRoute.queryParams.subscribe({
      next: (params) => {

        if(params["search"]) {
          this.searchService.updateSearches(this.router.url)
          .subscribe({ next: (values) => this.searches = values });
        }
      }
    });

    this.searchService.searches.subscribe({ next: (values) => this.searches = values })
  }

  doSearch() {

    const search = this.searchInput.nativeElement.value;

    if(search) {
      const queryParams: Params = { search: search };

      this.router.navigate([],
      {
        relativeTo: this.activatedRoute,
        queryParams: queryParams,
        queryParamsHandling: 'merge',
      });

    }
  }

  selectSearch(value: string) {
    this.router.navigateByUrl(value);
  }

  ngOnDestroy(): void {
    this.paramsSub.unsubscribe();
  }
}
