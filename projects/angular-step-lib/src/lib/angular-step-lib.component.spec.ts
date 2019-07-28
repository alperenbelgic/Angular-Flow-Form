import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularStepLibComponent } from './angular-step-lib.component';

describe('AngularStepLibComponent', () => {
  let component: AngularStepLibComponent;
  let fixture: ComponentFixture<AngularStepLibComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AngularStepLibComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AngularStepLibComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
