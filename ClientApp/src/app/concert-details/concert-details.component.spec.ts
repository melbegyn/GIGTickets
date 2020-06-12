import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ConcertDetailsComponent } from './concert-details.component';
 

describe('ConcertDetailsComponent', () => {
  let component: ConcertDetailsComponent;
  let fixture: ComponentFixture<ConcertDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ConcertDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConcertDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
