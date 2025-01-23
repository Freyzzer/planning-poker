import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormIngresoComponent } from './form-ingreso.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('FormIngresoComponent', () => {
  let component: FormIngresoComponent;
  let fixture: ComponentFixture<FormIngresoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormIngresoComponent, ReactiveFormsModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormIngresoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('debería inicializar el formulario con el campo "partida" vacío', () => {
    const form = component.formIngreso;
    expect(form.get('partida')?.value).toBe('');
  });

  it('debería marcar el formulario inválido si el campo "partida" está vacío', () => {
    const form = component.formIngreso;
    form.get('partida')?.setValue('');
    expect(form.valid).toBeFalse();
  });

  it('debería ser inválido si el nombre contiene caracteres especiales', () => {
    const form = component.formIngreso;
    form.get('partida')?.setValue('Partida@#');
    expect(form.valid).toBeFalse();
  });

  it('debería ser inválido si el nombre contiene más de 3 números', () => {
    const form = component.formIngreso;
    form.get('partida')?.setValue('Partida1234');
    expect(form.valid).toBeFalse();
  });

  // it('debería ser inválido si el nombre tiene menos de 5 caracteres', () => {
  //   const form = component.formIngreso;
  //   form.get('partida')?.setValue('1234');
  //   expect(form.valid).toBeFalse();
  // });

  it('debería ser inválido si el nombre contiene solo números', () => {
    const form = component.formIngreso;
    form.get('partida')?.setValue('12345');
    expect(form.valid).toBeFalse();
  });

});
