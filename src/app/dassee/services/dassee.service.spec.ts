import { TestBed } from '@angular/core/testing';

import { DasseeService } from './dassee.service';

describe('DasseeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DasseeService = TestBed.get(DasseeService);
    expect(service).toBeTruthy();
  });
});
