import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrizeDetailsComponent } from './prize-details.component';

describe('PrizeDetailsComponent', () => {
  let component: PrizeDetailsComponent;
  let fixture: ComponentFixture<PrizeDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrizeDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrizeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
