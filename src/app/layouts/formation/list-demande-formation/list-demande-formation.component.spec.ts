import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDemandeFormationComponent } from './list-demande-formation.component';

describe('ListDemandeFormationComponent', () => {
  let component: ListDemandeFormationComponent;
  let fixture: ComponentFixture<ListDemandeFormationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListDemandeFormationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListDemandeFormationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
