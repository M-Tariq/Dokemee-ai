import { TestBed } from '@angular/core/testing';

import { CompletedFormsService } from './completed-forms.service';

describe('CompletedFormsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CompletedFormsService = TestBed.get(CompletedFormsService);
    expect(service).toBeTruthy();
  });
});
