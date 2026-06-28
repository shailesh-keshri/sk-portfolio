import { TestBed } from '@angular/core/testing';
import { Pricing } from './pricing';

describe('Pricing', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Pricing],
    }).compileComponents();
  });

  it('should create the component', () => {
    const fixture = TestBed.createComponent(Pricing);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
