import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ISearchResult, ISingleResult } from '../interfaces/searchResult';

@Injectable({
  providedIn: 'root',
})
export class GifSearchService {
  constructor(private http: HttpClient) {}

  baseUrl = 'https://api.giphy.com/v1/gifs';
  sampleKey = 'deokzgUjxm6QHQdp3H3aca1LSZcCpucc';

  gifSearchUrl = `${this.baseUrl}/search?api_key=${this.sampleKey}`;

  fetchGifs(searchTerm: string): Observable<ISearchResult> {
    console.log('GifSearchService -> constructor -> searchTerm', searchTerm);

    return this.http
      .get<ISearchResult>(
        `${this.gifSearchUrl}&q=${searchTerm}&limit=25&offset=0&rating=Y&lang=en`
      )
      .pipe(catchError(this.handleError));
  }

  fetchSingleGif(gifId: string): Observable<ISingleResult> {
    return this.http
      .get(`${this.baseUrl}/${gifId}?api_key=${this.sampleKey}`)
      .pipe(catchError(this.handleError));
  }

  private handleError(err: HttpErrorResponse): Observable<any> {
    let errorMessage = '';

    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Server returned code: ${err.status}. Error message: ${err.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
