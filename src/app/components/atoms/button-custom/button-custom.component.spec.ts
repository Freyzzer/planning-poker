import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonCustomComponent } from './button-custom.component';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';

describe('ButtonCustomComponent', () => {
  let component: ButtonCustomComponent;
  let fixture: ComponentFixture<ButtonCustomComponent>;
  let mockStore: any;

  beforeEach(async () => {
    //Mock del store
    mockStore = {
      select: jasmine.createSpy('select').and.returnValue(of([])), // Simula `select` devolviendo un observable vacío
      dispatch: jasmine.createSpy('dispatch'), // Simula `dispatch`
      pipe: jasmine.createSpy('pipe').and.returnValue(of([])),
    }

    await TestBed.configureTestingModule({
      imports: [ButtonCustomComponent],
      providers: [
        {
          provide: Store,
          useValue: mockStore, // Proporciona el mock del Store
        },
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonCustomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
