import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { FormUsuarioComponent } from './form-usuario.component';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { IdService } from '../../../../core/services/id.service';
import { FormValidatorService } from '../../../../core/services/formValidator.service';
import { PlayerService } from '../../../../core/services/player.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('FormUsuarioComponent', () => {
  let component: FormUsuarioComponent;
  let fixture: ComponentFixture<FormUsuarioComponent>;
  let mockStore: jasmine.SpyObj<Store>;
  let mockActivatedRoute: any;
  let mockIdService: jasmine.SpyObj<IdService>;
  let mockFormValidatorService: jasmine.SpyObj<FormValidatorService>;
  let mockPlayerService: jasmine.SpyObj<PlayerService>;

  beforeEach(async () => {
    mockStore = jasmine.createSpyObj('Store', ['select', 'dispatch', 'pipe']);
    mockStore.select.and.returnValue(of([]));
    mockStore.pipe.and.returnValue(of([]));

    mockActivatedRoute = {
      snapshot: {
        paramMap: {
          get: jasmine.createSpy().and.returnValue('test-id')
        }
      }
    };

    mockIdService = jasmine.createSpyObj('IdService', ['getId', 'setId']);
    mockIdService.getId.and.returnValue('mock-id');

    mockFormValidatorService = jasmine.createSpyObj('FormValidatorService', ['validateForm']);
    
    mockPlayerService = jasmine.createSpyObj('PlayerService', ['getPlayerById', 'createPlayer']);
    mockPlayerService.getPlayerById.and.returnValue(of(undefined));
    

    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        CommonModule,
        FormUsuarioComponent
      ],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        FormBuilder,
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: Store, useValue: mockStore },
        { provide: IdService, useValue: mockIdService },
        { provide: FormValidatorService, useValue: mockFormValidatorService },
        { provide: PlayerService, useValue: mockPlayerService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(FormUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with empty values', () => {
    expect(component.formUser.get('name')?.value).toBe('');
    expect(component.formUser.get('views')?.value).toBe('');
    expect(component.formUser.get('views')?.errors?.['required']).toBeTruthy();
  });

  it('should emit onRegister if player exists on init', fakeAsync(() => {
    const mockPlayer = { name: 'Test', view: 'view', id: '1', card: null, isAdmin: true };
    mockPlayerService.getPlayerById.and.returnValue(of(mockPlayer)); // Devuelve un Observable<Player>
    const emitSpy = spyOn(component.onRegister, 'emit');
  
    component.ngOnInit();
    tick();
  
    expect(emitSpy).toHaveBeenCalledWith({ name: 'Test', views: 'view' });
  }));

  it('should show error on invalid name validation', () => {
    mockFormValidatorService.validateForm.and.returnValue('Name error');
    component.formUser.get('name')?.setValue('');

    component.onSubmit();

    expect(component.formErrors.name).toBe('Name error');
  });

  it('should call createPlayer with correct data on valid form submission', () => {
    const mockUUID = '123e4567-e89b-12d3-a456-426614174000'; // Simula un UUID válido
    spyOn(window.crypto, 'randomUUID').and.returnValue(mockUUID); // Simula crypto.randomUUID()
    component.formUser.setValue({ name: 'Valid', views: 'views' });
    mockFormValidatorService.validateForm.and.returnValue(null);
  
    component.onSubmit();
  
    expect(mockPlayerService.createPlayer).toHaveBeenCalledWith(
      'test-id',
      jasmine.objectContaining({ 
        id: mockUUID, // Verifica que el UUID simulado se use correctamente
        name: 'Valid', 
        view: 'views' 
      })
    );
  });
  it('should return error messages for name field', () => {
    const control = component.formUser.get('name')!;
    control.setErrors({ required: true });
    control.markAsTouched();

    const errors = component.getFormErrors('name');
    expect(errors).toContain('El nombre de la game es requerido.');
  });

});