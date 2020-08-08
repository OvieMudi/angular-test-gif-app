import { TestBed } from '@angular/core/testing';

import { GifSearchService } from './services/gif-search.service';

describe('GifSearchService', () => {
  let service: GifSearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GifSearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
