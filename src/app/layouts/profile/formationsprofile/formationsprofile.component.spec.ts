import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormationsprofileComponent } from './formationsprofile.component';

describe('FormationsprofileComponent', () => {
  let component: FormationsprofileComponent;
  let fixture: ComponentFixture<FormationsprofileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormationsprofileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormationsprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
