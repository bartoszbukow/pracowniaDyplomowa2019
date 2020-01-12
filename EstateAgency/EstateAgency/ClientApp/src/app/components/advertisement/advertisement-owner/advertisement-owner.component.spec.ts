import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvertisementOwnerComponent } from './advertisement-owner.component';

describe('AdvertisementOwnerComponent', () => {
  let component: AdvertisementOwnerComponent;
  let fixture: ComponentFixture<AdvertisementOwnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AdvertisementOwnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvertisementOwnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
