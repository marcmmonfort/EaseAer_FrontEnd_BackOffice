import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrizeCreateComponent } from './prize-create.component';

describe('PrizeCreateComponent', () => {
  let component: PrizeCreateComponent;
  let fixture: ComponentFixture<PrizeCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrizeCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrizeCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
