import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfileComponent } from './profile.component';
import { Store } from '@ngrx/store';
import { ReactiveFormsModule } from '@angular/forms';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  let mockStore: any;

  beforeEach(async () => {
    mockStore = jasmine.createSpyObj('Store', ['dispatch']); // Mock dispatch method
    
    await TestBed.configureTestingModule({
      imports: [ProfileComponent, ReactiveFormsModule],
      providers: [
        { provide: Store, useValue: mockStore },
      ],
    }).compileComponents();
    
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    // Establecer un valor inicial en el almacenamiento local para el test
    localStorage.setItem('id', 'player123');
  });

  afterEach(() => {
    // Restablecer las llamadas de los espías después de cada test
    mockStore.dispatch.calls.reset();
  });
  
  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle modal visibility when handleModal is called', () => {
    component.handleModal();
    expect(component.isvisible).toBeTrue(); // Verifica si el modal se hizo visible

    component.handleModal();
    expect(component.isvisible).toBeFalse(); // Verifica si el modal se cerró
  });

 
  it('should not call store.dispatch when form is invalid', () => {
    component.form.setValue({ view: '' }); // Configura el formulario con un valor inválido

    component.onSubmit();

    expect(mockStore.dispatch).not.toHaveBeenCalled(); // No debe llamar a dispatch si el formulario es inválido
    expect(component.isvisible).toBeFalse(); // El modal aún debe estar cerrado
  });

  it('should close the modal when closeModal is called', () => {
    component.isvisible = true; // Asegura que el modal esté visible
    component.closeModal();
    expect(component.isvisible).toBeFalse(); // Verifica que el modal se haya cerrado
  });
});
