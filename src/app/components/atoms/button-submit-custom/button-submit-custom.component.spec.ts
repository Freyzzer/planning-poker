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
});
