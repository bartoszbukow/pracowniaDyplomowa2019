import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvertisementDeleteModalComponent } from './advertisement-delete-modal.component';

describe('AdvertisementDeleteModalComponent', () => {
  let component: AdvertisementDeleteModalComponent;
  let fixture: ComponentFixture<AdvertisementDeleteModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdvertisementDeleteModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvertisementDeleteModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
