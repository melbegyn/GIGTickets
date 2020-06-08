import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConcertDetailsComponentComponent } from './concert-details-component.component';

describe('ConcertDetailsComponentComponent', () => {
  let component: ConcertDetailsComponentComponent;
  let fixture: ComponentFixture<ConcertDetailsComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConcertDetailsComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConcertDetailsComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
