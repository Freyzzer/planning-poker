import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormCreateGameComponent } from './form-create-game.component';
import { ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';


describe('FormIngresoComponent', () => {
  let component: FormCreateGameComponent;
  let fixture: ComponentFixture<FormCreateGameComponent>;
  let mockStore: any;

  beforeEach(async () => {
     // Mock del Store con métodos simulados
     mockStore = {
      pipe: jasmine.createSpy('pipe').and.returnValue(of([])), // Simula un observable vacío
      dispatch: jasmine.createSpy('dispatch'), // Simula el método dispatch
    };

    //Configuracion del testBed
    await TestBed.configureTestingModule({
      imports: [FormCreateGameComponent, ReactiveFormsModule],
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
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormCreateGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('debería inicializar el formulario con el campo "partida" vacío', () => {
    const form = component.formGame;
    expect(form.get('name')?.value).toBe('');
  });

  it('debería marcar el formulario inválido si el campo "partida" está vacío', () => {
    const form = component.formGame;
    form.get('name')?.setValue('');
    expect(form.valid).toBeFalse();
  });

  it('debería ser inválido si el nombre contiene caracteres especiales', () => {
    const form = component.formGame;
    form.get('name')?.setValue('Partida@#');
    expect(form.valid).toBeFalse();
  });

  it('debería ser inválido si el nombre contiene más de 3 números', () => {
    const form = component.formGame;
    form.get('name')?.setValue('Partida1234');
    expect(form.get('name')?.errors?.['maxThreeNumbers']).toBeTrue();
  });

  it('debería ser inválido si el nombre contiene solo números', () => {
    const form = component.formGame;
    form.get('name')?.setValue('12345');
    expect(form.valid).toBeFalse();
  });

});
