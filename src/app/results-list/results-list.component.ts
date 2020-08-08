import {
  Component,
  OnChanges,
  Input,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { select } from '@angular-redux/store';
import { NgRedux } from '@angular-redux/store';
import { IGif } from '../common/interfaces/gif';
import { Observable } from 'rxjs';
import { GifSearchService } from '../common/services/gif-search.service';
import { ISearchResult } from '../common/interfaces/searchResult';
import { IAppState } from '../common/redux/store';
import { gifActionTypes } from '../common/redux/actions';

@Component({
  selector: 'app-results-list',
  templateUrl: './results-list.component.html',
  styleUrls: ['./results-list.component.css'],
})
export class ResultsListComponent implements OnInit {
  constructor(
    private gifSearchService: GifSearchService,
    private ngRedux: NgRedux<IAppState>
  ) {}

  @select() gifs: Observable<IGif[]>;
  @select() searchTerm: Observable<string>;

  searchString: string;
  gifArray: IGif[];
  errorMessage: any;

  onSearch(): void {
    this.gifSearchService.fetchGifs(this.searchString).subscribe({
      next: (result: ISearchResult) => {
        this.ngRedux.dispatch({
          type: gifActionTypes.UPDATE_GIFS,
          payload: result.data,
        });
        this.gifArray = result.data;
      },
      error: (err) => {
        this.errorMessage = err;
      },
    });
  }

  ngOnInit() {
    this.searchTerm.subscribe({
      next: (data) => {
        this.searchString = data;
      },
    });
    this.onSearch();
  }
}
