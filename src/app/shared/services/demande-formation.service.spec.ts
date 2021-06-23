import { TestBed } from '@angular/core/testing';

import { DemandeFormationService } from './demande-formation.service';

describe('DemandeFormationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DemandeFormationService = TestBed.get(DemandeFormationService);
    expect(service).toBeTruthy();
  });
});
