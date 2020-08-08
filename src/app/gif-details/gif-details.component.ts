import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IGif } from '../common/interfaces/gif';
import { ISingleResult } from '../common/interfaces/searchResult';
import { GifSearchService } from '../common/services/gif-search.service';
import { IAppState } from '../common/redux/store';
import { gifActionTypes } from '../common/redux/actions';

@Component({
  selector: 'app-gif-details',
  templateUrl: './gif-details.component.html',
  styleUrls: ['./gif-details.component.css'],
})
export class GifDetailsComponent implements OnInit {
  constructor(
    private gifSearchService: GifSearchService,
    private route: ActivatedRoute
  ) {}

  gif: IGif;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.gifSearchService.fetchSingleGif(id).subscribe({
      next: (result: ISingleResult) => {
        this.gif = result.data;
      },
    });
  }
}
