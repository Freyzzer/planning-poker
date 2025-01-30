import { TestBed, ComponentFixture } from '@angular/core/testing';
import { TableComponent } from './table.component';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
import { updatePlayerView, selectCard } from '../../../storage/action/game.actions';

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;
  let mockStore: any;

  beforeEach(async () => {
    // Mock del Store de NgRx
    mockStore = {
      select: jasmine.createSpy('select').and.returnValue(of([])), // Simula `select` devolviendo un observable vacío
      dispatch: jasmine.createSpy('dispatch'),
      pipe: jasmine.createSpy('pipe').and.returnValue(of([])) // Simula `pipe`
    };

    await TestBed.configureTestingModule({
      imports: [TableComponent, ReactiveFormsModule], // Asegúrate de importar ReactiveFormsModule
      providers: [
        {
          provide: Store,
          useValue: mockStore, // Proporciona el mock del Store
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch updatePlayerView when form is valid and view is "player"', () => {
    component.view = 'player';
    component.idSelected = '1';
    component.form.setValue({ view: 'newView' });

    component.updateView();

    expect(mockStore.dispatch).toHaveBeenCalledWith(updatePlayerView({
      playerId: '1',
      newView: 'newView',
    }));
    expect(component.isReveal).toBeFalse();
  });

  it('should not dispatch updatePlayerView if form is invalid', () => {
    component.view = 'player';
    component.idSelected = '1';
    component.form.setValue({ view: '' }); // Invalid value

    component.updateView();

    expect(mockStore.dispatch).not.toHaveBeenCalled();
    expect(component.isReveal).toBeFalse();
  });

  // it('should toggle isVotingRevealed and dispatch selectCard when onRevealVotes is called', () => {
  //   component.isVotingRevealed = false;
  //   component.onRevealVotes(true);

  //   expect(component.isVotingRevealed).toBeTrue();
  //   expect(mockStore.dispatch).toHaveBeenCalledWith(selectCard({ playerId: '', card: '' }));
  // });

  it('should set idSelected and isReveal when onSubmit is called with "player" view', () => {
    component.view = 'player';
    component.onSubmit('1');

    expect(component.idSelected).toBe('1');
    expect(component.isReveal).toBeTrue();
  });

  it('should not change idSelected or isReveal when onSubmit is called with other views', () => {
    component.view = 'other';
    component.onSubmit('1');

    expect(component.idSelected).toBe('');
    expect(component.isReveal).toBeFalse();
  });

  it('should correctly calculate position style', () => {
    const result = component.getPositionStyle(1, 4);
    expect(result).toContain('translate('); // Verifica que contiene el estilo esperado
  });
});
