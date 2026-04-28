import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumeView } from './resume-view';

describe('ResumeView', () => {
  let component: ResumeView;
  let fixture: ComponentFixture<ResumeView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResumeView],
    }).compileComponents();

    fixture = TestBed.createComponent(ResumeView);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
