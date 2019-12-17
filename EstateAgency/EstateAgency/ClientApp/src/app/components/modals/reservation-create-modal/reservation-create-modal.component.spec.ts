import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationCreateModalComponent } from './reservation-create-modal.component';

describe('ReservationCreateModalComponent', () => {
  let component: ReservationCreateModalComponent;
  let fixture: ComponentFixture<ReservationCreateModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReservationCreateModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservationCreateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
