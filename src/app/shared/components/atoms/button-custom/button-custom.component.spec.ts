import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonCustomComponent } from './button-custom.component';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import { toggleRevealVotes } from '../../../../storage/actions/game.actions';

describe('ButtonCustomComponent', () => {
  let component: ButtonCustomComponent;
  let fixture: ComponentFixture<ButtonCustomComponent>;
  let mockStore: any;

  beforeEach(async () => {
    // Mock del store
    mockStore = {
      select: jasmine.createSpy('select').and.returnValue(of([])), // Simula `select`
      dispatch: jasmine.createSpy('dispatch'), // Simula `dispatch`
      pipe: jasmine.createSpy('pipe').and.returnValue(of([])),
    };

    await TestBed.configureTestingModule({
      imports: [ButtonCustomComponent],
      providers: [
        {
          provide: Store,
          useValue: mockStore, // Proporciona el mock del Store
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonCustomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle text and call reveal.emit() on button click', () => {
    spyOn(component.reveal, 'emit'); // Espía el evento emitido

    // Simula el primer clic
    component.onClick();
    expect(mockStore.dispatch).toHaveBeenCalledWith(toggleRevealVotes()); // Verifica que dispatch fue llamado
    expect(component.text).toBe('Nueva Votación'); // Verifica que el texto cambió
    expect(component.reveal.emit).toHaveBeenCalled(); // Verifica que el evento fue emitido

    // Simula el segundo clic
    component.onClick();
    expect(mockStore.dispatch).toHaveBeenCalledWith(toggleRevealVotes()); // Verifica que dispatch fue llamado nuevamente
    expect(component.text).toBe('Revelar Votaciones'); // Verifica que el texto volvió al original
    expect(component.reveal.emit).toHaveBeenCalledTimes(2); // Verifica que el evento fue emitido dos veces
  });
});