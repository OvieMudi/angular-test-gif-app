import { Component, OnInit, OnChanges } from '@angular/core';
import { NgRedux, select } from '@angular-redux/store';
import { IGif } from '../common/interfaces/gif';
import { GifSearchService } from '../common/services/gif-search.service';
import { IAppState } from '../common/redux/store';
import { gifActionTypes } from '../common/redux/actions';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ISearchResult } from '../common/interfaces/searchResult';

@Component({
  selector: 'app-search-field',
  templateUrl: './search-field.component.html',
  styleUrls: ['./search-field.component.css'],
})
export class SearchFieldComponent implements OnInit {
  name = 'Search Field';
  gifArray: IGif[];
  constructor(
    private gifSearchService: GifSearchService,
    private ngRedux: NgRedux<IAppState>,
    private router: Router
  ) {}

  @select() searchTerm: Observable<string>;

  errorMessage: any;
  private _searchInput: string;
  get searchInput(): string {
    return this._searchInput;
  }
  set searchInput(value: string) {
    this._searchInput = value;
  }

  onSearch(): void {
    this.ngRedux.dispatch({
      type: gifActionTypes.UPDATE_SEARCH_TERM,
      payload: this.searchInput,
    });
    this.gifSearchService.fetchGifs(this.searchInput).subscribe({
      next: (result: ISearchResult) => {
        this.ngRedux.dispatch({
          type: gifActionTypes.UPDATE_GIFS,
          payload: result.data,
        });
        this.gifArray = result.data;
        this.router.navigate(['gifs']);
      },
      error: (err) => {
        this.errorMessage = err;
      },
    });
  }

  ngOnInit() {
    this.searchTerm.subscribe({
      next: (data) => {
        console.log('SearchFieldComponent -> ngOnInit -> data', data);
        this.searchInput = data;
      },
    });
  }
}
