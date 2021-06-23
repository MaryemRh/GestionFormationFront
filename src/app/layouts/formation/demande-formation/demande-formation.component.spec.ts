import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandeFormationComponent } from './demande-formation.component';

describe('DemandeFormationComponent', () => {
  let component: DemandeFormationComponent;
  let fixture: ComponentFixture<DemandeFormationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemandeFormationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemandeFormationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
