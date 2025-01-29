import { TestBed, ComponentFixture } from '@angular/core/testing';
import { BodyGameComponent } from './body-game.component';
import { TableComponent } from '../../atoms/table/table.component';
import { CardComponent } from '../../atoms/card/card.component';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';

describe('BodyGameComponent', () => {
  let component: BodyGameComponent;
  let fixture: ComponentFixture<BodyGameComponent>;

  let mockStore: any;

  beforeEach(async () => {
    // Mock del Store de NgRx
    mockStore = {
      select: jasmine.createSpy('select').and.returnValue(of([])), // Simula `select` devolviendo un observable vacío
      dispatch: jasmine.createSpy('dispatch'), // Simula `dispatch`
      pipe: jasmine.createSpy('pipe').and.returnValue(of([])),
    };
    await TestBed.configureTestingModule({
      imports: [
        BodyGameComponent, // Componente bajo prueba
        TableComponent, // Importa los componentes standalone requeridos
        CardComponent,
      ],
      providers: [
        {
          provide: Store,
          useValue: mockStore, // Proporciona el mock del Store
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BodyGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render TableComponent', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-table')).toBeTruthy();
  });

  it('should render CardComponent', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-card')).toBeTruthy();
  });
});
