import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonSubmitCustomComponent } from './button-submit-custom.component';

describe('ButtonSubmitCustomComponent', () => {
  let component: ButtonSubmitCustomComponent;
  let fixture: ComponentFixture<ButtonSubmitCustomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonSubmitCustomComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonSubmitCustomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle text and call reveal.emit() on button click', () =>{
    spyOn(component.clickEvent, 'emit'); // Espía al evento emitido
    
        // Simula el primer clic
        component.onClick();
        expect(component.clickEvent.emit).toHaveBeenCalled(); // Verifica que el evento fue emitido
  })
});
