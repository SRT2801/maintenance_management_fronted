import { TestBed } from '@angular/core/testing';

import { Toast2Service } from './toast.service';

describe('Toast2Service', () => {
  let service: Toast2Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Toast2Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
