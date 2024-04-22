import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LuggageEditComponent } from './luggage-edit.component';

describe('LuggageEditComponent', () => {
  let component: LuggageEditComponent;
  let fixture: ComponentFixture<LuggageEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LuggageEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LuggageEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
