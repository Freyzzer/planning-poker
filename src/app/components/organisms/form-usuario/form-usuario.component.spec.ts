import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormUsuarioComponent } from './form-usuario.component';
import { ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

describe('FormUsuarioComponent', () => {
  let component: FormUsuarioComponent;
  let fixture: ComponentFixture<FormUsuarioComponent>;
  let mockStore: any;

  beforeEach(async () => {
    // Mock del Store con métodos simulados
    mockStore = {
      pipe: jasmine.createSpy('pipe').and.returnValue(of([])), // Simula un observable vacío
      dispatch: jasmine.createSpy('dispatch'), // Simula el método dispatch
    };

    // Configuración del TestBed
    await TestBed.configureTestingModule({
      imports: [
        FormUsuarioComponent, // Componente standalone
        ReactiveFormsModule, // Necesario para formularios reactivos
      ],
      providers: [
        { provide: Store, useValue: mockStore },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: (key: string) => (key === 'id' ? 'test-game-id' : null), // Mock del parámetro 'id'
              },
            },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FormUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Inicializa el componente con los valores simulados
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('debería inicializar el formulario con campos vacíos', () => {
    const form = component.formUser;
    expect(form.get('name')?.value).toBe('');
    expect(form.get('views')?.value).toBe('');
  });

  it('debería validar correctamente un nombre con más de 3 números', () => {
    const form = component.formUser;
    form.get('name')?.setValue('abc1234');
    expect(form.get('name')?.errors?.['maxThreeNumbers']).toBeTrue();
  });

  it('debería validar correctamente un nombre con solo números', () => {
    const form = component.formUser;
    form.get('name')?.setValue('12345');
    expect(form.get('name')?.errors?.['noOnlyNumbers']).toBeTrue();
  });

  it('debería despachar la acción addPlayer al enviar un formulario válido', () => {
    const form = component.formUser;
    form.get('name')?.setValue('fre123');
    form.get('views')?.setValue('option1');

    component.onSubmit();
    expect(mockStore.dispatch).toHaveBeenCalled();
  });

  it('debería no despachar la acción addPlayer si el formulario es inválido', () => {
    const form = component.formUser;
    form.get('name')?.setValue(''); // Nombre vacío hace el formulario inválido
    form.get('views')?.setValue('');

    component.onSubmit();
    expect(mockStore.dispatch).not.toHaveBeenCalled();
  });
});
