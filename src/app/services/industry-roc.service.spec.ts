import { TestBed } from '@angular/core/testing';

import { IndustryRocService } from './industry-roc.service';

describe('IndustryRocService', () => {
  let service: IndustryRocService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IndustryRocService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
