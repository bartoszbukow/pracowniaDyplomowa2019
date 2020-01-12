import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BackToPageComponent } from './back-to-page.component';

describe('BackToPageComponent', () => {
  let component: BackToPageComponent;
  let fixture: ComponentFixture<BackToPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BackToPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BackToPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
