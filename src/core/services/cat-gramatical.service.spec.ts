import { TestBed } from '@angular/core/testing';

import { CatGramaticalService } from './cat-gramatical.service';

describe('CatGramaticalService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CatGramaticalService = TestBed.get(CatGramaticalService);
    expect(service).toBeTruthy();
  });
});
