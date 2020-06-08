import { TestBed } from '@angular/core/testing';

import { ConcertService } from './concert.service';

describe('ConcertService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ConcertService = TestBed.get(ConcertService);
    expect(service).toBeTruthy();
  });
});
