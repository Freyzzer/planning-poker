import { TestBed, ComponentFixture } from '@angular/core/testing';
import { TableComponent } from './table.component';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;
  let mockStore: any;

  beforeEach(async () => {
    // Mock del Store de NgRx
    mockStore = {
      select: jasmine.createSpy('select').and.returnValue(of([])), // Simula `select` devolviendo un observable vacío
      dispatch: jasmine.createSpy('dispatch'), // Simula `dispatch`
    };

    await TestBed.configureTestingModule({
      imports: [TableComponent], // Agrega tu componente standalone
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

  it('should call store.select when initialized', () => {
    expect(mockStore.select).toHaveBeenCalled();
  });


});
