import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConcertAddComponent } from './concert-add.component';

describe('ConcertAddComponent', () => {
  let component: ConcertAddComponent;
  let fixture: ComponentFixture<ConcertAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConcertAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConcertAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
