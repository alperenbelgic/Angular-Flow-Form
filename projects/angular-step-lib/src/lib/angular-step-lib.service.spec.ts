import { TestBed } from '@angular/core/testing';

import { AngularStepLibService } from './angular-step-lib.service';

describe('AngularStepLibService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AngularStepLibService = TestBed.get(AngularStepLibService);
    expect(service).toBeTruthy();
  });
});
