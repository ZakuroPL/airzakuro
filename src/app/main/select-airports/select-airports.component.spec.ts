import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectAirportsComponent } from './select-airports.component';

describe('SelectAirportsComponent', () => {
  let component: SelectAirportsComponent;
  let fixture: ComponentFixture<SelectAirportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectAirportsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectAirportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
