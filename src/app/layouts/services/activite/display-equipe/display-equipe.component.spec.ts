import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayEquipeComponent } from './display-equipe.component';

describe('DisplayEquipeComponent', () => {
  let component: DisplayEquipeComponent;
  let fixture: ComponentFixture<DisplayEquipeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayEquipeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayEquipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
