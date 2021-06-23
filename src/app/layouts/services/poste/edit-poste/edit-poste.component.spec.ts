import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPosteComponent } from './edit-poste.component';

describe('EditPosteComponent', () => {
  let component: EditPosteComponent;
  let fixture: ComponentFixture<EditPosteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPosteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPosteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
