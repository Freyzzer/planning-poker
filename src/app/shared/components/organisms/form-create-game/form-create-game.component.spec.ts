import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { FormCreateGameComponent } from './form-create-game.component';
import { GameService } from '../../../../core/services/game.service';
import { FormValidatorService } from '../../../../core/services/formValidator.service';
import { ButtonSubmitCustomComponent } from '../../atoms/button-submit-custom/button-submit-custom.component';
import { CommonModule } from '@angular/common';

describe('FormCreateGameComponent', () => {
  let component: FormCreateGameComponent;
  let fixture: ComponentFixture<FormCreateGameComponent>;
  let gameService: jasmine.SpyObj<GameService>;
  let formValidatorService: jasmine.SpyObj<FormValidatorService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const gameServiceSpy = jasmine.createSpyObj('GameService', ['createGame']);
    const formValidatorServiceSpy = jasmine.createSpyObj('FormValidatorService', ['validateForm']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, CommonModule, FormCreateGameComponent, ButtonSubmitCustomComponent],
      providers: [
        FormBuilder,
        { provide: GameService, useValue: gameServiceSpy },
        { provide: FormValidatorService, useValue: formValidatorServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(FormCreateGameComponent);
    component = fixture.componentInstance;
    gameService = TestBed.inject(GameService) as jasmine.SpyObj<GameService>;
    formValidatorService = TestBed.inject(FormValidatorService) as jasmine.SpyObj<FormValidatorService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with an empty name', () => {
    expect(component.formGame.get('name')?.value).toEqual('');
  });

  it('should call validateForm and set formErrors if validation fails', () => {
    const validationError = 'El nombre es inválido';
    formValidatorService.validateForm.and.returnValue(validationError);

    component.onSubmit();

    expect(formValidatorService.validateForm).toHaveBeenCalledWith('');
    expect(component.formErrors.name).toEqual(validationError);
    expect(gameService.createGame).not.toHaveBeenCalled();
    expect(router.navigate).not.toHaveBeenCalled();
  });

  it('should call createGame and navigate if validation passes', () => {
    const gameName = 'Valid Game Name';
    component.formGame.get('name')?.setValue(gameName);
    formValidatorService.validateForm.and.returnValue(null);

    component.onSubmit();

    expect(formValidatorService.validateForm).toHaveBeenCalledWith(gameName);
    expect(component.formErrors.name).toBeUndefined();
    expect(gameService.createGame).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalled();
  });

  it('should return empty array if control is valid or untouched', () => {
    const controlName = 'name';
    const control = component.formGame.get(controlName);
    control?.setErrors(null);

    const errors = component.getFormErrors(controlName);

    expect(errors).toEqual([]);
  });
});