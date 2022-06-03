import { TestBed } from '@angular/core/testing';
import { TokenService } from './token.service';
describe('TokenService', () => {
  let service: TokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TokenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have a token', () => {
    service.setToken('123')
    expect(service.getToken()).toBe('123');
  });
})
