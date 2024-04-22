import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LuggageCreateComponent } from './luggage-create.component';

describe('LuggageCreateComponent', () => {
  let component: LuggageCreateComponent;
  let fixture: ComponentFixture<LuggageCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LuggageCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LuggageCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
