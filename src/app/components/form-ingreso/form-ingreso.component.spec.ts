import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormIngresoComponent } from './form-ingreso.component';

describe('FormIngresoComponent', () => {
  let component: FormIngresoComponent;
  let fixture: ComponentFixture<FormIngresoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormIngresoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormIngresoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
